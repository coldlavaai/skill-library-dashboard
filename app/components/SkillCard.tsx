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
      bg: 'rgba(6, 182, 212, 0.12)', 
      border: 'rgba(6, 182, 212, 0.35)',
      text: '#06B6D4'
    },
    beta: { 
      bg: 'rgba(201, 169, 98, 0.12)', 
      border: 'rgba(201, 169, 98, 0.35)',
      text: '#C9A962'
    },
    deprecated: { 
      bg: 'rgba(255, 255, 255, 0.06)', 
      border: 'rgba(255, 255, 255, 0.2)',
      text: 'rgba(255, 255, 255, 0.5)'
    },
  };

  const statusStyle = statusStyles[skill.status] || statusStyles.active;

  return (
    <div
      onClick={onClick}
      className="card corner-brackets p-8 hover-cyan hover-lift transition-all duration-300 cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <h3 className="text-3xl font-bold text-white group-hover:text-cyan transition-colors leading-tight flex-1">
          {skill.name}
        </h3>
        <span
          className="mono-label px-3 py-2 flex-shrink-0 tracking-widest text-sm"
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
      <p className="text-body text-lg leading-relaxed mb-6 line-clamp-3">
        {skill.description || <span className="italic text-white/35">No description available</span>}
      </p>

      {/* Used By */}
      {skill.usedBy.length > 0 && (
        <div className="mb-6 pb-6 border-b border-white/8">
          <p className="mono-label text-cyan-very-faint mb-3 tracking-wider text-sm">USED BY</p>
          <div className="flex flex-wrap gap-2">
            {skill.usedBy.map((agent) => (
              <span
                key={agent}
                className="pill-tag text-sm"
              >
                {agent}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Features */}
      {(skill.hasScripts || skill.hasReferences || skill.hasTemplates) && (
        <div className="flex gap-5 mono-label text-cyan-faint text-sm tracking-wider">
          {skill.hasScripts && <span>→ SCRIPTS</span>}
          {skill.hasReferences && <span>→ REFS</span>}
          {skill.hasTemplates && <span>→ TEMPLATES</span>}
        </div>
      )}

      {/* Click indicator */}
      <div className="mt-6 pt-6 border-t border-white/8 mono-small text-white/30 group-hover:text-cyan/50 transition-colors tracking-wider">
        CLICK TO VIEW DETAILS →
      </div>
    </div>
  );
}
