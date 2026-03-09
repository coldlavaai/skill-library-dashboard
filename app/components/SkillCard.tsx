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
  const statusColors: Record<string, string> = {
    active: 'bg-green-500',
    beta: 'bg-yellow-500',
    deprecated: 'bg-red-500',
  };

  return (
    <div
      onClick={onClick}
      className="bg-white/10 backdrop-blur-md border border-purple-400/30 rounded-lg p-6 hover:bg-white/20 hover:border-purple-400/50 transition-all cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-2xl font-bold text-white group-hover:text-purple-200 transition-colors">
          {skill.name}
        </h3>
        <span
          className={`px-2 py-1 rounded text-xs font-semibold text-white ${
            statusColors[skill.status] || 'bg-gray-500'
          }`}
        >
          {skill.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-purple-200 mb-4 line-clamp-3">
        {skill.description || 'No description available'}
      </p>

      {/* Used By */}
      {skill.usedBy.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-purple-300 mb-2">Used by:</p>
          <div className="flex flex-wrap gap-2">
            {skill.usedBy.map((agent) => (
              <span
                key={agent}
                className="px-2 py-1 bg-purple-500/30 rounded text-xs text-white"
              >
                {agent}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Features */}
      <div className="flex gap-3 text-xs text-purple-300">
        {skill.hasScripts && <span>📜 Scripts</span>}
        {skill.hasReferences && <span>📚 Refs</span>}
        {skill.hasTemplates && <span>📄 Templates</span>}
      </div>
    </div>
  );
}
