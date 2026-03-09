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
  const [time, setTime] = useState(new Date());

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

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredSkills = skills.filter(skill =>
    skill.name.toLowerCase().includes(search.toLowerCase()) ||
    skill.description.toLowerCase().includes(search.toLowerCase()) ||
    skill.usedBy.some(agent => agent.toLowerCase().includes(search.toLowerCase()))
  );

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
  };

  return (
    <main className="min-h-screen relative">
      {/* HUD - Time Display */}
      <div className="fixed top-8 right-8 z-50 text-right pointer-events-none">
        <div className="mono-small text-white/30 flex items-center justify-end gap-2">
          <span>LONDON</span>
          <span className="text-white/20">•</span>
          <span className="text-white/40">{formatTime(time)}</span>
        </div>
        <div className="mono-tiny text-white/20 mt-1">{formatDate(time)}</div>
      </div>

      {/* Main Content */}
      <div className="max-w-[960px] mx-auto px-8 py-24">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="label-line mb-6">
            COLD LAVA FLEET
          </div>
          
          <h1 className="text-7xl font-extrabold mb-6 tracking-tight leading-none">
            <span className="text-white">Skill</span>{' '}
            <span className="text-white/35 font-light">Library</span>
          </h1>
          
          <p className="text-xl text-white/50 font-light leading-relaxed max-w-2xl mb-6">
            Packaged skills for the agent fleet. Progressive disclosure,
            composability, tested patterns. Every skill follows the standard.
          </p>

          <div className="inline-flex items-center gap-3 bg-cyan/6 border border-cyan/20 px-6 py-3 mt-4">
            <div className="w-1.5 h-1.5 bg-cyan rounded-full"></div>
            <span className="mono-small text-white/60 tracking-wider">
              {skills.length} SKILL{skills.length !== 1 ? 'S' : ''} AVAILABLE
            </span>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider"></div>

        {/* Search Section */}
        <section className="mb-12">
          <div className="label-line mb-4">
            SEARCH
          </div>
          <div className="relative corner-brackets">
            <input
              type="search"
              placeholder="Filter by name, description, or agent..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-6 py-4 text-base focus:outline-none"
            />
          </div>
        </section>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-24">
            <div className="mono-label text-cyan/40 tracking-widest animate-pulse">
              LOADING SKILLS...
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && skills.length === 0 && (
          <div className="text-center py-24">
            <div className="arch-box inline-block px-16 py-12 arch-box-tr arch-box-bl">
              <div className="mono-label text-cyan/30 mb-3">LIBRARY EMPTY</div>
              <p className="text-2xl text-white/60 mb-2 font-light">No skills deployed yet</p>
              <p className="mono-small text-white/30 mt-4">
                SKILLS WILL APPEAR WHEN ADDED TO THE LIBRARY
              </p>
            </div>
          </div>
        )}

        {/* Skills Grid */}
        {!loading && filteredSkills.length > 0 && (
          <>
            <div className="label-line mb-6">
              AVAILABLE SKILLS
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
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
              <div className="mono-label text-cyan/40 mb-3">NO MATCHES</div>
              <p className="text-xl text-white/50 font-light">
                No skills match your search
              </p>
              <button
                onClick={() => setSearch('')}
                className="mt-6 px-6 py-3 bg-cyan/10 border border-cyan/20 hover:bg-cyan/15 transition-colors mono-small text-white/60"
              >
                CLEAR SEARCH
              </button>
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
      <footer className="border-t border-white/5 py-6 mt-24">
        <div className="max-w-[960px] mx-auto px-8">
          <div className="flex items-center justify-between">
            <div className="mono-tiny text-white/15 tracking-widest">
              COLD LAVA AI © {new Date().getFullYear()}
            </div>
            <div className="flex items-center gap-4 mono-tiny text-white/15">
              <a 
                href="https://github.com/coldlavaai/skill-library-data" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-cyan/60 transition-colors"
              >
                GITHUB
              </a>
              <span className="text-white/10">•</span>
              <a 
                href="https://coldlava.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-cyan/60 transition-colors"
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
