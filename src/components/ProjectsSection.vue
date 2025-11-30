<script setup lang="ts">
import { ref, computed } from 'vue'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import type { Project } from '../types/project'

interface Props {
  projects: Project[]
}

const props = defineProps<Props>()
const { isVisible, elementRef } = useScrollAnimation({ threshold: 0.2 })

const selectedCategory = ref<'all' | 'professional' | 'personal'>('all')

const categories = [
  { value: 'all', label: 'All Projects', icon: 'mdi-view-grid' },
  { value: 'professional', label: 'Professional', icon: 'mdi-briefcase' },
  { value: 'personal', label: 'Personal', icon: 'mdi-heart' }
]

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'all') {
    return props.projects
  }
  return props.projects.filter(p => p.category === selectedCategory.value)
})

const featuredProjects = computed(() => 
  filteredProjects.value.filter(p => p.featured)
)

const otherProjects = computed(() => 
  filteredProjects.value.filter(p => !p.featured)
)
</script>

<template>
  <section id="projects" class="projects-section">
    <div class="container">
      <!-- Section Title -->
      <div class="section-title">
        <h2>Featured Projects</h2>
        <div class="title-underline"></div>
        <p class="subtitle">Some of my recent work</p>
      </div>

      <!-- Category Filter -->
      <div class="category-filter">
        <button
          v-for="category in categories"
          :key="category.value"
          @click="selectedCategory = category.value as any"
          :class="['filter-btn', { active: selectedCategory === category.value }]"
        >
          <v-icon :icon="category.icon" size="20" />
          {{ category.label }}
        </button>
      </div>

      <!-- Featured Projects Grid -->
      <div 
        ref="elementRef"
        :class="['projects-grid featured', { 'is-visible': isVisible }]"
      >
        <div
          v-for="(project, index) in featuredProjects"
          :key="project.id"
          class="project-card featured-card"
          :style="{ '--delay': `${index * 0.15}s` }"
        >
          <!-- Image -->
          <div class="project-image">
            <v-img
              :src="project.image"
              :alt="project.title"
              cover
              class="image"
            >
              <template v-slot:placeholder>
                <div class="image-placeholder">
                  <v-icon icon="mdi-image" size="48" />
                </div>
              </template>
            </v-img>
            <div class="image-overlay">
              <div class="overlay-content">
                <a
                  v-if="project.url && project.url !== '#'"
                  :href="project.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="overlay-btn"
                >
                  <v-icon icon="mdi-open-in-new" />
                  View Project
                </a>
                <span v-else class="overlay-text">
                  <v-icon icon="mdi-lock" />
                  Confidential
                </span>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="project-content">
            <div class="project-header">
              <h3 class="project-title">{{ project.title }}</h3>
              <v-icon 
                v-if="project.featured" 
                icon="mdi-star" 
                class="featured-icon"
              />
            </div>
            
            <p class="project-description">{{ project.description }}</p>

            <!-- Technologies -->
            <div class="tech-stack">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="tech-badge"
              >
                {{ tech }}
              </span>
            </div>

            <!-- Actions -->
            <div class="project-actions">
              <a
                v-if="project.url && project.url !== '#'"
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                class="action-btn primary"
              >
                <v-icon icon="mdi-eye" size="18" />
                View Live
              </a>
              <button v-else class="action-btn secondary" disabled>
                <v-icon icon="mdi-lock" size="18" />
                Private
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Other Projects -->
      <div v-if="otherProjects.length > 0" class="other-projects">
        <h3 class="other-title">More Projects</h3>
        <div class="projects-grid other">
          <div
            v-for="(project, index) in otherProjects"
            :key="project.id"
            class="project-card small-card"
            :style="{ '--delay': `${(featuredProjects.length + index) * 0.15}s` }"
          >
            <div class="small-card-content">
              <div class="small-header">
                <v-icon icon="mdi-folder" size="32" class="folder-icon" />
                <a
                  v-if="project.url && project.url !== '#'"
                  :href="project.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="external-link"
                >
                  <v-icon icon="mdi-open-in-new" size="20" />
                </a>
              </div>

              <h4 class="small-title">{{ project.title }}</h4>
              <p class="small-description">{{ project.description }}</p>

              <div class="small-tech">
                <span v-for="tech in project.technologies.slice(0, 3)" :key="tech">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- View More -->
      <div class="view-more">
        <a
          href="https://github.com/temagoult"
          target="_blank"
          rel="noopener noreferrer"
          class="view-more-btn"
        >
          <v-icon icon="mdi-github" size="24" />
          View More on GitHub
          <v-icon icon="mdi-arrow-right" size="20" />
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-section {
  background: #0a0a0a;
  padding: 6rem 0;
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section-title {
  text-align: center;
  margin-bottom: 3rem;
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

/* Category Filter */
.category-filter {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 2px solid rgba(239, 68, 68, 0.2);
  border-radius: 2rem;
  color: #9ca3af;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.4);
}

.filter-btn.active {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
  border-color: #ef4444;
}

/* Projects Grid */
.projects-grid {
  display: grid;
  gap: 2rem;
  margin-bottom: 4rem;
}

.projects-grid.featured {
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
}

.projects-grid.other {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

/* Project Card */
.project-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 1rem;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: translateY(30px);
}

.projects-grid.is-visible .project-card {
  animation: slideUpFade 0.6s ease-out forwards;
  animation-delay: var(--delay);
}

.project-card:hover {
  transform: translateY(-12px);
  border-color: rgba(239, 68, 68, 0.5);
  box-shadow: 0 20px 40px rgba(239, 68, 68, 0.3);
}

/* Project Image */
.project-image {
  position: relative;
  height: 240px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.5);
}

.image {
  transition: transform 0.4s ease;
}

.project-card:hover .image {
  transform: scale(1.1);
}

.image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #4b5563;
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .image-overlay {
  opacity: 1;
}

.overlay-content {
  text-align: center;
}

.overlay-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #ef4444;
  color: white;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.overlay-btn:hover {
  background: #dc2626;
  transform: scale(1.05);
}

.overlay-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #9ca3af;
  font-weight: 600;
}

/* Project Content */
.project-content {
  padding: 1.5rem;
}

.project-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.project-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.featured-icon {
  color: #fbbf24;
}

.project-description {
  color: #d1d5db;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-badge {
  padding: 0.375rem 0.75rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 0.375rem;
  color: #ef4444;
  font-size: 0.75rem;
  font-weight: 600;
}

.project-actions {
  display: flex;
  gap: 0.75rem;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
}

.action-btn.primary {
  background: #ef4444;
  color: white;
}

.action-btn.primary:hover {
  background: #dc2626;
  transform: translateY(-2px);
}

.action-btn.secondary {
  background: rgba(255, 255, 255, 0.05);
  color: #9ca3af;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: not-allowed;
}

/* Small Cards */
.other-projects {
  margin-top: 4rem;
}

.other-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  margin-bottom: 2rem;
  text-align: center;
}

.small-card {
  height: 100%;
}

.small-card-content {
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.small-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.folder-icon {
  color: #ef4444;
}

.external-link {
  color: #9ca3af;
  transition: all 0.3s ease;
}

.external-link:hover {
  color: #ef4444;
  transform: translateY(-2px);
}

.small-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.75rem;
}

.small-description {
  color: #9ca3af;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.small-tech {
  display: flex;
  gap: 1rem;
  color: #6b7280;
  font-size: 0.875rem;
}

/* View More */
.view-more {
  text-align: center;
  margin-top: 4rem;
}

.view-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: transparent;
  border: 2px solid #ef4444;
  color: #ef4444;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.view-more-btn:hover {
  background: #ef4444;
  color: white;
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(239, 68, 68, 0.4);
}

@keyframes slideUpFade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .projects-section {
    padding: 4rem 0;
  }

  .section-title h2 {
    font-size: 2rem;
  }

  .projects-grid.featured {
    grid-template-columns: 1fr;
  }

  .projects-grid.other {
    grid-template-columns: 1fr;
  }

  .category-filter {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-btn {
    justify-content: center;
  }
}
</style>