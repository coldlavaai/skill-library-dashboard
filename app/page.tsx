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
    <main style={{ minHeight: '100vh', background: '#030305' }}>
      {/* Top bar */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(3,3,5,0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid #2a2a2a',
      }}>
        <div style={{
          maxWidth: 960,
          margin: '0 auto',
          width: '100%',
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: '#111111',
              border: '1px solid #2a2a2a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: 12,
                color: '#06B6D4',
              }}>CL</span>
            </div>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              fontWeight: 500,
              color: '#86868B',
              letterSpacing: '0.12em',
              textTransform: 'uppercase' as const,
            }}>
              SKILL LIBRARY
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <a
              href="https://github.com/coldlavaai/skill-library-data"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                color: '#86868B',
                letterSpacing: '0.12em',
                textTransform: 'uppercase' as const,
                textDecoration: 'none',
              }}
            >
              GITHUB
            </a>
            <a
              href="https://coldlava.ai"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                color: '#86868B',
                letterSpacing: '0.12em',
                textTransform: 'uppercase' as const,
                textDecoration: 'none',
              }}
            >
              COLDLAVA.AI
            </a>
          </div>
        </div>
      </header>

      <div style={{
        maxWidth: 960,
        margin: '0 auto',
        padding: '112px 32px 64px',
      }}>
        {/* Hero Section */}
        <section style={{ marginBottom: 48, animation: 'fadeInUp 0.5s ease-out forwards' }}>
          {/* Label */}
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14,
            fontWeight: 500,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.12em',
            color: '#86868B',
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}>
            <span style={{ width: 32, height: 1, background: 'rgba(6,182,212,0.3)', flexShrink: 0 }} />
            COLD LAVA FLEET
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
            marginBottom: 20,
          }}>
            Skill{' '}
            <span style={{ fontWeight: 300, color: '#86868B' }}>Library</span>
          </h1>

          <p style={{
            fontSize: 17,
            fontWeight: 400,
            color: '#86868B',
            lineHeight: 1.75,
            maxWidth: 650,
            marginBottom: 32,
          }}>
            Packaged skills for the agent fleet. Progressive disclosure,
            composability, tested patterns. Every skill follows the standard.
          </p>

          {/* Stats row */}
          {!loading && skills.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: 16,
              maxWidth: 560,
              margin: '32px 0',
            }}>
              {[
                { value: skills.length, label: 'TOTAL SKILLS' },
                { value: activeSkillCount, label: 'ACTIVE' },
                { value: categories.length - 1, label: 'CATEGORIES' },
              ].map(stat => (
                <div key={stat.label} style={{
                  background: '#111111',
                  border: '1px solid #2a2a2a',
                  borderRadius: 16,
                  padding: 24,
                  textAlign: 'center' as const,
                }}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 32,
                    fontWeight: 700,
                    color: '#06B6D4',
                    marginBottom: 8,
                  }}>{stat.value}</div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    textTransform: 'uppercase' as const,
                    letterSpacing: '0.1em',
                    color: '#86868B',
                  }}>{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {!loading && skills.length === 0 && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              background: '#111111',
              border: '1px solid #2a2a2a',
              borderRadius: 12,
              padding: '10px 20px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              color: '#86868B',
              letterSpacing: '0.05em',
            }}>
              <span style={{
                width: 6, height: 6,
                background: '#06B6D4',
                borderRadius: '50%',
              }} />
              0 SKILLS AVAILABLE
            </div>
          )}
        </section>

        {/* Divider */}
        <div style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.1), transparent)',
          margin: '32px 0',
        }} />

        {/* Search + Filter */}
        <section style={{ marginBottom: 40, animation: 'fadeInUp 0.5s ease-out 0.1s forwards', opacity: 0 }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14,
            fontWeight: 500,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.12em',
            color: '#86868B',
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}>
            <span style={{ width: 32, height: 1, background: 'rgba(6,182,212,0.3)', flexShrink: 0 }} />
            SEARCH &amp; FILTER
          </div>

          <input
            type="search"
            placeholder="Filter by name, description, or agent..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: '#111111',
              border: '1px solid #2a2a2a',
              borderRadius: 12,
              color: '#FFFFFF',
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              padding: '14px 20px',
              width: '100%',
              outline: 'none',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#06B6D4'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = '#2a2a2a'; }}
          />

          {categories.length > 2 && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap' as const,
              gap: 8,
              marginTop: 16,
              marginBottom: 32,
            }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 13,
                    fontWeight: 500,
                    textTransform: 'uppercase' as const,
                    letterSpacing: '0.06em',
                    color: activeCategory === cat ? '#06B6D4' : '#86868B',
                    background: activeCategory === cat ? 'rgba(6,182,212,0.08)' : '#111111',
                    border: activeCategory === cat ? '1px solid #06B6D4' : '1px solid #2a2a2a',
                    borderRadius: 8,
                    padding: '8px 16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat === 'all' ? 'ALL' : cat.replace(/-/g, ' ')}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Loading */}
        {loading && (
          <div style={{
            padding: '96px 0',
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            gap: 24,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  width: 6,
                  height: 6,
                  background: '#06B6D4',
                  borderRadius: '50%',
                  animation: `loadPulse 1.4s ease-in-out infinite both`,
                  animationDelay: `${i * 0.16}s`,
                }} />
              ))}
            </div>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              color: '#86868B',
              letterSpacing: '0.12em',
              textTransform: 'uppercase' as const,
            }}>
              LOADING SKILLS
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && skills.length === 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
            <div style={{
              background: '#111111',
              border: '1px solid #2a2a2a',
              borderRadius: 16,
              padding: '48px 64px',
              textAlign: 'center' as const,
              maxWidth: 480,
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                fontWeight: 500,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.12em',
                color: '#86868B',
                marginBottom: 16,
              }}>LIBRARY EMPTY</div>
              <p style={{ color: '#FFFFFF', fontSize: 20, marginBottom: 12 }}>No skills deployed yet</p>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                color: '#86868B',
                letterSpacing: '0.12em',
                textTransform: 'uppercase' as const,
                marginTop: 16,
              }}>
                SKILLS WILL APPEAR WHEN ADDED TO THE LIBRARY
              </p>
            </div>
          </div>
        )}

        {/* Skills Grid */}
        {!loading && filteredSkills.length > 0 && (
          <>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              fontWeight: 500,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.12em',
              color: '#86868B',
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}>
              <span style={{ width: 32, height: 1, background: 'rgba(6,182,212,0.3)', flexShrink: 0 }} />
              {activeCategory === 'all' ? 'ALL SKILLS' : activeCategory.replace(/-/g, ' ').toUpperCase()}
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                color: '#86868B',
                marginLeft: 4,
              }}>
                ({filteredSkills.length})
              </span>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 20,
              marginTop: 24,
              marginBottom: 64,
            }}>
              {filteredSkills.map((skill, index) => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  onClick={() => setSelectedSkill(skill)}
                  index={index}
                />
              ))}
            </div>
          </>
        )}

        {/* No results */}
        {!loading && skills.length > 0 && filteredSkills.length === 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
            <div style={{
              background: '#111111',
              border: '1px solid #2a2a2a',
              borderRadius: 16,
              padding: '48px 64px',
              textAlign: 'center' as const,
              maxWidth: 480,
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                fontWeight: 500,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.12em',
                color: '#86868B',
                marginBottom: 16,
              }}>NO MATCHES</div>
              <p style={{ color: '#86868B', fontSize: 18 }}>No skills match your search</p>
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
      <footer style={{ borderTop: '1px solid #2a2a2a', marginTop: 64 }}>
        <div style={{
          maxWidth: 960,
          margin: '0 auto',
          padding: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            color: '#86868B',
            letterSpacing: '0.12em',
            textTransform: 'uppercase' as const,
          }}>
            COLD LAVA AI © {new Date().getFullYear()}
          </p>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            color: '#86868B',
            letterSpacing: '0.12em',
            textTransform: 'uppercase' as const,
          }}>
            BUILT WITH PRECISION
          </p>
        </div>
      </footer>
    </main>
  );
}
