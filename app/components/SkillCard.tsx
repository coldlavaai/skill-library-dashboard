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
  const statusStyles: Record<string, { bg: string; border: string; text: string }> = {
    active: { 
      bg: 'rgba(6, 182, 212, 0.1)', 
      border: 'rgba(6, 182, 212, 0.3)',
      text: '#06B6D4'
    },
    beta: { 
      bg: 'rgba(201, 169, 98, 0.1)', 
      border: 'rgba(201, 169, 98, 0.3)',
      text: '#C9A962'
    },
    deprecated: { 
      bg: 'rgba(255, 255, 255, 0.05)', 
      border: 'rgba(255, 255, 255, 0.15)',
      text: 'rgba(255, 255, 255, 0.4)'
    },
  };

  const statusStyle = statusStyles[skill.status] || statusStyles.active;

  return (
    <div
      onClick={onClick}
      className="card corner-brackets p-6 hover-cyan hover-lift transition-all duration-300 cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4 gap-4">
        <h3 className="text-2xl font-bold text-white group-hover:text-cyan transition-colors leading-tight flex-1">
          {skill.name}
        </h3>
        <span
          className="mono-tiny px-2 py-1 flex-shrink-0 tracking-widest"
          style={{
            background: statusStyle.bg,
            border: `1px solid ${statusStyle.border}`,
            color: statusStyle.text,
          }}
        >
          {skill.status.toUpperCase()}
        </span>
      </div>

      {/* Description */}
      <p className="text-body text-[0.95rem] leading-relaxed mb-4 line-clamp-3">
        {skill.description || <span className="italic text-white/30">No description available</span>}
      </p>

      {/* Used By */}
      {skill.usedBy.length > 0 && (
        <div className="mb-4 pb-4 border-b border-white/5">
          <p className="mono-small text-cyan-very-faint mb-2 tracking-wider">USED BY</p>
          <div className="flex flex-wrap gap-2">
            {skill.usedBy.map((agent) => (
              <span
                key={agent}
                className="pill-tag text-xs"
              >
                {agent}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Features */}
      {(skill.hasScripts || skill.hasReferences || skill.hasTemplates) && (
        <div className="flex gap-4 mono-small text-cyan-faint">
          {skill.hasScripts && <span>→ SCRIPTS</span>}
          {skill.hasReferences && <span>→ REFS</span>}
          {skill.hasTemplates && <span>→ TEMPLATES</span>}
        </div>
      )}

      {/* Click indicator */}
      <div className="mt-4 pt-4 border-t border-white/5 mono-tiny text-white/20 group-hover:text-cyan/40 transition-colors">
        CLICK TO VIEW DETAILS →
      </div>
    </div>
  );
}
