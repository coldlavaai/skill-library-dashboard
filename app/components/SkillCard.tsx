interface Skill {
  name: string;
  category: string;
  description: string;
  usedBy: string[];
  status: string;
  hasScripts: boolean;
  hasReferences: boolean;
  hasTemplates: boolean;
}

interface SkillCardProps {
  skill: Skill;
  onClick: () => void;
}

const categoryIcons: Record<string, string> = {
  'agency-templates': '◇',
  'clawdbot-core': '⬡',
  'cold-lava-custom': '◆',
  'integrations': '⊕',
  'automation': '⟐',
  'default': '◈',
};

function getCategoryIcon(category: string): string {
  const base = category.split('/')[0];
  return categoryIcons[base] || categoryIcons['default'];
}

export default function SkillCard({ skill, onClick }: SkillCardProps) {
  const baseCategory = skill.category.split('/')[0];
  const subCategory = skill.category.includes('/') 
    ? skill.category.split('/').slice(1).join(' / ') 
    : null;

  return (
    <div onClick={onClick} className="card">
      {/* Category + Status row */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="text-[#06B6D4] text-sm leading-none">
            {getCategoryIcon(skill.category)}
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-[#06B6D4]">
            {baseCategory.replace(/-/g, ' ')}
            {subCategory && (
              <span className="text-[#86868B]">
                {' / '}{subCategory.replace(/-/g, ' ')}
              </span>
            )}
          </span>
        </div>
        <span
          className={`font-mono text-xs uppercase tracking-wider px-2.5 py-1 rounded-md border ${
            skill.status === 'active'
              ? 'bg-[#06B6D4]/8 border-[#06B6D4]/20 text-[#06B6D4]'
              : 'bg-[#111111] border-[#1a1a1a] text-[#86868B]'
          }`}
        >
          {skill.status === 'active' && (
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#06B6D4] mr-1.5 align-middle relative -top-px" />
          )}
          {skill.status.toUpperCase()}
        </span>
      </div>

      {/* Skill name */}
      <h3 className="text-lg font-semibold text-white mb-3 leading-snug">
        {skill.name}
      </h3>

      {/* Description */}
      <p className="text-sm text-[#86868B] mb-5 leading-relaxed line-clamp-3">
        {skill.description || (
          <span className="italic text-[#86868B]">No description available</span>
        )}
      </p>

      {/* Used By */}
      {skill.usedBy.length > 0 && (
        <div className="pb-4 mb-4 border-b border-[#1a1a1a]">
          <p className="font-mono text-xs uppercase tracking-wider text-[#86868B] mb-2">
            USED BY
          </p>
          <div className="flex flex-wrap gap-1.5">
            {skill.usedBy.map((agent) => (
              <span key={agent} className="pill-tag text-xs px-2 py-1">
                {agent}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Features */}
      {(skill.hasScripts || skill.hasReferences || skill.hasTemplates) && (
        <div className="flex flex-wrap gap-3 pb-4 mb-3 border-b border-[#1a1a1a]">
          {skill.hasScripts && (
            <span className="font-mono text-xs text-[#06B6D4] tracking-wider">→ SCRIPTS</span>
          )}
          {skill.hasReferences && (
            <span className="font-mono text-xs text-[#06B6D4] tracking-wider">→ REFS</span>
          )}
          {skill.hasTemplates && (
            <span className="font-mono text-xs text-[#06B6D4] tracking-wider">→ TEMPLATES</span>
          )}
        </div>
      )}

      {/* View prompt */}
      <div className="font-mono text-xs uppercase tracking-wider text-[#86868B] mt-2">
        VIEW DETAILS →
      </div>
    </div>
  );
}
