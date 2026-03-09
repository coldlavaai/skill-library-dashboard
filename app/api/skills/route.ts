import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SKILL_LIBRARY_PATH = '/home/moltbot/skill-library';

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
    
    // Read all directories in skill library
    const entries = fs.readdirSync(SKILL_LIBRARY_PATH, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const skillPath = path.join(SKILL_LIBRARY_PATH, entry.name);
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
          // Extract first paragraph as description
          const lines = skill.readmeContent.split('\n').filter(l => l.trim());
          skill.description = lines.find(l => !l.startsWith('#')) || '';
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
    const indexPath = path.join(SKILL_LIBRARY_PATH, 'INDEX.md');
    if (fs.existsSync(indexPath)) {
      const indexContent = fs.readFileSync(indexPath, 'utf-8');
      // Simple parsing of the table
      const lines = indexContent.split('\n');
      for (const line of lines) {
        if (line.startsWith('|') && !line.includes('Skill') && !line.includes('---')) {
          const parts = line.split('|').map(p => p.trim()).filter(p => p);
          if (parts.length >= 4) {
            const [name, desc, used, status] = parts;
            const skill = skills.find(s => s.name === name);
            if (skill) {
              skill.description = desc;
              skill.usedBy = used.split(',').map(u => u.trim()).filter(u => u && u !== '—');
              skill.status = status;
            }
          }
        }
      }
    }

    return NextResponse.json({ skills, count: skills.length });
  } catch (error) {
    console.error('Error reading skill library:', error);
    return NextResponse.json({ error: 'Failed to read skill library', skills: [], count: 0 }, { status: 500 });
  }
}
