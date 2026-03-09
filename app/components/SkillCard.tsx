interface Skill {
  name: string;
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

export default function SkillCard({ skill, onClick }: SkillCardProps) {
  const statusColors: Record<string, { bg: string; text: string }> = {
    active: { bg: 'rgba(6, 182, 212, 0.2)', text: '#06B6D4' },
    beta: { bg: 'rgba(201, 169, 98, 0.2)', text: '#C9A962' },
    deprecated: { bg: 'rgba(255, 255, 255, 0.1)', text: 'rgba(255, 255, 255, 0.4)' },
  };

  const statusStyle = statusColors[skill.status] || statusColors.active;

  return (
    <div
      onClick={onClick}
      className="card corner-brackets rounded-none p-6 hover-cyan transition-all cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-2xl font-bold text-white group-hover:text-cyan transition-colors">
          {skill.name}
        </h3>
        <span
          className="mono-small px-2 py-1"
          style={{
            background: statusStyle.bg,
            color: statusStyle.text,
          }}
        >
          {skill.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-body mb-4 text-[0.95rem] leading-relaxed line-clamp-3">
        {skill.description || 'No description available'}
      </p>

      {/* Used By */}
      {skill.usedBy.length > 0 && (
        <div className="mb-4">
          <p className="mono-small text-cyan/40 mb-2">USED BY:</p>
          <div className="flex flex-wrap gap-2">
            {skill.usedBy.map((agent) => (
              <span
                key={agent}
                className="pill-tag"
              >
                {agent}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Features */}
      {(skill.hasScripts || skill.hasReferences || skill.hasTemplates) && (
        <div className="flex gap-4 mono-small text-cyan/40 border-t border-white/5 pt-3 mt-3">
          {skill.hasScripts && <span>→ SCRIPTS</span>}
          {skill.hasReferences && <span>→ REFS</span>}
          {skill.hasTemplates && <span>→ TEMPLATES</span>}
        </div>
      )}
    </div>
  );
}
