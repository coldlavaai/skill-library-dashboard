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
      className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-50 flex items-center justify-center p-4 md:p-12 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="glass-panel w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col rounded-3xl animate-scaleIn shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-white/10 p-12 flex items-start justify-between flex-shrink-0 bg-gradient-to-b from-white/5 to-transparent">
          <div className="flex-1">
            <div className="label-line mb-8">
              SKILL DETAILS
            </div>
            <h2 className="text-6xl font-bold text-white mb-10 tracking-tight leading-none bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
              {skill.name}
            </h2>
            
            {/* Metadata Row */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Status Badge */}
              <div className="badge-premium">
                <div className="badge-dot"></div>
                <span className="tracking-wider">
                  {skill.status.toUpperCase()}
                </span>
              </div>

              {/* Used By Tags */}
              {skill.usedBy.length > 0 && (
                <div className="flex flex-wrap items-center gap-3">
                  <span className="mono-label text-white/40 text-sm">USED BY:</span>
                  {skill.usedBy.map((agent) => (
                    <span
                      key={agent}
                      className="pill-tag"
                    >
                      {agent}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Features */}
            {(skill.hasScripts || skill.hasReferences || skill.hasTemplates) && (
              <div className="flex gap-6 mono-label text-cyan-faint mt-8 pt-8 border-t border-white/10 text-sm tracking-wider">
                {skill.hasScripts && <span>→ SCRIPTS</span>}
                {skill.hasReferences && <span>→ REFERENCES</span>}
                {skill.hasTemplates && <span>→ TEMPLATES</span>}
              </div>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-white/40 hover:text-cyan-bright transition-all duration-300 text-4xl leading-none font-light ml-12 flex-shrink-0 hover:scale-110 hover:rotate-90"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-12 flex-1">
          {skill.skillMdContent ? (
            <>
              <div className="label-line mb-8">
                SKILL.MD
              </div>
              <div className="card-premium brackets-premium p-10 mb-16 skill-markdown rounded-2xl">
                <ReactMarkdown>
                  {skill.skillMdContent}
                </ReactMarkdown>
              </div>
            </>
          ) : (
            <div className="glass-panel p-16 text-center mb-16 rounded-2xl">
              <div className="mono-label text-cyan/40 mb-6 text-lg tracking-widest">NO SKILL.MD FOUND</div>
              <p className="text-white/50 italic text-xl">This skill is missing its main instruction file</p>
            </div>
          )}

          {skill.readmeContent && (
            <>
              <div className="label-line mb-8 mt-16">
                README.MD
              </div>
              <div className="card-premium brackets-premium p-10 skill-markdown rounded-2xl">
                <ReactMarkdown>
                  {skill.readmeContent}
                </ReactMarkdown>
              </div>
            </>
          )}

          {/* Close hint at bottom */}
          <div className="mt-20 pt-12 border-t border-white/10 text-center">
            <p className="mono-small text-white/25 tracking-wider">
              PRESS <kbd className="px-3 py-1.5 bg-white/10 rounded-md mx-2 text-white/40">ESC</kbd> OR CLICK OUTSIDE TO CLOSE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
