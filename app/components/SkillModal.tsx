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
      className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="card-elevated corner-brackets-lg w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-white/5 p-8 flex items-start justify-between flex-shrink-0">
          <div className="flex-1">
            <div className="label-line mb-4">
              SKILL DETAILS
            </div>
            <h2 className="text-5xl font-bold text-white mb-6 tracking-tight leading-none">
              {skill.name}
            </h2>
            
            {/* Metadata Row */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 bg-cyan/10 border border-cyan/25 px-4 py-2">
                <div className="w-1.5 h-1.5 bg-cyan rounded-full"></div>
                <span className="mono-small text-cyan-dim tracking-wider">
                  {skill.status.toUpperCase()}
                </span>
              </div>

              {/* Used By Tags */}
              {skill.usedBy.length > 0 && (
                <>
                  <span className="mono-small text-white/30">USED BY:</span>
                  {skill.usedBy.map((agent) => (
                    <span
                      key={agent}
                      className="pill-tag text-xs"
                    >
                      {agent}
                    </span>
                  ))}
                </>
              )}
            </div>

            {/* Features */}
            {(skill.hasScripts || skill.hasReferences || skill.hasTemplates) && (
              <div className="flex gap-4 mono-small text-cyan-faint mt-4 pt-4 border-t border-white/5">
                {skill.hasScripts && <span>→ SCRIPTS</span>}
                {skill.hasReferences && <span>→ REFERENCES</span>}
                {skill.hasTemplates && <span>→ TEMPLATES</span>}
              </div>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-white/30 hover:text-cyan transition-colors text-3xl leading-none font-light ml-8 flex-shrink-0"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-8 flex-1">
          {skill.skillMdContent ? (
            <>
              <div className="label-line mb-6">
                SKILL.MD
              </div>
              <div className="card corner-brackets p-8 mb-12 skill-markdown">
                <ReactMarkdown>
                  {skill.skillMdContent}
                </ReactMarkdown>
              </div>
            </>
          ) : (
            <div className="arch-box arch-box-tr arch-box-bl p-12 text-center mb-12">
              <div className="mono-label text-cyan/30 mb-2">NO SKILL.MD FOUND</div>
              <p className="text-white/40 italic">This skill is missing its main instruction file</p>
            </div>
          )}

          {skill.readmeContent && (
            <>
              <div className="label-line mb-6 mt-12">
                README.MD
              </div>
              <div className="card corner-brackets p-8 skill-markdown">
                <ReactMarkdown>
                  {skill.readmeContent}
                </ReactMarkdown>
              </div>
            </>
          )}

          {/* Close hint at bottom */}
          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="mono-small text-white/20 tracking-wider">
              PRESS ESC OR CLICK OUTSIDE TO CLOSE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
