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
          <span
            style={{
              color: 'rgba(6,182,212,0.4)',
              fontSize: '0.75rem',
              lineHeight: 1,
            }}
          >
            {getCategoryIcon(skill.category)}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'rgba(6,182,212,0.45)',
            }}
          >
            {baseCategory.replace(/-/g, ' ')}
            {subCategory && (
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>
                {' / '}{subCategory.replace(/-/g, ' ')}
              </span>
            )}
          </span>
        </div>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            padding: '0.25rem 0.6rem',
            background: skill.status === 'active'
              ? 'rgba(6,182,212,0.06)'
              : 'rgba(255,255,255,0.04)',
            border: `1px solid ${skill.status === 'active'
              ? 'rgba(6,182,212,0.15)'
              : 'rgba(255,255,255,0.08)'}`,
            color: skill.status === 'active'
              ? 'rgba(6,182,212,0.6)'
              : 'rgba(255,255,255,0.3)',
          }}
        >
          {skill.status === 'active' && (
            <span
              style={{
                display: 'inline-block',
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: 'rgba(6,182,212,0.6)',
                marginRight: 5,
                verticalAlign: 'middle',
                position: 'relative',
                top: -1,
              }}
            />
          )}
          {skill.status.toUpperCase()}
        </span>
      </div>

      {/* Skill name */}
      <h3
        style={{
          fontSize: '1.15rem',
          fontWeight: 600,
          color: '#fff',
          letterSpacing: '-0.01em',
          lineHeight: 1.35,
          marginBottom: '0.85rem',
        }}
      >
        {skill.name}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: '0.92rem',
          lineHeight: 1.7,
          color: 'rgba(255,255,255,0.7)',
          marginBottom: '1.25rem',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          fontWeight: 300,
        }}
      >
        {skill.description || (
          <span style={{ color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}>
            No description available
          </span>
        )}
      </p>

      {/* Used By */}
      {skill.usedBy.length > 0 && (
        <div
          style={{
            paddingBottom: '1rem',
            marginBottom: '1rem',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.35)',
              marginBottom: '0.5rem',
            }}
          >
            USED BY
          </p>
          <div className="flex flex-wrap gap-1.5">
            {skill.usedBy.map((agent) => (
              <span key={agent} className="pill-tag" style={{ fontSize: '0.65rem', padding: '0.3rem 0.6rem' }}>
                {agent}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Features */}
      {(skill.hasScripts || skill.hasReferences || skill.hasTemplates) && (
        <div className="flex flex-wrap gap-3"
          style={{
            paddingTop: '0.25rem',
            paddingBottom: '1rem',
            marginBottom: '0.75rem',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          {skill.hasScripts && (
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'rgba(6,182,212,0.45)',
              letterSpacing: '0.05em',
            }}>→ SCRIPTS</span>
          )}
          {skill.hasReferences && (
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'rgba(6,182,212,0.45)',
              letterSpacing: '0.05em',
            }}>→ REFS</span>
          )}
          {skill.hasTemplates && (
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'rgba(6,182,212,0.45)',
              letterSpacing: '0.05em',
            }}>→ TEMPLATES</span>
          )}
        </div>
      )}

      {/* View prompt */}
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.62rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'rgba(255,255,255,0.3)',
          transition: 'color 0.3s ease',
          marginTop: '0.5rem',
        }}
      >
        VIEW DETAILS →
      </div>
    </div>
  );
}
