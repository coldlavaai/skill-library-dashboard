import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

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

interface SkillModalProps {
  skill: Skill;
  onClose: () => void;
}

export default function SkillModal({ skill, onClose }: SkillModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
        style={{
          background: 'rgba(0, 0, 0, 0.6)',
          border: '1px solid rgba(6, 182, 212, 0.2)',
          backdropFilter: 'blur(8px)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-8 flex items-start justify-between flex-shrink-0" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <div className="flex-1">
            <div className="label mb-4">
              SKILL DETAILS
            </div>
            <h2 className="text-5xl font-bold text-white mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }}>
              {skill.name}
            </h2>
            
            {/* Metadata Row */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Status Badge */}
              <div className="investment">
                <div className="dot"></div>
                <span>{skill.status.toUpperCase()}</span>
              </div>

              {/* Used By Tags */}
              {skill.usedBy.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.35)', letterSpacing: '0.1em' }}>USED BY:</span>
                  {skill.usedBy.map((agent) => (
                    <span key={agent} className="pill-tag text-xs">
                      {agent}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Features */}
            {(skill.hasScripts || skill.hasReferences || skill.hasTemplates) && (
              <div className="flex gap-4 mt-6 pt-6 text-xs font-mono uppercase tracking-wider" style={{ 
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                color: 'rgba(6, 182, 212, 0.5)',
                letterSpacing: '0.1em'
              }}>
                {skill.hasScripts && <span>→ SCRIPTS</span>}
                {skill.hasReferences && <span>→ REFERENCES</span>}
                {skill.hasTemplates && <span>→ TEMPLATES</span>}
              </div>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-3xl leading-none font-light ml-8 flex-shrink-0"
            style={{ color: 'rgba(255, 255, 255, 0.35)' }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-8 flex-1">
          {skill.skillMdContent ? (
            <>
              <div className="label mb-6">
                SKILL.MD
              </div>
              <div className="card p-6 mb-12 skill-markdown">
                <ReactMarkdown>
                  {skill.skillMdContent}
                </ReactMarkdown>
              </div>
            </>
          ) : (
            <div className="arch-box p-12 text-center mb-12">
              <div className="corner-tr"></div>
              <div className="corner-bl"></div>
              <div className="label mb-4">NO SKILL.MD FOUND</div>
              <p style={{ color: 'rgba(255, 255, 255, 0.5)' }} className="italic">This skill is missing its main instruction file</p>
            </div>
          )}

          {skill.readmeContent && (
            <>
              <div className="label mb-6 mt-12">
                README.MD
              </div>
              <div className="card p-6 skill-markdown">
                <ReactMarkdown>
                  {skill.readmeContent}
                </ReactMarkdown>
              </div>
            </>
          )}

          {/* Close hint at bottom */}
          <div className="mt-12 pt-8 text-center" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <p className="text-xs font-mono uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.25)', letterSpacing: '0.1em' }}>
              PRESS ESC OR CLICK OUTSIDE TO CLOSE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
