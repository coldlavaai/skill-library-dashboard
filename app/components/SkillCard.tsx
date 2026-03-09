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
  const statusStyles: Record<string, { bg: string; border: string; text: string; glow: string }> = {
    active: { 
      bg: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(6, 182, 212, 0.08) 100%)', 
      border: 'rgba(6, 182, 212, 0.4)',
      text: '#06B6D4',
      glow: '0 0 12px rgba(6, 182, 212, 0.3)'
    },
    beta: { 
      bg: 'linear-gradient(135deg, rgba(201, 169, 98, 0.15) 0%, rgba(201, 169, 98, 0.08) 100%)', 
      border: 'rgba(201, 169, 98, 0.4)',
      text: '#C9A962',
      glow: '0 0 12px rgba(201, 169, 98, 0.3)'
    },
    deprecated: { 
      bg: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)', 
      border: 'rgba(255, 255, 255, 0.25)',
      text: 'rgba(255, 255, 255, 0.6)',
      glow: '0 0 8px rgba(255, 255, 255, 0.2)'
    },
  };

  const statusStyle = statusStyles[skill.status] || statusStyles.active;

  return (
    <div
      onClick={onClick}
      className="card-premium brackets-premium p-10 cursor-pointer group rounded-2xl"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-6">
        <h3 className="text-4xl font-bold text-white group-hover:text-cyan-bright transition-all duration-400 leading-tight flex-1">
          {skill.name}
        </h3>
        <span
          className="mono-label px-4 py-2.5 flex-shrink-0 tracking-widest text-sm rounded-md font-medium transition-all duration-300"
          style={{
            background: statusStyle.bg,
            border: `1px solid ${statusStyle.border}`,
            color: statusStyle.text,
            boxShadow: statusStyle.glow,
          }}
        >
          {skill.status.toUpperCase()}
        </span>
      </div>

      {/* Description */}
      <p className="text-body text-xl leading-relaxed mb-8 line-clamp-3">
        {skill.description || <span className="italic text-white/40">No description available</span>}
      </p>

      {/* Used By */}
      {skill.usedBy.length > 0 && (
        <div className="mb-8 pb-8 border-b border-white/10">
          <p className="mono-label text-cyan-very-faint mb-4 tracking-wider text-sm">USED BY</p>
          <div className="flex flex-wrap gap-3">
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
        <div className="flex gap-6 mono-label text-cyan-faint text-sm tracking-wider">
          {skill.hasScripts && <span className="transition-colors hover:text-cyan">→ SCRIPTS</span>}
          {skill.hasReferences && <span className="transition-colors hover:text-cyan">→ REFS</span>}
          {skill.hasTemplates && <span className="transition-colors hover:text-cyan">→ TEMPLATES</span>}
        </div>
      )}

      {/* Click indicator */}
      <div className="mt-8 pt-8 border-t border-white/10 mono-small text-white/35 group-hover:text-cyan/70 transition-all duration-300 tracking-wider flex items-center gap-3">
        <span>VIEW DETAILS</span>
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}
