<script setup lang="ts">
import { ref } from 'vue'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import type { Experience, ExperienceType } from '../types/experience'

interface Props {
  experiences: Experience[]
}

const props = defineProps<Props>()
const { isVisible, elementRef } = useScrollAnimation({ threshold: 0.18 })
const expandedExperience = ref<string | null>(props.experiences[0]?.id ?? null)

const typeLabels: Record<ExperienceType, string> = {
  'full-time': 'Full-time',
  remote: 'Remote',
  contract: 'Contract',
  internship: 'Internship'
}

const typeClasses: Record<ExperienceType, string> = {
  'full-time': 'type-green',
  remote: 'type-purple',
  contract: 'type-blue',
  internship: 'type-yellow'
}

const toggleExperience = (id: string) => {
  expandedExperience.value = expandedExperience.value === id ? null : id
}

const getTypeLabel = (type: ExperienceType) => typeLabels[type]
const getTypeClass = (type: ExperienceType) => typeClasses[type]
</script>

<template>
  <section id="experience" class="experience-section">
    <div class="container">
      <div class="section-title">
        <span class="section-kicker">Experience</span>
        <h2>Professional experience</h2>
        <p>Frontend-first delivery, business application development and practical support for production workflows.</p>
      </div>

      <div ref="elementRef" :class="['timeline', { 'is-visible': isVisible }]">
        <article
          v-for="(experience, index) in experiences"
          :key="experience.id"
          class="timeline-item"
          :style="{ '--delay': `${index * 0.12}s` }"
        >
          <div class="timeline-marker" aria-hidden="true">
            <span class="marker-dot"></span>
            <span class="marker-line"></span>
          </div>

          <div class="experience-card">
            <div class="card-header">
              <div class="card-main">
                <div class="title-row">
                  <h3>{{ experience.position }}</h3>
                  <span v-if="experience.current" class="current-badge">Current</span>
                </div>

                <div class="company-info">
                  <v-icon icon="mdi-domain" size="18" />
                  <a
                    v-if="experience.companyUrl"
                    :href="experience.companyUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="company-name linked"
                  >
                    {{ experience.company }}
                  </a>
                  <span v-else class="company-name">{{ experience.company }}</span>
                  <span class="separator">/</span>
                  <span>{{ experience.location }}</span>
                </div>
              </div>

              <button
                type="button"
                @click="toggleExperience(experience.id)"
                class="expand-button"
                :class="{ expanded: expandedExperience === experience.id }"
                :aria-expanded="expandedExperience === experience.id"
                :aria-label="`Toggle ${experience.company} details`"
              >
                <v-icon :icon="expandedExperience === experience.id ? 'mdi-chevron-up' : 'mdi-chevron-down'" size="24" />
              </button>
            </div>

            <div class="card-meta">
              <span class="period">
                <v-icon icon="mdi-calendar-month-outline" size="16" />
                {{ experience.period }}
              </span>
              <span :class="['type-badge', getTypeClass(experience.type)]">
                {{ getTypeLabel(experience.type) }}
              </span>
            </div>

            <p class="description">{{ experience.description }}</p>

            <transition name="expand">
              <div v-if="expandedExperience === experience.id" class="expanded-content">
                <div class="responsibilities">
                  <h4>Key responsibilities</h4>
                  <ul>
                    <li v-for="responsibility in experience.responsibilities" :key="responsibility">
                      <v-icon icon="mdi-check-circle" size="18" />
                      <span>{{ responsibility }}</span>
                    </li>
                  </ul>
                </div>

                <div class="technologies">
                  <h4>Technologies and focus</h4>
                  <div class="tech-tags">
                    <span v-for="tech in experience.technologies" :key="tech">
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.experience-section {
  position: relative;
  padding: var(--section-padding) 0;
  background:
    radial-gradient(circle at 10% 18%, rgba(239, 68, 68, 0.11), transparent 24rem),
    linear-gradient(180deg, #090909 0%, #0f0505 100%);
}


.section-title {
  max-width: 740px;
  margin: 0 auto 4rem;
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

.timeline {
  position: relative;
}

.timeline-item {
  position: relative;
  padding-bottom: 2.1rem;
  opacity: 0;
  transform: translateY(28px);
}

.timeline.is-visible .timeline-item {
  animation: slideIn 0.55s ease-out forwards;
  animation-delay: var(--delay);
}

.timeline-marker {
  position: absolute;
  top: 0.4rem;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100% + 0.5rem);
}

.marker-dot {
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: #ef4444;
  border: 4px solid #130606;
  box-shadow: 0 0 0 7px rgba(239, 68, 68, 0.12);
  z-index: 2;
}

.marker-line {
  width: 2px;
  flex: 1;
  margin-top: -1px;
  background: linear-gradient(180deg, rgba(239, 68, 68, 0.75), rgba(239, 68, 68, 0.04));
}

.timeline-item:last-child .marker-line {
  display: none;
}

.experience-card {
  margin-left: 3.1rem;
  padding: 1.35rem;
  border-radius: 1.45rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.065), rgba(255, 255, 255, 0.028));
  box-shadow: 0 22px 56px rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(14px);
  transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
}

.experience-card:hover {
  transform: translateX(6px);
  border-color: rgba(239, 68, 68, 0.34);
  background: linear-gradient(145deg, rgba(239, 68, 68, 0.09), rgba(255, 255, 255, 0.035));
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.card-main {
  min-width: 0;
}

.title-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.55rem;
}

.title-row h3 {
  color: white;
  font-size: clamp(1.25rem, 2.4vw, 1.6rem);
  font-weight: 900;
  letter-spacing: -0.035em;
}

.current-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.28rem 0.68rem;
  border-radius: 999px;
  color: #86efac;
  background: rgba(34, 197, 94, 0.08);
  border: 1px solid rgba(34, 197, 94, 0.28);
  font-size: 0.76rem;
  font-weight: 850;
}

.company-info {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.45rem;
  color: #a1a1aa;
  font-weight: 650;
}

.company-info .v-icon {
  color: #ef4444;
}

.company-name {
  color: #f4f4f5;
  font-weight: 850;
}

.company-name.linked {
  text-decoration: none;
  transition: color 0.22s ease;
}

.company-name.linked:hover {
  color: #fca5a5;
}

.separator {
  color: #52525b;
}

.expand-button {
  flex: 0 0 auto;
  width: 42px;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.9rem;
  border: 1px solid rgba(239, 68, 68, 0.24);
  background: rgba(239, 68, 68, 0.08);
  color: #ef4444;
  cursor: pointer;
  transition: transform 0.22s ease, background 0.22s ease;
}

.expand-button:hover,
.expand-button.expanded {
  transform: translateY(-2px);
  background: rgba(239, 68, 68, 0.16);
}

.card-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.7rem;
  margin: 1rem 0;
}

.period,
.type-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.43rem 0.7rem;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 800;
}

.period {
  color: #d4d4d8;
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.type-badge {
  border: 1px solid;
}

.type-green {
  color: #86efac;
  background: rgba(34, 197, 94, 0.08);
  border-color: rgba(34, 197, 94, 0.26);
}

.type-purple {
  color: #c4b5fd;
  background: rgba(168, 85, 247, 0.08);
  border-color: rgba(168, 85, 247, 0.26);
}

.type-blue {
  color: #93c5fd;
  background: rgba(59, 130, 246, 0.08);
  border-color: rgba(59, 130, 246, 0.26);
}

.type-yellow {
  color: #fde68a;
  background: rgba(245, 158, 11, 0.08);
  border-color: rgba(245, 158, 11, 0.26);
}

.description {
  color: #d4d4d8;
  line-height: 1.7;
}

.expanded-content {
  margin-top: 1.35rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.responsibilities h4,
.technologies h4 {
  color: #fca5a5;
  font-size: 0.95rem;
  font-weight: 900;
  letter-spacing: 0.01em;
  margin-bottom: 0.85rem;
}

.responsibilities ul {
  list-style: none;
  display: grid;
  gap: 0.65rem;
}

.responsibilities li {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.65rem;
  color: #d4d4d8;
  line-height: 1.55;
}

.responsibilities li .v-icon {
  color: #ef4444;
  margin-top: 0.12rem;
}

.technologies {
  margin-top: 1.3rem;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.tech-tags span {
  padding: 0.48rem 0.74rem;
  border-radius: 999px;
  color: #f4f4f5;
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.82rem;
  font-weight: 800;
}

.expand-enter-active,
.expand-leave-active {
  transition: max-height 0.28s ease, opacity 0.24s ease;
  max-height: 850px;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 700px) {
  .section-title {
    text-align: left;
    margin-bottom: 2.4rem;
  }

  .experience-card {
    margin-left: 2rem;
    padding: 1rem;
  }

  .timeline-marker {
    top: 0.5rem;
  }

  .card-header {
    gap: 0.75rem;
  }

  .expand-button {
    width: 38px;
    height: 38px;
  }

  .experience-card:hover {
    transform: none;
  }
}
</style>
