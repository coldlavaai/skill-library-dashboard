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
  return (
    <div onClick={onClick} className="card">
      {/* Header */}
      <div className="flex items-start justify-between mb-4 gap-4">
        <h3 className="text-2xl font-bold text-white leading-tight flex-1">
          {skill.name}
        </h3>
        <span
          className="pill-tag text-xs flex-shrink-0"
          style={{
            background: skill.status === 'active' 
              ? 'rgba(6, 182, 212, 0.06)' 
              : 'rgba(255, 255, 255, 0.06)',
            borderColor: skill.status === 'active'
              ? 'rgba(6, 182, 212, 0.2)'
              : 'rgba(255, 255, 255, 0.15)',
          }}
        >
          {skill.status.toUpperCase()}
        </span>
      </div>

      {/* Description */}
      <p className="text-[0.95rem] leading-relaxed mb-4 line-clamp-3" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
        {skill.description || <span className="italic" style={{ color: 'rgba(255, 255, 255, 0.35)' }}>No description available</span>}
      </p>

      {/* Used By */}
      {skill.usedBy.length > 0 && (
        <div className="mb-4 pb-4" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
          <p className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: 'rgba(6, 182, 212, 0.4)', letterSpacing: '0.1em' }}>
            USED BY
          </p>
          <div className="flex flex-wrap gap-2">
            {skill.usedBy.map((agent) => (
              <span key={agent} className="pill-tag text-xs">
                {agent}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Features */}
      {(skill.hasScripts || skill.hasReferences || skill.hasTemplates) && (
        <div className="arrow-list">
          {skill.hasScripts && <li>Scripts included</li>}
          {skill.hasReferences && <li>Reference documentation</li>}
          {skill.hasTemplates && <li>Output templates</li>}
        </div>
      )}

      {/* Click indicator */}
      <div className="mt-4 pt-4 text-xs font-mono uppercase tracking-wider" style={{ 
        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
        color: 'rgba(255, 255, 255, 0.3)',
        letterSpacing: '0.1em'
      }}>
        CLICK TO VIEW DETAILS →
      </div>
    </div>
  );
}
