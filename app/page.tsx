'use client';

import { useState, useEffect, useMemo } from 'react';
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
  const [activeCategory, setActiveCategory] = useState<string>('all');

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

  const categories = useMemo(() => {
    const cats = new Set(skills.map(s => s.category.split('/')[0]));
    return ['all', ...Array.from(cats).sort()];
  }, [skills]);

  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      const matchesSearch = !search || 
        skill.name.toLowerCase().includes(search.toLowerCase()) ||
        skill.description.toLowerCase().includes(search.toLowerCase()) ||
        skill.usedBy.some(agent => agent.toLowerCase().includes(search.toLowerCase()));
      
      const matchesCategory = activeCategory === 'all' || 
        skill.category.startsWith(activeCategory);
      
      return matchesSearch && matchesCategory;
    });
  }, [skills, search, activeCategory]);

  const activeSkillCount = skills.filter(s => s.status === 'active').length;

  return (
    <main className="min-h-screen">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-[#030305]/90 backdrop-blur-md border-b border-[#1a1a1a]">
        <div className="max-w-[960px] mx-auto w-full px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#111111] border border-[#1a1a1a] flex items-center justify-center">
              <span className="font-mono font-bold text-xs text-[#06B6D4]">CL</span>
            </div>
            <span className="font-mono text-sm font-medium text-[#86868B] tracking-wider uppercase">
              SKILL LIBRARY
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/coldlavaai/skill-library-data"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-[#86868B] tracking-wider uppercase no-underline hover:text-[#06B6D4] transition-colors"
            >
              GITHUB
            </a>
            <a
              href="https://coldlava.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-[#86868B] tracking-wider uppercase no-underline hover:text-[#06B6D4] transition-colors"
            >
              COLDLAVA.AI
            </a>
          </div>
        </div>
      </header>

      <div className="section-inner mx-auto px-8" style={{ paddingTop: '7rem', paddingBottom: '4rem' }}>
        {/* Hero */}
        <section className="mb-12 animate-fade-in">
          <div className="label">COLD LAVA FLEET</div>

          <h1 className="mb-5">
            <span className="text-white">Skill</span>{' '}
            <span className="thin">Library</span>
          </h1>

          <p className="lead mb-8">
            Packaged skills for the agent fleet. Progressive disclosure,
            composability, tested patterns. Every skill follows the standard.
          </p>

          {/* Stats row */}
          {!loading && skills.length > 0 && (
            <div className="stat-grid" style={{ maxWidth: 560 }}>
              <div className="stat-card">
                <div className="stat-value">{skills.length}</div>
                <div className="stat-label">TOTAL SKILLS</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{activeSkillCount}</div>
                <div className="stat-label">ACTIVE</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{categories.length - 1}</div>
                <div className="stat-label">CATEGORIES</div>
              </div>
            </div>
          )}

          {!loading && skills.length === 0 && (
            <div className="investment">
              <div className="dot"></div>
              <span>0 SKILLS AVAILABLE</span>
            </div>
          )}
        </section>

        <div className="section-divider"></div>

        {/* Search + Filter */}
        <section className="mb-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="label">SEARCH &amp; FILTER</div>
          <input
            type="search"
            placeholder="Filter by name, description, or agent..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {categories.length > 2 && (
            <div className="category-tabs" style={{ marginTop: '1rem' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat === 'all' ? 'ALL' : cat.replace(/-/g, ' ')}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Loading */}
        {loading && (
          <div className="py-24 flex flex-col items-center gap-6">
            <div className="loading-pulse">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p className="font-mono text-sm text-[#86868B] tracking-wider uppercase">
              LOADING SKILLS
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && skills.length === 0 && (
          <div className="flex justify-center py-20">
            <div className="arch-box px-16 py-12 text-center" style={{ maxWidth: 480 }}>
              <div className="label mb-4" style={{ justifyContent: 'center' }}>LIBRARY EMPTY</div>
              <p className="text-white text-xl mb-3">No skills deployed yet</p>
              <p className="font-mono text-sm text-[#86868B] tracking-wider uppercase mt-4">
                SKILLS WILL APPEAR WHEN ADDED TO THE LIBRARY
              </p>
            </div>
          </div>
        )}

        {/* Skills Grid */}
        {!loading && filteredSkills.length > 0 && (
          <>
            <div className="label mb-4" style={{ animationDelay: '0.15s' }}>
              {activeCategory === 'all' ? 'ALL SKILLS' : activeCategory.replace(/-/g, ' ').toUpperCase()}
              <span className="font-mono text-sm text-[#86868B] ml-2">
                ({filteredSkills.length})
              </span>
            </div>
            <div className="card-grid mb-16">
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

        {/* No results */}
        {!loading && skills.length > 0 && filteredSkills.length === 0 && (
          <div className="flex justify-center py-20">
            <div className="arch-box px-16 py-12 text-center" style={{ maxWidth: 480 }}>
              <div className="label mb-4" style={{ justifyContent: 'center' }}>NO MATCHES</div>
              <p className="text-[#86868B] text-lg">No skills match your search</p>
            </div>
          </div>
        )}

        {/* Modal */}
        {selectedSkill && (
          <SkillModal
            skill={selectedSkill}
            onClose={() => setSelectedSkill(null)}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-[#1a1a1a] mt-16">
        <div className="section-inner mx-auto px-8 py-8 flex items-center justify-between">
          <p className="font-mono text-sm text-[#86868B] tracking-wider uppercase">
            COLD LAVA AI © {new Date().getFullYear()}
          </p>
          <p className="font-mono text-sm text-[#86868B] tracking-wider uppercase">
            BUILT WITH PRECISION
          </p>
        </div>
      </footer>
    </main>
  );
}
