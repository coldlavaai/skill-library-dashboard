'use client';

import { useEffect, useCallback, useState } from 'react';
import ReactMarkdown from 'react-markdown';

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

interface SkillModalProps {
  skill: Skill;
  onClose: () => void;
}

export default function SkillModal({ skill, onClose }: SkillModalProps) {
  const [visible, setVisible] = useState(false);
  const [closeBtnHovered, setCloseBtnHovered] = useState(false);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    // Trigger animation after mount
    requestAnimationFrame(() => setVisible(true));

    window.addEventListener('keydown', handleEscape);
    // Prevent background scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = originalOverflow || '';
    };
  }, [handleEscape]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  return (
    <div
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        background: visible ? 'rgba(3,3,5,0.92)' : 'rgba(3,3,5,0)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        padding: '48px 16px 64px',
        transition: 'background 0.3s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 820,
          position: 'relative',
          background: '#111111',
          border: '1px solid #2a2a2a',
          borderRadius: 16,
          marginBottom: 32,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '32px 32px 24px',
          borderBottom: '1px solid #2a2a2a',
        }}>
          {/* Close button */}
          <button
            onClick={onClose}
            onMouseEnter={() => setCloseBtnHovered(true)}
            onMouseLeave={() => setCloseBtnHovered(false)}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: closeBtnHovered ? '1px solid #06B6D4' : '1px solid #2a2a2a',
              borderRadius: 8,
              color: closeBtnHovered ? '#FFFFFF' : '#86868B',
              background: closeBtnHovered ? 'rgba(6,182,212,0.1)' : 'transparent',
              cursor: 'pointer',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 16,
              transition: 'all 0.2s ease',
              zIndex: 10,
              padding: 0,
            }}
          >
            ✕
          </button>

          {/* Label */}
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14,
            fontWeight: 500,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.12em',
            color: '#86868B',
            marginBottom: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}>
            <span style={{ width: 32, height: 1, background: 'rgba(6,182,212,0.3)', flexShrink: 0 }} />
            SKILL DETAILS
          </div>

          {/* Category */}
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.1em',
            color: '#06B6D4',
            marginBottom: 12,
          }}>
            {skill.category.replace(/-/g, ' ').replace(/\//g, ' / ')}
          </p>

          {/* Title */}
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: 24,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            paddingRight: 48,
          }}>
            {skill.name}
          </h2>

          {/* Metadata row */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap' as const,
            alignItems: 'center',
            gap: 12,
          }}>
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
                animation: 'pulse-dot 2s ease-in-out infinite',
              }} />
              {skill.status.toUpperCase()}
            </div>

            {skill.usedBy.length > 0 && (
              <div style={{
                display: 'flex',
                flexWrap: 'wrap' as const,
                alignItems: 'center',
                gap: 8,
              }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.1em',
                  color: '#86868B',
                }}>
                  USED BY
                </span>
                {skill.usedBy.map((agent) => (
                  <span key={agent} style={{
                    background: '#111111',
                    border: '1px solid #2a2a2a',
                    padding: '5px 12px',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    textTransform: 'uppercase' as const,
                    letterSpacing: '0.06em',
                    color: '#86868B',
                    borderRadius: 6,
                  }}>
                    {agent}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Features */}
          {(skill.hasScripts || skill.hasReferences || skill.hasTemplates) && (
            <div style={{
              display: 'flex',
              gap: 16,
              marginTop: 20,
              paddingTop: 20,
              borderTop: '1px solid #2a2a2a',
            }}>
              {skill.hasScripts && (
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 14,
                  color: '#06B6D4',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                }}>→ SCRIPTS</span>
              )}
              {skill.hasReferences && (
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 14,
                  color: '#06B6D4',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                }}>→ REFERENCES</span>
              )}
              {skill.hasTemplates && (
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 14,
                  color: '#06B6D4',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                }}>→ TEMPLATES</span>
              )}
            </div>
          )}
        </div>

        {/* Content body */}
        <div style={{ padding: 32 }}>
          {skill.skillMdContent ? (
            <>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                fontWeight: 500,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.12em',
                color: '#86868B',
                marginBottom: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}>
                <span style={{ width: 32, height: 1, background: 'rgba(6,182,212,0.3)', flexShrink: 0 }} />
                SKILL.MD
              </div>
              <div className="skill-markdown" style={{
                background: '#0a0a0c',
                border: '1px solid #2a2a2a',
                borderRadius: 12,
                padding: 32,
                marginBottom: 40,
              }}>
                <ReactMarkdown>{skill.skillMdContent}</ReactMarkdown>
              </div>
            </>
          ) : (
            <div style={{
              background: '#111111',
              border: '1px solid #2a2a2a',
              borderRadius: 16,
              padding: 40,
              textAlign: 'center' as const,
              marginBottom: 40,
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                fontWeight: 500,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.12em',
                color: '#86868B',
                marginBottom: 12,
              }}>NO SKILL.MD FOUND</div>
              <p style={{ color: '#86868B', fontStyle: 'italic', fontSize: 15 }}>
                This skill is missing its main instruction file
              </p>
            </div>
          )}

          {skill.readmeContent && (
            <>
              {/* Divider */}
              <div style={{
                height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.1), transparent)',
                margin: '32px 0',
              }} />
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                fontWeight: 500,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.12em',
                color: '#86868B',
                marginBottom: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}>
                <span style={{ width: 32, height: 1, background: 'rgba(6,182,212,0.3)', flexShrink: 0 }} />
                README.MD
              </div>
              <div className="skill-markdown" style={{
                background: '#0a0a0c',
                border: '1px solid #2a2a2a',
                borderRadius: 12,
                padding: 32,
              }}>
                <ReactMarkdown>{skill.readmeContent}</ReactMarkdown>
              </div>
            </>
          )}

          {/* Close hint */}
          <div style={{
            marginTop: 40,
            paddingTop: 24,
            textAlign: 'center' as const,
            borderTop: '1px solid #2a2a2a',
          }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.12em',
              color: '#86868B',
            }}>
              ESC OR CLICK OUTSIDE TO CLOSE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
