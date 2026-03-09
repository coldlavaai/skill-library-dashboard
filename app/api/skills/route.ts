import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SKILLS_DIR = path.join(process.cwd(), 'skills');

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

export async function GET() {
  try {
    const skills: Skill[] = [];
    
    // Read all directories in skills folder
    if (!fs.existsSync(SKILLS_DIR)) {
      return NextResponse.json({ skills: [], count: 0 });
    }

    const entries = fs.readdirSync(SKILLS_DIR, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const skillPath = path.join(SKILLS_DIR, entry.name);
        const skill: Skill = {
          name: entry.name,
          description: '',
          usedBy: [],
          status: 'active',
          hasScripts: fs.existsSync(path.join(skillPath, 'scripts')),
          hasReferences: fs.existsSync(path.join(skillPath, 'references')),
          hasTemplates: fs.existsSync(path.join(skillPath, 'templates')),
        };

        // Read README.md for description
        const readmePath = path.join(skillPath, 'README.md');
        if (fs.existsSync(readmePath)) {
          skill.readmeContent = fs.readFileSync(readmePath, 'utf-8');
          const lines = skill.readmeContent.split('\n').filter(l => l.trim());
          const descLine = lines.find(l => !l.startsWith('#'));
          if (descLine) {
            skill.description = descLine.trim();
          }
        }

        // Read SKILL.md
        const skillMdPath = path.join(skillPath, 'SKILL.md');
        if (fs.existsSync(skillMdPath)) {
          skill.skillMdContent = fs.readFileSync(skillMdPath, 'utf-8');
        }

        skills.push(skill);
      }
    }

    // Parse INDEX.md for metadata
    const indexPath = path.join(SKILLS_DIR, 'INDEX.md');
    if (fs.existsSync(indexPath)) {
      const indexContent = fs.readFileSync(indexPath, 'utf-8');
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
