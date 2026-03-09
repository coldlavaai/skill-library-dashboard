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
      <div className="fixed top-10 right-10 z-50 text-right pointer-events-none">
        <div className="mono-label text-white/50 flex items-center justify-end gap-3">
          <span>LONDON</span>
          <span className="text-white/25">•</span>
          <span className="text-white/65">{formatTime(time)}</span>
        </div>
        <div className="mono-small text-white/30 mt-1.5">{formatDate(time)}</div>
      </div>

      {/* Main Content */}
      <div className="max-w-[960px] mx-auto px-8 py-32 animate-fadeIn">
        {/* Hero Section */}
        <section className="mb-32">
          <div className="label-line mb-10">
            COLD LAVA FLEET
          </div>
          
          <h1 className="text-9xl font-extrabold mb-10 tracking-tighter leading-[0.9] bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
            Skill<span className="block text-white/30 font-light mt-2">Library</span>
          </h1>
          
          <p className="text-2xl text-white/65 font-light leading-relaxed max-w-2xl mb-10">
            Packaged skills for the agent fleet. Progressive disclosure,
            composability, tested patterns. Every skill follows the standard.
          </p>

          <div className="badge-premium inline-flex">
            <div className="badge-dot"></div>
            <span className="tracking-wider">
              {skills.length} SKILL{skills.length !== 1 ? 'S' : ''} AVAILABLE
            </span>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider"></div>

        {/* Search Section */}
        <section className="mb-20 animate-slideUp">
          <div className="label-line mb-8">
            SEARCH & FILTER
          </div>
          <div className="relative brackets-premium">
            <input
              type="search"
              placeholder="Search by name, description, or agent..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-8 py-6 text-lg focus:outline-none rounded-lg"
            />
          </div>
        </section>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-40 animate-scaleIn">
            <div className="mono-label text-cyan/60 tracking-widest text-xl mb-6">
              LOADING SKILLS...
            </div>
            <div className="w-64 h-1 mx-auto bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan/40 to-cyan/80 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && skills.length === 0 && (
          <div className="text-center py-40 animate-scaleIn">
            <div className="glass-panel inline-block px-24 py-20 rounded-2xl">
              <div className="mono-label text-cyan/50 mb-8 text-xl tracking-widest">LIBRARY EMPTY</div>
              <p className="text-4xl text-white/75 mb-6 font-light leading-tight">No skills<br />deployed yet</p>
              <p className="mono-small text-white/45 mt-8 text-base tracking-wider">
                SKILLS WILL APPEAR WHEN ADDED TO THE LIBRARY
              </p>
            </div>
          </div>
        )}

        {/* Skills Grid */}
        {!loading && filteredSkills.length > 0 && (
          <>
            <div className="label-line mb-10">
              AVAILABLE SKILLS
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
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
          <div className="text-center py-40 animate-scaleIn">
            <div className="glass-panel inline-block px-24 py-20 rounded-2xl">
              <div className="mono-label text-cyan/60 mb-8 text-xl tracking-widest">NO MATCHES</div>
              <p className="text-3xl text-white/70 font-light mb-10 leading-tight">
                No skills match<br />your search
              </p>
              <button
                onClick={() => setSearch('')}
                className="badge-premium hover:scale-105 transition-transform cursor-pointer"
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
      <footer className="border-t border-white/8 py-10 mt-40">
        <div className="max-w-[960px] mx-auto px-8">
          <div className="flex items-center justify-between">
            <div className="mono-small text-white/30 tracking-widest">
              COLD LAVA AI © {new Date().getFullYear()}
            </div>
            <div className="flex items-center gap-8 mono-small text-white/30 tracking-wider">
              <a 
                href="https://github.com/coldlavaai/skill-library-data" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-cyan/80 transition-colors"
              >
                GITHUB
              </a>
              <span className="text-white/15">•</span>
              <a 
                href="https://coldlava.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-cyan/80 transition-colors"
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
