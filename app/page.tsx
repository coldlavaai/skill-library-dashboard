'use client';

import { useState, useEffect } from 'react';
import SkillCard from './components/SkillCard';
import SkillModal from './components/SkillModal';

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
      <div className="max-w-content mx-auto px-8 py-24">
        {/* Header */}
        <div className="mb-16">
          <div className="mono-label text-cyan/40 mb-4 flex items-center gap-4">
            <div className="w-8 h-px bg-cyan/20"></div>
            COLD LAVA FLEET
          </div>
          <h1 className="text-7xl font-extrabold mb-4 tracking-tight leading-tight">
            <span className="text-white">Skill</span>{' '}
            <span className="text-white/35 font-light">Library</span>
          </h1>
          <p className="text-xl text-muted font-light leading-relaxed max-w-2xl">
            Packaged skills for the agent fleet. Progressive disclosure,
            composability, tested patterns.
          </p>
          <div className="mt-4 mono-small text-cyan/45">
            {skills.length} SKILL{skills.length !== 1 ? 'S' : ''} AVAILABLE
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <input
            type="text"
            placeholder="Search skills, agents, or descriptions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-6 py-4 card corner-brackets rounded-none text-white placeholder:text-white/30 focus:outline-none focus:border-cyan/40 transition-colors"
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center text-white/50 mono-label py-16">
            LOADING...
          </div>
        )}

        {/* Empty State */}
        {!loading && skills.length === 0 && (
          <div className="text-center py-16">
            <p className="text-2xl text-white/60 mb-2">No skills in library yet</p>
            <p className="mono-small text-cyan/40">
              SKILLS WILL APPEAR WHEN ADDED TO /home/moltbot/skill-library/
            </p>
          </div>
        )}

        {/* Skills Grid */}
        {!loading && filteredSkills.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSkills.map((skill) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                onClick={() => setSelectedSkill(skill)}
              />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && skills.length > 0 && filteredSkills.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-white/50">No skills match your search</p>
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
    </main>
  );
}
