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
      className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto"
      style={{
        background: 'rgba(3,3,5,0.92)',
        backdropFilter: 'blur(16px)',
        padding: '3rem 1rem 4rem',
      }}
      onClick={onClose}
    >
      <div
        className="w-full relative bg-[#111111] border border-[#1a1a1a] rounded-2xl mb-8"
        style={{
          maxWidth: 820,
          animation: 'fadeInUp 0.4s ease-out forwards',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-8 pb-6 border-b border-[#1a1a1a]">
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center border border-[#1a1a1a] rounded-lg text-[#86868B] hover:text-white hover:border-[#06B6D4] transition-all cursor-pointer font-mono text-sm bg-transparent"
          >
            ✕
          </button>

          <div className="label mb-3">SKILL DETAILS</div>

          {/* Category */}
          <p className="font-mono text-sm uppercase tracking-wider text-[#06B6D4] mb-3">
            {skill.category.replace(/-/g, ' ').replace(/\//g, ' / ')}
          </p>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }}>
            {skill.name}
          </h2>

          {/* Metadata row */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="investment" style={{ marginTop: 0 }}>
              <div className="dot"></div>
              <span>{skill.status.toUpperCase()}</span>
            </div>

            {skill.usedBy.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-wider text-[#86868B]">
                  USED BY
                </span>
                {skill.usedBy.map((agent) => (
                  <span key={agent} className="pill-tag text-xs px-2 py-1">
                    {agent}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Features */}
          {(skill.hasScripts || skill.hasReferences || skill.hasTemplates) && (
            <div className="flex gap-4 mt-5 pt-5 border-t border-[#1a1a1a]">
              {skill.hasScripts && (
                <span className="font-mono text-sm text-[#06B6D4] tracking-wider uppercase">→ SCRIPTS</span>
              )}
              {skill.hasReferences && (
                <span className="font-mono text-sm text-[#06B6D4] tracking-wider uppercase">→ REFERENCES</span>
              )}
              {skill.hasTemplates && (
                <span className="font-mono text-sm text-[#06B6D4] tracking-wider uppercase">→ TEMPLATES</span>
              )}
            </div>
          )}
        </div>

        {/* Content body */}
        <div className="p-8 modal-content">
          {skill.skillMdContent ? (
            <>
              <div className="label mb-5">SKILL.MD</div>
              <div className="skill-markdown bg-[#0a0a0c] border border-[#1a1a1a] rounded-xl p-8 mb-10">
                <ReactMarkdown>{skill.skillMdContent}</ReactMarkdown>
              </div>
            </>
          ) : (
            <div className="arch-box p-10 text-center mb-10">
              <div className="label mb-3" style={{ justifyContent: 'center' }}>NO SKILL.MD FOUND</div>
              <p className="text-[#86868B] italic">
                This skill is missing its main instruction file
              </p>
            </div>
          )}

          {skill.readmeContent && (
            <>
              <div className="section-divider" style={{ margin: '2rem 0' }}></div>
              <div className="label mb-5">README.MD</div>
              <div className="skill-markdown bg-[#0a0a0c] border border-[#1a1a1a] rounded-xl p-8">
                <ReactMarkdown>{skill.readmeContent}</ReactMarkdown>
              </div>
            </>
          )}

          {/* Close hint */}
          <div className="mt-10 pt-6 text-center border-t border-[#1a1a1a]">
            <p className="font-mono text-xs uppercase tracking-wider text-[#86868B]">
              ESC OR CLICK OUTSIDE TO CLOSE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
