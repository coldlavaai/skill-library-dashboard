'use client';

import { useState, useEffect } from 'react';
import SkillCard from './components/SkillCard';
import SkillModal from './components/SkillModal';

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

export default function Home() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  useEffect(() => {
    fetch('/api/skills')
      .then(res => res.json())
      .then(data => {
        setSkills(data.skills || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load skills:', err);
        setLoading(false);
      });
  }, []);

  const filteredSkills = skills.filter(skill =>
    skill.name.toLowerCase().includes(search.toLowerCase()) ||
    skill.description.toLowerCase().includes(search.toLowerCase()) ||
    skill.usedBy.some(agent => agent.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main className="min-h-screen">
      <div className="section-inner mx-auto px-8 py-24">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="label">
            COLD LAVA FLEET
          </div>
          
          <h1 className="mb-6">
            <span className="text-white">Skill</span>{' '}
            <span className="thin">Library</span>
          </h1>
          
          <p className="lead mb-8">
            Packaged skills for the agent fleet. Progressive disclosure,
            composability, tested patterns. Every skill follows the standard.
          </p>

          <div className="investment">
            <div className="dot"></div>
            <span>
              {skills.length} SKILL{skills.length !== 1 ? 'S' : ''} AVAILABLE
            </span>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider"></div>

        {/* Search Section */}
        <section className="mb-12">
          <div className="label">
            SEARCH
          </div>
          <input
            type="search"
            placeholder="Filter by name, description, or agent..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
        </section>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-24">
            <p className="lead">Loading skills...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && skills.length === 0 && (
          <div className="text-center py-24">
            <div className="arch-box inline-block px-16 py-12">
              <div className="corner-tr"></div>
              <div className="corner-bl"></div>
              <div className="label mb-4">LIBRARY EMPTY</div>
              <p className="text-2xl text-white/70 mb-2">No skills deployed yet</p>
              <p className="text-sm text-white/30 mt-4">
                SKILLS WILL APPEAR WHEN ADDED TO THE LIBRARY
              </p>
            </div>
          </div>
        )}

        {/* Skills Grid */}
        {!loading && filteredSkills.length > 0 && (
          <>
            <div className="label mb-6">
              AVAILABLE SKILLS
            </div>
            <div className="card-grid mb-12">
              {filteredSkills.map((skill) => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  onClick={() => setSelectedSkill(skill)}
                />
              ))}
            </div>
          </>
        )}

        {/* No Results */}
        {!loading && skills.length > 0 && filteredSkills.length === 0 && (
          <div className="text-center py-24">
            <div className="arch-box inline-block px-16 py-12">
              <div className="corner-tr"></div>
              <div className="corner-bl"></div>
              <div className="label mb-4">NO MATCHES</div>
              <p className="text-xl text-white/60">No skills match your search</p>
            </div>
          </div>
        )}

        {/* Skill Detail Modal */}
        {selectedSkill && (
          <SkillModal
            skill={selectedSkill}
            onClose={() => setSelectedSkill(null)}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 mt-24">
        <div className="section-inner mx-auto px-8">
          <div className="flex items-center justify-between">
            <div className="text-xs text-white/20 font-mono uppercase tracking-wider">
              COLD LAVA AI © {new Date().getFullYear()}
            </div>
            <div className="flex items-center gap-6 text-xs text-white/20 font-mono uppercase tracking-wider">
              <a 
                href="https://github.com/coldlavaai/skill-library-data" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[var(--color-accent)] transition-colors"
              >
                GITHUB
              </a>
              <span className="text-white/10">•</span>
              <a 
                href="https://coldlava.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[var(--color-accent)] transition-colors"
              >
                COLDLAVA.AI
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
