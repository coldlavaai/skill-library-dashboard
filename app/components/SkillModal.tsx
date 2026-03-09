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
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-purple-400/30 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-purple-400/30 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">{skill.name}</h2>
            {skill.usedBy.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {skill.usedBy.map((agent) => (
                  <span
                    key={agent}
                    className="px-2 py-1 bg-purple-500/30 rounded text-xs text-white"
                  >
                    {agent}
                  </span>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-purple-300 hover:text-white transition-colors text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 prose prose-invert max-w-none">
          {skill.skillMdContent ? (
            <>
              <h3 className="text-purple-300 text-xl font-semibold mb-4">
                SKILL.md
              </h3>
              <div className="bg-slate-800/50 rounded-lg p-4 mb-6 text-purple-100">
                <ReactMarkdown>
                  {skill.skillMdContent}
                </ReactMarkdown>
              </div>
            </>
          ) : (
            <p className="text-purple-300 italic">No SKILL.md found</p>
          )}

          {skill.readmeContent && (
            <>
              <h3 className="text-purple-300 text-xl font-semibold mb-4 mt-6">
                README.md
              </h3>
              <div className="bg-slate-800/50 rounded-lg p-4 text-purple-100">
                <ReactMarkdown>
                  {skill.readmeContent}
                </ReactMarkdown>
              </div>
            </>
          )}

          {/* Features */}
          <div className="mt-6 flex gap-4 text-sm text-purple-300">
            {skill.hasScripts && <span>📜 Has Scripts</span>}
            {skill.hasReferences && <span>📚 Has References</span>}
            {skill.hasTemplates && <span>📄 Has Templates</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
