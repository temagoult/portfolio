<script setup lang="ts">
import { ref, computed } from 'vue'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import type { Project, ProjectCategory } from '../types/project'

interface Props {
  projects: Project[]
}

type CategoryFilter = 'all' | ProjectCategory

const props = defineProps<Props>()
const { isVisible, elementRef } = useScrollAnimation({ threshold: 0.16 })
const selectedCategory = ref<CategoryFilter>('all')

const categories: { value: CategoryFilter; label: string; icon: string }[] = [
  { value: 'all', label: 'All Projects', icon: 'mdi-view-grid-outline' },
  { value: 'professional', label: 'Professional', icon: 'mdi-briefcase-outline' },
  { value: 'personal', label: 'Personal', icon: 'mdi-heart-outline' }
]

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'all') {
    return props.projects
  }

  return props.projects.filter(project => project.category === selectedCategory.value)
})

const featuredProjects = computed(() => filteredProjects.value.filter(project => project.featured))
const otherProjects = computed(() => filteredProjects.value.filter(project => !project.featured))

const selectCategory = (category: CategoryFilter) => {
  selectedCategory.value = category
}
</script>

<template>
  <section id="projects" class="projects-section">
    <div class="container">
      <div class="section-title">
        <span class="section-kicker">Projects</span>
        <h2>Featured projects</h2>
        <p>Selected work focused on frontend delivery, interface quality and practical business use cases.</p>
      </div>

      <div class="category-filter" aria-label="Project category filter">
        <button
          v-for="category in categories"
          :key="category.value"
          type="button"
          @click="selectCategory(category.value)"
          :class="['filter-btn', { active: selectedCategory === category.value }]"
        >
          <v-icon :icon="category.icon" size="20" />
          {{ category.label }}
        </button>
      </div>

      <div ref="elementRef" :class="['projects-grid featured', { 'is-visible': isVisible }]">
        <article
          v-for="(project, index) in featuredProjects"
          :key="project.id"
          class="project-card featured-card"
          :style="{ '--delay': `${index * 0.12}s` }"
        >
          <div class="project-image">
            <v-img :src="project.image" :alt="project.title" cover class="image">
              <template #placeholder>
                <div class="image-placeholder">
                  <v-icon icon="mdi-image-outline" size="44" />
                </div>
              </template>
            </v-img>
            <div class="image-overlay">
              <a
                v-if="project.url && project.url !== '#'"
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                class="overlay-btn"
              >
                <v-icon icon="mdi-open-in-new" size="20" />
                View project
              </a>
              <span v-else class="overlay-text">
                <v-icon icon="mdi-lock-outline" size="20" />
                Private project
              </span>
            </div>
          </div>

          <div class="project-content">
            <div class="project-meta-row">
              <span class="project-category">{{ project.category }}</span>
              <v-icon v-if="project.featured" icon="mdi-star" class="featured-icon" size="19" />
            </div>

            <h3 class="project-title">{{ project.title }}</h3>
            <p v-if="project.role" class="project-role">{{ project.role }}</p>
            <p class="project-description">{{ project.description }}</p>

            <div class="tech-stack">
              <span v-for="tech in project.technologies" :key="tech" class="tech-badge">
                {{ tech }}
              </span>
            </div>

            <div class="project-actions">
              <a
                v-if="project.url && project.url !== '#'"
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                class="action-btn primary"
              >
                <v-icon icon="mdi-eye-outline" size="18" />
                View live
              </a>
              <button v-else type="button" class="action-btn secondary" disabled>
                <v-icon icon="mdi-lock-outline" size="18" />
                Private
              </button>
            </div>
          </div>
        </article>
      </div>

      <div v-if="otherProjects.length > 0" class="other-projects">
        <h3>More projects</h3>
        <div class="projects-grid other">
          <article
            v-for="(project, index) in otherProjects"
            :key="project.id"
            class="project-card small-card"
            :style="{ '--delay': `${(featuredProjects.length + index) * 0.12}s` }"
          >
            <div class="small-card-content">
              <div class="small-header">
                <v-icon icon="mdi-folder-outline" size="32" class="folder-icon" />
                <a
                  v-if="project.url && project.url !== '#'"
                  :href="project.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="external-link"
                  :aria-label="`Open ${project.title}`"
                >
                  <v-icon icon="mdi-open-in-new" size="20" />
                </a>
              </div>

              <h4>{{ project.title }}</h4>
              <p v-if="project.role" class="small-role">{{ project.role }}</p>
              <p class="small-description">{{ project.description }}</p>

              <div class="small-tech">
                <span v-for="tech in project.technologies.slice(0, 4)" :key="tech">
                  {{ tech }}
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div class="view-more">
        <a href="https://github.com/temagoult" target="_blank" rel="noopener noreferrer" class="view-more-btn">
          <v-icon icon="mdi-github" size="24" />
          View more on GitHub
          <v-icon icon="mdi-arrow-right" size="19" />
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-section {
  position: relative;
  padding: var(--section-padding) 0;
  background:
    radial-gradient(circle at 14% 20%, rgba(239, 68, 68, 0.1), transparent 24rem),
    #0a0a0a;
}

.section-title {
  max-width: 760px;
  margin: 0 auto 2.8rem;
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

.category-filter {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  margin-bottom: 2.6rem;
  flex-wrap: wrap;
}

.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.72rem 1.05rem;
  border-radius: 999px;
  color: #d4d4d8;
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(255, 255, 255, 0.09);
  font-weight: 850;
  cursor: pointer;
  transition: transform 0.22s ease, border-color 0.22s ease, background 0.22s ease, color 0.22s ease;
}

.filter-btn:hover,
.filter-btn.active {
  color: white;
  border-color: rgba(239, 68, 68, 0.34);
  background: rgba(239, 68, 68, 0.14);
}

.filter-btn:hover {
  transform: translateY(-2px);
}

.projects-grid {
  display: grid;
  gap: 1.4rem;
}

.projects-grid.featured {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.projects-grid.other {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.project-card {
  position: relative;
  overflow: hidden;
  border-radius: 1.55rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.065), rgba(255, 255, 255, 0.028));
  box-shadow: 0 22px 56px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transform: translateY(28px);
  transition: transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease;
}

.projects-grid.is-visible .project-card {
  animation: slideUpFade 0.55s ease-out forwards;
  animation-delay: var(--delay);
}

.project-card:hover {
  transform: translateY(-8px);
  border-color: rgba(239, 68, 68, 0.34);
  box-shadow: 0 30px 76px rgba(0, 0, 0, 0.34);
}

.project-image {
  position: relative;
  height: 250px;
  overflow: hidden;
  background: #111;
}

.image {
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease, filter 0.5s ease;
}

.project-card:hover .image {
  transform: scale(1.055);
  filter: saturate(1.06);
}

.image-placeholder {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #71717a;
}

.image-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  background: rgba(0, 0, 0, 0.64);
  transition: opacity 0.28s ease;
}

.project-card:hover .image-overlay {
  opacity: 1;
}

.overlay-btn,
.overlay-text {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.8rem 1rem;
  border-radius: 0.95rem;
  font-weight: 850;
}

.overlay-btn {
  color: white;
  background: linear-gradient(135deg, #ef4444, #b91c1c);
  text-decoration: none;
}

.overlay-text {
  color: #d4d4d8;
  background: rgba(255, 255, 255, 0.07);
}

.project-content {
  padding: 1.35rem;
}

.project-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.project-category {
  display: inline-flex;
  padding: 0.35rem 0.62rem;
  border-radius: 999px;
  color: #fca5a5;
  background: rgba(239, 68, 68, 0.09);
  border: 1px solid rgba(239, 68, 68, 0.22);
  font-size: 0.76rem;
  font-weight: 850;
  text-transform: capitalize;
}

.featured-icon {
  color: #fbbf24;
}

.project-title {
  color: white;
  font-size: 1.35rem;
  font-weight: 900;
  line-height: 1.2;
  letter-spacing: -0.03em;
}

.project-role {
  margin-top: 0.3rem;
  color: #fca5a5;
  font-weight: 800;
  font-size: 0.92rem;
}

.project-description {
  margin-top: 0.75rem;
  color: #d4d4d8;
  line-height: 1.65;
}

.tech-stack,
.small-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.52rem;
}

.tech-stack {
  margin: 1.15rem 0 1.25rem;
}

.tech-badge,
.small-tech span {
  padding: 0.45rem 0.65rem;
  border-radius: 999px;
  color: #f4f4f5;
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.78rem;
  font-weight: 800;
}

.project-actions {
  display: flex;
  gap: 0.75rem;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 2.65rem;
  padding: 0 0.9rem;
  border-radius: 0.85rem;
  border: 0;
  font-weight: 850;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.22s ease, background 0.22s ease;
}

.action-btn.primary {
  color: white;
  background: linear-gradient(135deg, #ef4444, #b91c1c);
}

.action-btn.primary:hover {
  transform: translateY(-2px);
}

.action-btn.secondary {
  color: #a1a1aa;
  background: rgba(255, 255, 255, 0.055);
  cursor: not-allowed;
}

.other-projects {
  margin-top: 3rem;
}

.other-projects h3 {
  margin-bottom: 1.3rem;
  color: white;
  font-size: 1.55rem;
  font-weight: 900;
  letter-spacing: -0.03em;
  text-align: center;
}

.small-card-content {
  height: 100%;
  padding: 1.35rem;
  display: flex;
  flex-direction: column;
}

.small-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.15rem;
}

.folder-icon,
.external-link {
  color: #ef4444;
}

.external-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 0.85rem;
  background: rgba(239, 68, 68, 0.08);
  text-decoration: none;
  transition: transform 0.22s ease, background 0.22s ease;
}

.external-link:hover {
  transform: translateY(-2px);
  background: rgba(239, 68, 68, 0.16);
}

.small-card h4 {
  color: white;
  font-size: 1.18rem;
  font-weight: 900;
  letter-spacing: -0.025em;
}

.small-role {
  margin-top: 0.2rem;
  color: #fca5a5;
  font-weight: 800;
  font-size: 0.88rem;
}

.small-description {
  color: #a1a1aa;
  line-height: 1.6;
  margin: 0.7rem 0 1.1rem;
  flex-grow: 1;
}

.view-more {
  text-align: center;
  margin-top: 3rem;
}

.view-more-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  min-height: 3.05rem;
  padding: 0 1.12rem;
  border-radius: 1rem;
  color: white;
  border: 1px solid rgba(239, 68, 68, 0.34);
  background: rgba(239, 68, 68, 0.08);
  text-decoration: none;
  font-weight: 850;
  transition: transform 0.22s ease, background 0.22s ease;
}

.view-more-btn:hover {
  transform: translateY(-3px);
  background: rgba(239, 68, 68, 0.16);
}

@keyframes slideUpFade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 900px) {
  .projects-grid.featured,
  .projects-grid.other {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .section-title {
    text-align: left;
    margin-bottom: 2.2rem;
  }

  .category-filter {
    display: grid;
    grid-template-columns: 1fr;
  }

  .filter-btn {
    justify-content: center;
  }

  .project-image {
    height: 220px;
  }
}
</style>
