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
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8"
      onClick={onClose}
    >
      <div
        className="card-elevated corner-brackets-lg rounded-none max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col border border-cyan/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-white/5 p-8 flex items-start justify-between">
          <div>
            <div className="mono-label text-cyan/40 mb-3">SKILL</div>
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
              {skill.name}
            </h2>
            {skill.usedBy.length > 0 && (
              <div className="flex gap-2 flex-wrap">
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
          <button
            onClick={onClose}
            className="text-white/30 hover:text-cyan transition-colors text-3xl leading-none font-light"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-8">
          {skill.skillMdContent ? (
            <>
              <div className="mono-label text-cyan/40 mb-4 flex items-center gap-3">
                <div className="w-8 h-px bg-cyan/20"></div>
                SKILL.MD
              </div>
              <div className="card p-6 mb-8 prose prose-invert max-w-none">
                <div className="text-white/60 leading-relaxed skill-markdown">
                  <ReactMarkdown>
                    {skill.skillMdContent}
                  </ReactMarkdown>
                </div>
              </div>
            </>
          ) : (
            <p className="text-white/40 italic mono-small">NO SKILL.MD FOUND</p>
          )}

          {skill.readmeContent && (
            <>
              <div className="mono-label text-cyan/40 mb-4 mt-8 flex items-center gap-3">
                <div className="w-8 h-px bg-cyan/20"></div>
                README.MD
              </div>
              <div className="card p-6 prose prose-invert max-w-none">
                <div className="text-white/60 leading-relaxed skill-markdown">
                  <ReactMarkdown>
                    {skill.readmeContent}
                  </ReactMarkdown>
                </div>
              </div>
            </>
          )}

          {/* Features */}
          {(skill.hasScripts || skill.hasReferences || skill.hasTemplates) && (
            <div className="mt-8 flex gap-4 mono-small text-cyan/40 border-t border-white/5 pt-4">
              {skill.hasScripts && <span>→ HAS SCRIPTS</span>}
              {skill.hasReferences && <span>→ HAS REFERENCES</span>}
              {skill.hasTemplates && <span>→ HAS TEMPLATES</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
