<script setup lang="ts">
import { ref } from 'vue'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import type { Experience } from '../types/experience'

interface Props {
  experiences: Experience[]
}

const props = defineProps<Props>()
const { isVisible, elementRef } = useScrollAnimation({ threshold: 0.2 })
const expandedExperience = ref<string | null>(null)

const toggleExperience = (id: string) => {
  expandedExperience.value = expandedExperience.value === id ? null : id
}

const getTypeColor = (type: string) => {
  const colors = {
    'full-time': 'bg-green-500/20 text-green-400 border-green-500/30',
    'freelance': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'contract': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'internship': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
  }
  return colors[type as keyof typeof colors] || colors['full-time']
}
</script>

<template>
  <section id="experience" class="experience-section">
    <div class="container">
      <!-- Section Title -->
      <div class="section-title">
        <h2>Professional Experience</h2>
        <div class="title-underline"></div>
        <p class="subtitle">My journey as a developer</p>
      </div>


      <div 
        ref="elementRef" 
        :class="['timeline', { 'is-visible': isVisible }]"
      >
        <div
          v-for="(experience, index) in experiences"
          :key="experience.id"
          class="timeline-item"
          :style="{ '--delay': `${index * 0.2}s` }"
        >
          <!-- Timeline Marker -->
          <div class="timeline-marker">
            <div class="marker-dot"></div>
            <div class="marker-line"></div>
          </div>

          <!-- Experience Card -->
          <div class="experience-card">
            <!-- Header -->
            <div class="card-header">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="card-title">{{ experience.position }}</h3>
                  <span 
                    v-if="experience.current" 
                    class="current-badge"
                  >
                    Current
                  </span>
                </div>
                <div class="company-info">
                  <v-icon icon="mdi-domain" size="18" class="text-red-500" />
                  <span class="company-name">{{ experience.company }}</span>
                  <span class="separator">•</span>
                  <span class="location">{{ experience.location }}</span>
                </div>
              </div>
              
              <button 
                @click="toggleExperience(experience.id)"
                class="expand-button"
                :class="{ 'expanded': expandedExperience === experience.id }"
              >
                <v-icon 
                  :icon="expandedExperience === experience.id ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                  size="24"
                />
              </button>
            </div>

            <!-- Period & Type -->
            <div class="card-meta">
              <div class="period">
                <v-icon icon="mdi-calendar" size="16" />
                {{ experience.period }}
              </div>
              <span :class="['type-badge', getTypeColor(experience.type)]">
                {{ experience.type }}
              </span>
            </div>

            <!-- Description -->
            <p class="description">{{ experience.description }}</p>

            <!-- Expanded Content -->
            <transition name="expand">
              <div v-if="expandedExperience === experience.id" class="expanded-content">
                <!-- Responsibilities -->
                <div class="responsibilities">
                  <h4 class="section-subtitle">Key Responsibilities</h4>
                  <ul class="responsibility-list">
                    <li 
                      v-for="(responsibility, idx) in experience.responsibilities" 
                      :key="idx"
                    >
                      <v-icon icon="mdi-check-circle" size="18" class="text-red-500" />
                      <span>{{ responsibility }}</span>
                    </li>
                  </ul>
                </div>

                <!-- Technologies -->
                <div class="technologies">
                  <h4 class="section-subtitle">Technologies Used</h4>
                  <div class="tech-tags">
                    <span 
                      v-for="tech in experience.technologies" 
                      :key="tech"
                      class="tech-tag"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.experience-section {
  background: linear-gradient(180deg, #1a0000 0%, #0a0a0a 100%);
  padding: 6rem 0;
  position: relative;
}

.container {
  max-width: 1000px;
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

/* Timeline */
.timeline {
  position: relative;
}

.timeline-item {
  position: relative;
  padding-bottom: 3rem;
  opacity: 0;
  transform: translateX(-30px);
}

.timeline.is-visible .timeline-item {
  animation: slideInLeft 0.6s ease-out forwards;
  animation-delay: var(--delay);
}

.timeline-marker {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.marker-dot {
  width: 16px;
  height: 16px;
  background: #ef4444;
  border: 3px solid #1a0000;
  border-radius: 50%;
  z-index: 2;
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.2);
}

.marker-line {
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, #ef4444, transparent);
  margin-top: -8px;
}

.timeline-item:last-child .marker-line {
  display: none;
}

/* Experience Card */
.experience-card {
  margin-left: 3rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.experience-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(239, 68, 68, 0.4);
  transform: translateX(8px);
  box-shadow: 0 8px 30px rgba(239, 68, 68, 0.2);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.current-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  background: rgba(34, 197, 94, 0.2);
  border: 1px solid rgba(34, 197, 94, 0.4);
  border-radius: 1rem;
  color: #22c55e;
  font-size: 0.75rem;
  font-weight: 600;
  animation: pulse 2s ease-in-out infinite;
}

.company-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #9ca3af;
  font-size: 1rem;
}

.company-name {
  font-weight: 600;
  color: #e5e5e5;
}

.separator {
  color: #4b5563;
}

.location {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.expand-button {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 0.5rem;
  padding: 0.5rem;
  color: #ef4444;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.expand-button:hover {
  background: rgba(239, 68, 68, 0.2);
  transform: scale(1.1);
}

.expand-button.expanded {
  background: rgba(239, 68, 68, 0.2);
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.period {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #9ca3af;
  font-size: 0.875rem;
}

.type-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid;
}

.description {
  color: #d1d5db;
  line-height: 1.6;
  margin-bottom: 1rem;
}

/* Expanded Content */
.expanded-content {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(239, 68, 68, 0.2);
}

.section-subtitle {
  font-size: 1rem;
  font-weight: 600;
  color: #ef4444;
  margin-bottom: 0.75rem;
}

.responsibilities {
  margin-bottom: 1.5rem;
}

.responsibility-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.responsibility-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: #d1d5db;
  line-height: 1.5;
}

.responsibility-list li v-icon {
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.technologies {
  margin-top: 1.5rem;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  padding: 0.5rem 1rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 0.5rem;
  color: #ef4444;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tech-tag:hover {
  background: rgba(239, 68, 68, 0.2);
  transform: translateY(-2px);
}

/* Animations */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  max-height: 1000px;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

@keyframes slideInLeft {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

/* Responsive */
@media (max-width: 768px) {
  .experience-section {
    padding: 4rem 0;
  }

  .section-title h2 {
    font-size: 2rem;
  }

  .experience-card {
    margin-left: 2rem;
    padding: 1rem;
  }

  .card-header {
    flex-direction: column;
  }

  .card-title {
    font-size: 1.25rem;
  }

  .company-info {
    flex-wrap: wrap;
  }

  .responsibility-list li {
    font-size: 0.875rem;
  }
}
</style>