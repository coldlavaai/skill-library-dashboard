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
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            ⚒️ Skill Library
          </h1>
          <p className="text-xl text-purple-200">
            Cold Lava Agent Fleet — Packaged Skills
          </p>
          <p className="text-sm text-purple-300 mt-2">
            {skills.length} skill{skills.length !== 1 ? 's' : ''} available
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Search skills, agents, or descriptions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-6 py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-purple-400/30 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center text-purple-200 text-xl">
            Loading skills...
          </div>
        )}

        {/* Empty State */}
        {!loading && skills.length === 0 && (
          <div className="text-center text-purple-200 text-xl">
            <p>No skills in library yet.</p>
            <p className="text-sm mt-2 text-purple-300">
              Skills will appear here once added to /home/moltbot/skill-library/
            </p>
          </div>
        )}

        {/* Skills Grid */}
        {!loading && filteredSkills.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="text-center text-purple-200 text-xl">
            No skills match your search.
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
