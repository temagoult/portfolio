<script setup lang="ts">
import aboutImg from '../assets/images/about.png'

import { useScrollAnimation } from '../composables/useScrollAnimation'
import type { Profile } from '../types/profile'

interface Props {
  profile: Profile
}

const props = defineProps<Props>()
const { isVisible, elementRef } = useScrollAnimation({ threshold: 0.3 })
</script>

<template>
  <section id="about" class="about-section">
    <div class="container">
      <div ref="elementRef" :class="['content-wrapper', { 'is-visible': isVisible }]">
        <!-- Section Title -->
        <div class="section-title">
          <h2>About Me</h2>
          <div class="title-underline"></div>
        </div>

        <!-- Content Grid -->
        <div class="grid md:grid-cols-2 gap-12 items-center mt-16">
          <!-- Image -->
          <div class="image-wrapper">
            <div class="image-border">
              <img
                :src="aboutImg"
                alt="About Me"
                class="rounded-lg"
                cover
              />
            </div>
          </div>

          <!-- Text Content -->
          <div class="text-content space-y-6">
            <div class="info-card">
              <v-icon icon="mdi-account" class="card-icon" />
              <div>
                <h3 class="text-2xl font-bold text-white mb-2">{{ profile.title }}</h3>
                <p class="text-gray-300 leading-relaxed">
                  {{ profile.bio }}
                </p>
              </div>
            </div>

            <div class="info-card">
              <v-icon icon="mdi-school" class="card-icon" />
              <div>
                <h4 class="text-lg font-semibold text-red-500 mb-1">Education</h4>
                <p class="text-gray-300">
                  {{ profile.education }}
                </p>
              </div>
            </div>

            <div class="info-card">
              <v-icon icon="mdi-map-marker" class="card-icon" />
              <div>
                <h4 class="text-lg font-semibold text-red-500 mb-1">Location</h4>
                <p class="text-gray-300">{{ profile.location }}</p>
              </div>
            </div>

            <!-- Highlights -->
            <div class="highlights">
              <div class="highlight-item">
                <v-icon icon="mdi-code-tags" class="text-red-500" />
                <span>Web Development Passionate</span>
              </div>
              <div class="highlight-item">
                <v-icon icon="mdi-puzzle" class="text-red-500" />
                <span>Problem Solver</span>
              </div>
              <div class="highlight-item">
                <v-icon icon="mdi-chart-line" class="text-red-500" />
                <span>Quick Learner</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  background: #0a0a0a;
  padding: 6rem 0;
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.content-wrapper {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.content-wrapper.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.section-title h2 {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: #ef4444;
  margin-bottom: 1rem;
}

.title-underline {
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, transparent, #ef4444, transparent);
  margin: 0 auto;
  border-radius: 2px;
}

.image-wrapper {
  position: relative;
}

.image-border {
  position: relative;
  border-radius: 1rem;
  padding: 0.5rem;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  box-shadow: 0 20px 60px rgba(239, 68, 68, 0.3);
  transition: transform 0.3s ease;
}

.image-border:hover {
  transform: scale(1.02);
}

.text-content {
  animation: slideInRight 0.8s ease-out;
}

.info-card {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 1rem;
  border: 1px solid rgba(239, 68, 68, 0.2);
  transition: all 0.3s ease;
}

.info-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(239, 68, 68, 0.4);
  transform: translateX(8px);
}

.card-icon {
  color: #ef4444;
  font-size: 2rem;
  flex-shrink: 0;
}

.highlights {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 2rem;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #e5e5e5;
  font-weight: 500;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  .about-section {
    padding: 4rem 0;
  }

  .section-title h2 {
    font-size: 2rem;
  }

  .grid {
    gap: 3rem;
  }

  .info-card {
    flex-direction: column;
    text-align: center;
  }

  .highlights {
    align-items: center;
  }
}
</style>