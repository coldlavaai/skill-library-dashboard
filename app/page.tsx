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
  const agentCount = useMemo(() => {
    const agents = new Set(skills.flatMap(s => s.usedBy));
    return agents.size;
  }, [skills]);

  return (
    <main className="min-h-screen">
      {/* Top bar */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: 'rgba(3,3,5,0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(6,182,212,0.06)',
        }}
      >
        <div
          style={{ maxWidth: 960, margin: '0 auto', width: '100%' }}
          className="px-8 py-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            {/* Logo mark */}
            <div
              style={{
                width: 28,
                height: 28,
                border: '1px solid rgba(6,182,212,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0,
                width: 6, height: 6,
                borderLeft: '1px solid rgba(6,182,212,0.5)',
                borderTop: '1px solid rgba(6,182,212,0.5)',
              }} />
              <div style={{
                position: 'absolute', bottom: 0, right: 0,
                width: 6, height: 6,
                borderRight: '1px solid rgba(6,182,212,0.5)',
                borderBottom: '1px solid rgba(6,182,212,0.5)',
              }} />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  color: 'rgba(6,182,212,0.6)',
                  letterSpacing: '0.05em',
                }}
              >
                CL
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              SKILL LIBRARY
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/coldlavaai/skill-library-data"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.3)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(6,182,212,0.7)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
            >
              GITHUB
            </a>
            <a
              href="https://coldlava.ai"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.3)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(6,182,212,0.7)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
            >
              COLDLAVA.AI
            </a>
          </div>
        </div>
      </header>

      <div className="section-inner mx-auto px-8" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
        {/* Hero */}
        <section className="mb-12 animate-fade-in">
          <div className="label">
            COLD LAVA FLEET
          </div>

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

        {/* Divider */}
        <div className="section-divider"></div>

        {/* Search + Filter Section */}
        <section className="mb-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="label">
            SEARCH &amp; FILTER
          </div>
          <input
            type="search"
            placeholder="Filter by name, description, or agent..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Category tabs */}
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

        {/* Loading State */}
        {loading && (
          <div className="py-24 flex flex-col items-center gap-6">
            <div className="loading-pulse">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'rgba(255,255,255,0.3)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              LOADING SKILLS
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && skills.length === 0 && (
          <div className="flex justify-center py-20">
            <div className="arch-box px-16 py-12 text-center" style={{ maxWidth: 480 }}>
              <div className="corner-tr"></div>
              <div className="corner-bl"></div>
              <div className="label mb-4" style={{ justifyContent: 'center' }}>LIBRARY EMPTY</div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.25rem', marginBottom: '0.75rem' }}>
                No skills deployed yet
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'rgba(255,255,255,0.25)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginTop: '1rem',
                }}
              >
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
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'rgba(255,255,255,0.2)',
                  marginLeft: '0.5rem',
                }}
              >
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

        {/* No search results */}
        {!loading && skills.length > 0 && filteredSkills.length === 0 && (
          <div className="flex justify-center py-20">
            <div className="arch-box px-16 py-12 text-center" style={{ maxWidth: 480 }}>
              <div className="corner-tr"></div>
              <div className="corner-bl"></div>
              <div className="label mb-4" style={{ justifyContent: 'center' }}>NO MATCHES</div>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem' }}>
                No skills match your search
              </p>
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
      <footer
        style={{
          borderTop: '1px solid rgba(255,255,255,0.04)',
          marginTop: '4rem',
        }}
      >
        <div
          className="section-inner mx-auto px-8 py-8 flex items-center justify-between"
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'rgba(255,255,255,0.15)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            COLD LAVA AI © {new Date().getFullYear()}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'rgba(255,255,255,0.15)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            BUILT WITH PRECISION
          </p>
        </div>
      </footer>
    </main>
  );
}

