'use client';

import { useState } from 'react';

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
  index?: number;
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

export default function SkillCard({ skill, onClick, index = 0 }: SkillCardProps) {
  const [hovered, setHovered] = useState(false);
  const baseCategory = skill.category.split('/')[0];
  const subCategory = skill.category.includes('/') 
    ? skill.category.split('/').slice(1).join(' / ') 
    : null;

  const delay = Math.min(index * 0.05, 0.45);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: '#111111',
        border: hovered ? '1px solid rgba(6,182,212,0.3)' : '1px solid #2a2a2a',
        borderRadius: 16,
        padding: 28,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? '0 8px 32px rgba(0,0,0,0.3)' : 'none',
        animation: `fadeInUp 0.5s ease-out ${delay}s forwards`,
        opacity: 0,
      }}
    >
      {/* Category + Status row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: '#06B6D4', fontSize: 14, lineHeight: 1 }}>
            {getCategoryIcon(skill.category)}
          </span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.08em',
            color: '#06B6D4',
          }}>
            {baseCategory.replace(/-/g, ' ')}
            {subCategory && (
              <span style={{ color: '#86868B' }}>
                {' / '}{subCategory.replace(/-/g, ' ')}
              </span>
            )}
          </span>
        </div>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          textTransform: 'uppercase' as const,
          letterSpacing: '0.08em',
          padding: '4px 10px',
          borderRadius: 6,
          border: skill.status === 'active'
            ? '1px solid rgba(6,182,212,0.2)'
            : '1px solid #2a2a2a',
          background: skill.status === 'active'
            ? 'rgba(6,182,212,0.08)'
            : '#111111',
          color: skill.status === 'active' ? '#06B6D4' : '#86868B',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
        }}>
          {skill.status === 'active' && (
            <span style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#06B6D4',
              display: 'inline-block',
            }} />
          )}
          {skill.status.toUpperCase()}
        </span>
      </div>

      {/* Skill name */}
      <h3 style={{
        fontSize: 18,
        fontWeight: 600,
        color: '#FFFFFF',
        marginBottom: 12,
        lineHeight: 1.4,
        letterSpacing: '-0.01em',
      }}>
        {skill.name}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: 14,
        color: '#E5E7EB',
        marginBottom: 20,
        lineHeight: 1.7,
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical' as const,
        overflow: 'hidden',
      }}>
        {skill.description || (
          <span style={{ fontStyle: 'italic', color: '#86868B' }}>No description available</span>
        )}
      </p>

      {/* Used By */}
      {skill.usedBy.length > 0 && (
        <div style={{
          paddingBottom: 16,
          marginBottom: 16,
          borderBottom: '1px solid #2a2a2a',
        }}>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.1em',
            color: '#86868B',
            marginBottom: 8,
          }}>
            USED BY
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 6 }}>
            {skill.usedBy.map((agent) => (
              <span key={agent} style={{
                background: '#111111',
                border: '1px solid #2a2a2a',
                padding: '5px 12px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.06em',
                color: '#86868B',
                borderRadius: 6,
              }}>
                {agent}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Features */}
      {(skill.hasScripts || skill.hasReferences || skill.hasTemplates) && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap' as const,
          gap: 12,
          paddingBottom: 16,
          marginBottom: 12,
          borderBottom: '1px solid #2a2a2a',
        }}>
          {skill.hasScripts && (
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: '#06B6D4',
              letterSpacing: '0.08em',
            }}>→ SCRIPTS</span>
          )}
          {skill.hasReferences && (
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: '#06B6D4',
              letterSpacing: '0.08em',
            }}>→ REFS</span>
          )}
          {skill.hasTemplates && (
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: '#06B6D4',
              letterSpacing: '0.08em',
            }}>→ TEMPLATES</span>
          )}
        </div>
      )}

      {/* View prompt */}
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.08em',
        color: hovered ? '#06B6D4' : '#86868B',
        marginTop: 8,
        transition: 'color 0.2s ease',
      }}>
        VIEW DETAILS →
      </div>
    </div>
  );
}
