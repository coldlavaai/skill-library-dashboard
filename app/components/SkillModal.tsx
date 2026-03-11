import { useEffect, useCallback } from 'react';
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
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [handleEscape]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center"
      style={{
        background: 'rgba(3,3,5,0.92)',
        backdropFilter: 'blur(16px)',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'],
        padding: '3rem 1rem 4rem',
      }}
      onClick={onClose}
    >
      <div
        className="w-full relative"
        style={{
          maxWidth: 820,
          background: 'rgba(0,0,0,0.7)',
          border: '1px solid rgba(6,182,212,0.15)',
          backdropFilter: 'blur(8px)',
          animation: 'fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          marginBottom: '2rem',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corner brackets on modal */}
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: 20, height: 20,
          borderLeft: '1px solid rgba(6,182,212,0.3)',
          borderTop: '1px solid rgba(6,182,212,0.3)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, right: 0,
          width: 20, height: 20,
          borderRight: '1px solid rgba(6,182,212,0.3)',
          borderBottom: '1px solid rgba(6,182,212,0.3)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: 20, height: 20,
          borderRight: '1px solid rgba(6,182,212,0.15)',
          borderTop: '1px solid rgba(6,182,212,0.15)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          width: 20, height: 20,
          borderLeft: '1px solid rgba(6,182,212,0.15)',
          borderBottom: '1px solid rgba(6,182,212,0.15)',
          pointerEvents: 'none',
        }} />

        {/* Header */}
        <div
          className="p-8 pb-6"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.3)',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(6,182,212,0.3)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.3)';
            }}
          >
            ✕
          </button>

          <div className="label mb-3">
            SKILL DETAILS
          </div>

          {/* Category */}
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'rgba(6,182,212,0.55)',
              marginBottom: '0.85rem',
            }}
          >
            {skill.category.replace(/-/g, ' ').replace(/\//g, ' / ')}
          </p>

          {/* Title */}
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              marginBottom: '1.75rem',
            }}
          >
            {skill.name}
          </h2>

          {/* Metadata row */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Status */}
            <div className="investment" style={{ marginTop: 0 }}>
              <div className="dot"></div>
              <span>{skill.status.toUpperCase()}</span>
            </div>

            {/* Used by */}
            {skill.usedBy.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'rgba(255,255,255,0.35)',
                  }}
                >
                  USED BY
                </span>
                {skill.usedBy.map((agent) => (
                  <span
                    key={agent}
                    className="pill-tag"
                    style={{ fontSize: '0.65rem', padding: '0.3rem 0.6rem' }}
                  >
                    {agent}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Features */}
          {(skill.hasScripts || skill.hasReferences || skill.hasTemplates) && (
            <div
              className="flex gap-4 mt-5 pt-5"
              style={{
                borderTop: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              {skill.hasScripts && (
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'rgba(6,182,212,0.45)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>→ SCRIPTS</span>
              )}
              {skill.hasReferences && (
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'rgba(6,182,212,0.45)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>→ REFERENCES</span>
              )}
              {skill.hasTemplates && (
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'rgba(6,182,212,0.45)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>→ TEMPLATES</span>
              )}
            </div>
          )}
        </div>

        {/* Content body */}
        <div className="p-8 modal-content">
          {skill.skillMdContent ? (
            <>
              <div className="label mb-5">
                SKILL.MD
              </div>
              <div
                className="skill-markdown"
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(6,182,212,0.08)',
                  padding: '2rem',
                  marginBottom: '3rem',
                  position: 'relative',
                }}
              >
                {/* Corner brackets */}
                <div style={{
                  position: 'absolute', top: 0, left: 0,
                  width: 10, height: 10,
                  borderLeft: '1px solid rgba(6,182,212,0.2)',
                  borderTop: '1px solid rgba(6,182,212,0.2)',
                  pointerEvents: 'none',
                }} />
                <div style={{
                  position: 'absolute', bottom: 0, right: 0,
                  width: 10, height: 10,
                  borderRight: '1px solid rgba(6,182,212,0.2)',
                  borderBottom: '1px solid rgba(6,182,212,0.2)',
                  pointerEvents: 'none',
                }} />
                <ReactMarkdown>
                  {skill.skillMdContent}
                </ReactMarkdown>
              </div>
            </>
          ) : (
            <div className="arch-box p-10 text-center mb-10">
              <div className="corner-tr"></div>
              <div className="corner-bl"></div>
              <div className="label mb-3" style={{ justifyContent: 'center' }}>NO SKILL.MD FOUND</div>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontStyle: 'italic', fontWeight: 300 }}>
                This skill is missing its main instruction file
              </p>
            </div>
          )}

          {skill.readmeContent && (
            <>
              <div className="section-divider" style={{ margin: '2rem 0' }}></div>
              <div className="label mb-5">
                README.MD
              </div>
              <div
                className="skill-markdown"
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(6,182,212,0.08)',
                  padding: '2rem',
                  position: 'relative',
                }}
              >
                <div style={{
                  position: 'absolute', top: 0, left: 0,
                  width: 10, height: 10,
                  borderLeft: '1px solid rgba(6,182,212,0.2)',
                  borderTop: '1px solid rgba(6,182,212,0.2)',
                  pointerEvents: 'none',
                }} />
                <div style={{
                  position: 'absolute', bottom: 0, right: 0,
                  width: 10, height: 10,
                  borderRight: '1px solid rgba(6,182,212,0.2)',
                  borderBottom: '1px solid rgba(6,182,212,0.2)',
                  pointerEvents: 'none',
                }} />
                <ReactMarkdown>
                  {skill.readmeContent}
                </ReactMarkdown>
              </div>
            </>
          )}

          {/* Close hint */}
          <div
            className="mt-10 pt-6 text-center"
            style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
          >
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'rgba(255,255,255,0.15)',
              }}
            >
              ESC OR CLICK OUTSIDE TO CLOSE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
