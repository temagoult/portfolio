<script setup lang="ts">
import { computed } from 'vue'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import type { Skill, SkillCategory } from '../types/skill'

interface Props {
  skills: Skill[]
}

const props = defineProps<Props>()
const { isVisible, elementRef } = useScrollAnimation({ threshold: 0.16 })

const categoryOrder: SkillCategory[] = ['frontend', 'uiux', 'tools', 'backend', 'database']

const categoryLabels: Record<SkillCategory, { title: string; subtitle: string; icon: string }> = {
  frontend: {
    title: 'Frontend Core',
    subtitle: 'Technologies used to build modern, maintainable interfaces.',
    icon: 'mdi-monitor-dashboard'
  },
  uiux: {
    title: 'UI and Experience',
    subtitle: 'Design-minded frontend practices for clear, responsive products.',
    icon: 'mdi-palette-outline'
  },
  tools: {
    title: 'Workflow and Integration',
    subtitle: 'Build tools, version control and API integration practices.',
    icon: 'mdi-tools'
  },
  backend: {
    title: 'Backend Context',
    subtitle: 'Useful backend knowledge for better collaboration and integration.',
    icon: 'mdi-server'
  },
  database: {
    title: 'Databases',
    subtitle: 'Relational database and SQL workflow experience.',
    icon: 'mdi-database'
  }
}

const skillGroups = computed(() => {
  return categoryOrder
    .map(category => ({
      category,
      ...categoryLabels[category],
      skills: props.skills.filter(skill => skill.category === category)
    }))
    .filter(group => group.skills.length > 0)
})
</script>

<template>
  <section id="skills" class="skills-section">
    <div class="container">
      <div class="section-title">
        <span class="section-kicker">Skills</span>
        <h2>Skills and technologies</h2>
        <p>Frontend technologies are placed first to reflect the position targeted by the portfolio.</p>
      </div>

      <div ref="elementRef" :class="['skills-layout', { 'is-visible': isVisible }]">
        <article
          v-for="(group, index) in skillGroups"
          :key="group.category"
          :class="['skill-group-card', { featured: index === 0 }]"
          :style="{ '--delay': `${index * 0.12}s` }"
        >
          <div class="group-header">
            <div class="group-icon">
              <v-icon :icon="group.icon" size="24" />
            </div>
            <div>
              <h3>{{ group.title }}</h3>
              <p>{{ group.subtitle }}</p>
            </div>
          </div>

          <div class="skill-list">
            <span v-for="skill in group.skills" :key="skill.id" class="skill-pill">
              <v-icon :icon="skill.icon" size="18" />
              {{ skill.name }}
            </span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-section {
  position: relative;
  padding: var(--section-padding) 0;
  overflow: hidden;
  background:
    radial-gradient(circle at 82% 20%, rgba(239, 68, 68, 0.11), transparent 26rem),
    linear-gradient(180deg, #0f0505 0%, #090909 100%);
}

.skills-section::before {
  content: '';
  position: absolute;
  right: -12rem;
  top: 9rem;
  width: 30rem;
  height: 30rem;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(239, 68, 68, 0.1), transparent 70%);
  pointer-events: none;
}

.section-title {
  position: relative;
  max-width: 740px;
  margin: 0 auto 3.6rem;
  text-align: center;
}

.section-kicker {
  display: inline-flex;
  margin-bottom: 0.85rem;
  padding: 0.42rem 0.75rem;
  border-radius: 999px;
  color: #fca5a5;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.22);
  font-weight: 800;
  font-size: 0.82rem;
}

.section-title h2 {
  color: white;
  font-size: clamp(2rem, 4vw, 3.2rem);
  line-height: 1.08;
  letter-spacing: -0.055em;
  font-weight: 900;
}

.section-title p {
  margin-top: 1rem;
  color: #a1a1aa;
  font-size: 1.05rem;
  line-height: 1.7;
}

.skills-layout {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.2rem;
}

.skill-group-card {
  padding: 1.35rem;
  border-radius: 1.45rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.065), rgba(255, 255, 255, 0.028));
  box-shadow: 0 22px 56px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transform: translateY(28px);
  transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
}

.skill-group-card.featured {
  grid-column: span 2;
  border-color: rgba(239, 68, 68, 0.28);
  background:
    radial-gradient(circle at top right, rgba(239, 68, 68, 0.16), transparent 20rem),
    linear-gradient(145deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.03));
}

.skills-layout.is-visible .skill-group-card {
  animation: slideUpFade 0.55s ease-out forwards;
  animation-delay: var(--delay);
}

.skill-group-card:hover {
  transform: translateY(-6px);
  border-color: rgba(239, 68, 68, 0.32);
  background: rgba(239, 68, 68, 0.08);
}

.group-header {
  display: flex;
  align-items: flex-start;
  gap: 0.95rem;
  margin-bottom: 1.15rem;
}

.group-icon {
  flex: 0 0 auto;
  width: 48px;
  height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  color: #ef4444;
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.group-header h3 {
  color: white;
  font-size: 1.22rem;
  font-weight: 900;
  letter-spacing: -0.025em;
  margin-bottom: 0.25rem;
}

.group-header p {
  color: #a1a1aa;
  line-height: 1.55;
  font-size: 0.95rem;
}

.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.skill-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.56rem 0.75rem;
  border-radius: 999px;
  color: #f4f4f5;
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-weight: 800;
  font-size: 0.88rem;
  transition: transform 0.22s ease, border-color 0.22s ease, background 0.22s ease;
}

.skill-pill .v-icon {
  color: #ef4444;
}

.skill-pill:hover {
  transform: translateY(-2px);
  border-color: rgba(239, 68, 68, 0.3);
  background: rgba(239, 68, 68, 0.12);
}

@keyframes slideUpFade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 860px) {
  .skills-layout {
    grid-template-columns: 1fr;
  }

  .skill-group-card.featured {
    grid-column: span 1;
  }
}

@media (max-width: 640px) {
  .section-title {
    text-align: left;
    margin-bottom: 2.4rem;
  }

  .skill-group-card {
    padding: 1rem;
  }

  .group-header {
    flex-direction: column;
  }
}
</style>
