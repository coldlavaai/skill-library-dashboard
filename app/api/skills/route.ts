import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SKILLS_DIR = path.join(process.cwd(), 'skills');

interface Skill {
  name: string;
  category: string;
  description: string;
  usedBy: string[];
  status: string;
  hasScripts: boolean;
  hasReferences: boolean;
  hasTemplates: boolean;
  skillMdContent?: string;
  readmeContent?: string;
}

function scanDirectory(dir: string, category: string, skills: Skill[]) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    if (!entry.isDirectory()) {
      // Handle markdown files directly (agency-templates pattern)
      if (entry.name.endsWith('.md') && !entry.name.includes('README') && !entry.name.includes('INDEX') && !entry.name.includes('LICENSE') && !entry.name.includes('CONTRIBUTING')) {
        const skillPath = path.join(dir, entry.name);
        const skillName = entry.name.replace('.md', '');
        
        const skill: Skill = {
          name: skillName,
          category: category,
          description: '',
          usedBy: [],
          status: 'active',
          hasScripts: false,
          hasReferences: false,
          hasTemplates: false,
        };

        const content = fs.readFileSync(skillPath, 'utf-8');
        skill.skillMdContent = content;
        
        // Extract description from first paragraph
        const lines = content.split('\n').filter(l => l.trim());
        const descLine = lines.find(l => !l.startsWith('#') && !l.startsWith('---') && l.length > 20);
        if (descLine) {
          skill.description = descLine.trim().substring(0, 200);
        }

        skills.push(skill);
      }
      continue;
    }

    const subDir = path.join(dir, entry.name);
    
    // Check if this directory contains a SKILL.md (actual skill)
    const skillMdPath = path.join(subDir, 'SKILL.md');
    if (fs.existsSync(skillMdPath)) {
      const skill: Skill = {
        name: entry.name,
        category: category,
        description: '',
        usedBy: [],
        status: 'active',
        hasScripts: fs.existsSync(path.join(subDir, 'scripts')),
        hasReferences: fs.existsSync(path.join(subDir, 'references')),
        hasTemplates: fs.existsSync(path.join(subDir, 'templates')),
      };

      // Read SKILL.md
      skill.skillMdContent = fs.readFileSync(skillMdPath, 'utf-8');
      
      // Extract description
      const lines = skill.skillMdContent.split('\n').filter(l => l.trim());
      const descLine = lines.find(l => !l.startsWith('#') && !l.startsWith('---') && l.length > 20);
      if (descLine) {
        skill.description = descLine.trim().substring(0, 200);
      }

      // Read README.md if exists
      const readmePath = path.join(subDir, 'README.md');
      if (fs.existsSync(readmePath)) {
        skill.readmeContent = fs.readFileSync(readmePath, 'utf-8');
      }

      skills.push(skill);
    } else {
      // Recurse into subcategory (e.g., agency-templates/design/)
      scanDirectory(subDir, `${category}/${entry.name}`, skills);
    }
  }
}

export async function GET() {
  try {
    const skills: Skill[] = [];
    
    if (!fs.existsSync(SKILLS_DIR)) {
      return NextResponse.json({ skills: [], count: 0 });
    }

    const categories = fs.readdirSync(SKILLS_DIR, { withFileTypes: true });
    
    for (const category of categories) {
      if (category.isDirectory() && category.name !== 'node_modules') {
        const categoryPath = path.join(SKILLS_DIR, category.name);
        scanDirectory(categoryPath, category.name, skills);
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
