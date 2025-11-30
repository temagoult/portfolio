<script setup lang="ts">
import { computed } from 'vue'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import type { Skill } from '../types/skill'

interface Props {
  skills: Skill[]
}

const props = defineProps<Props>()
const { isVisible, elementRef } = useScrollAnimation({ threshold: 0.2 })

const groupedSkills = computed(() => {
  const groups: Record<string, Skill[]> = {
    frontend: [],
    backend: [],
    language: [],
    framework: []
  }
  
  props.skills.forEach(skill => {
    groups[skill.category]?.push(skill)
  })
  
  return groups
})
</script>

<template>
  <section id="skills" class="skills-section">
    <div class="container">
      <!-- Section Title -->
      <div class="section-title">
        <h2>Skills & Technologies</h2>
        <div class="title-underline"></div>
        <p class="subtitle">Technologies I work with</p>
      </div>

      <!-- Skills Grid -->
      <div
        ref="elementRef"
        :class="['skills-grid', { 'is-visible': isVisible }]"
      >
        <div
          v-for="(skill, index) in skills"
          :key="skill.id"
          class="skill-card"
          :style="{ '--delay': `${index * 0.1}s` }"
        >
          <div class="skill-icon">
            <v-icon :icon="skill.icon" size="48" />
          </div>
          <h3 class="skill-name">{{ skill.name }}</h3>
          
          <!-- Optional Proficiency Bar -->
          <div v-if="skill.proficiency" class="proficiency">
            <div class="proficiency-bar">
              <div 
                class="proficiency-fill"
                :style="{ width: `${skill.proficiency}%` }"
              ></div>
            </div>
            <span class="proficiency-text">{{ skill.proficiency }}%</span>
          </div>
        </div>
      </div>

      <!-- Category Badges (Optional) -->
      <div class="categories">
        <span
          v-for="category in Object.keys(groupedSkills)"
          :key="category"
          class="category-badge"
        >
          {{ category.charAt(0).toUpperCase() + category.slice(1) }}
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-section {
  background: linear-gradient(180deg, #0a0a0a 0%, #1a0000 100%);
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
}

.skills-section::before {
  content: '';
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(239, 68, 68, 0.08) 0%, transparent 70%);
  top: 50%;
  right: -200px;
  border-radius: 50%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section-title {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ef4444;
  margin-bottom: 1rem;
}

.title-underline {
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, transparent, #ef4444, transparent);
  margin: 0 auto 1rem;
  border-radius: 2px;
}

.subtitle {
  color: #9ca3af;
  font-size: 1.125rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.skill-card {
  background: rgba(255, 255, 255, 0.03);
  border: 2px solid rgba(239, 68, 68, 0.2);
  border-radius: 1rem;
  padding: 2rem 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(30px);
}

.skills-grid.is-visible .skill-card {
  animation: slideUpFade 0.6s ease-out forwards;
  animation-delay: var(--delay);
}

.skill-card:hover {
  background: rgba(239, 68, 68, 0.1);
  border-color: #ef4444;
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(239, 68, 68, 0.3);
}

.skill-icon {
  margin-bottom: 1rem;
  color: #ef4444;
  transition: transform 0.3s ease;
}

.skill-card:hover .skill-icon {
  transform: scale(1.1) rotate(5deg);
}

.skill-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.75rem;
}

.proficiency {
  margin-top: 1rem;
}

.proficiency-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.proficiency-fill {
  height: 100%;
  background: linear-gradient(90deg, #ef4444, #dc2626);
  border-radius: 3px;
  transition: width 1s ease-out 0.5s;
}

.proficiency-text {
  font-size: 0.875rem;
  color: #9ca3af;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;
}

.category-badge {
  padding: 0.5rem 1.5rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 2rem;
  color: #ef4444;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.category-badge:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: #ef4444;
  transform: translateY(-2px);
}

@keyframes slideUpFade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .skills-section {
    padding: 4rem 0;
  }

  .section-title h2 {
    font-size: 2rem;
  }

  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1rem;
  }

  .skill-card {
    padding: 1.5rem 1rem;
  }

  .skill-icon {
    font-size: 2rem;
  }

  .skill-name {
    font-size: 1rem;
  }
}
</style>