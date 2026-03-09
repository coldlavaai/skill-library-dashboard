import { NextResponse } from 'next/server';

const GITHUB_REPO = 'coldlavaai/skill-library-data';
const GITHUB_BRANCH = 'main';
const GITHUB_API_BASE = `https://api.github.com/repos/${GITHUB_REPO}`;
const GITHUB_RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}`;

interface Skill {
  name: string;
  description: string;
  usedBy: string[];
  status: string;
  hasScripts: boolean;
  hasReferences: boolean;
  hasTemplates: boolean;
  skillMdContent?: string;
  readmeContent?: string;
}

interface GitHubTreeItem {
  path: string;
  type: string;
  sha: string;
}

async function fetchGitHubFile(path: string): Promise<string | null> {
  try {
    const response = await fetch(`${GITHUB_RAW_BASE}/${path}`);
    if (!response.ok) return null;
    return await response.text();
  } catch (error) {
    console.error(`Failed to fetch ${path}:`, error);
    return null;
  }
}

async function getDirectories(): Promise<string[]> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/git/trees/${GITHUB_BRANCH}?recursive=1`);
    if (!response.ok) {
      console.error('Failed to fetch GitHub tree:', response.status, response.statusText);
      return [];
    }
    
    const data = await response.json();
    const tree: GitHubTreeItem[] = data.tree || [];
    
    // Find all directories that contain SKILL.md
    const skillDirs = new Set<string>();
    tree.forEach((item) => {
      if (item.type === 'blob' && item.path.endsWith('/SKILL.md')) {
        const dir = item.path.split('/')[0];
        if (dir && dir !== 'SKILL.md') {
          skillDirs.add(dir);
        }
      }
    });
    
    return Array.from(skillDirs);
  } catch (error) {
    console.error('Error fetching directories:', error);
    return [];
  }
}

export async function GET() {
  try {
    const skills: Skill[] = [];
    
    // Get all skill directories
    const directories = await getDirectories();
    
    for (const dir of directories) {
      const skill: Skill = {
        name: dir,
        description: '',
        usedBy: [],
        status: 'active',
        hasScripts: false,
        hasReferences: false,
        hasTemplates: false,
      };

      // Fetch README.md
      const readme = await fetchGitHubFile(`${dir}/README.md`);
      if (readme) {
        skill.readmeContent = readme;
        // Extract first non-heading line as description
        const lines = readme.split('\n').filter(l => l.trim());
        const descLine = lines.find(l => !l.startsWith('#'));
        if (descLine) {
          skill.description = descLine.trim();
        }
      }

      // Fetch SKILL.md
      const skillMd = await fetchGitHubFile(`${dir}/SKILL.md`);
      if (skillMd) {
        skill.skillMdContent = skillMd;
      }

      // Check for subdirectories (approximate - we'd need to check the tree)
      // For now, we'll set these based on file existence
      const scriptsCheck = await fetchGitHubFile(`${dir}/scripts/README.md`);
      skill.hasScripts = scriptsCheck !== null;
      
      const referencesCheck = await fetchGitHubFile(`${dir}/references/README.md`);
      skill.hasReferences = referencesCheck !== null;
      
      const templatesCheck = await fetchGitHubFile(`${dir}/templates/README.md`);
      skill.hasTemplates = templatesCheck !== null;

      skills.push(skill);
    }

    // Fetch INDEX.md for metadata
    const indexContent = await fetchGitHubFile('INDEX.md');
    if (indexContent) {
      const lines = indexContent.split('\n');
      for (const line of lines) {
        if (line.startsWith('|') && !line.includes('Skill') && !line.includes('---')) {
          const parts = line.split('|').map(p => p.trim()).filter(p => p);
          if (parts.length >= 4) {
            const [name, desc, used, status] = parts;
            const skill = skills.find(s => s.name === name);
            if (skill) {
              if (desc && desc !== '—') skill.description = desc;
              skill.usedBy = used.split(',').map(u => u.trim()).filter(u => u && u !== '—');
              if (status && status !== '—') skill.status = status;
            }
          }
        }
      }
    }

    return NextResponse.json({ skills, count: skills.length });
  } catch (error) {
    console.error('Error reading skill library:', error);
    return NextResponse.json({ 
      error: 'Failed to read skill library', 
      details: error instanceof Error ? error.message : 'Unknown error',
      skills: [], 
      count: 0 
    }, { status: 500 });
  }
}
