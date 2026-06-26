<script setup lang="ts">
import aboutImg from '../assets/images/about.png'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import type { Profile } from '../types/profile'

interface Props {
  profile: Profile
}

const props = defineProps<Props>()
const { isVisible, elementRef } = useScrollAnimation({ threshold: 0.22 })

const highlights = [
  {
    icon: 'mdi-vuejs',
    title: 'Frontend development',
    text: 'Vue.js and TypeScript interfaces with reusable components and responsive layouts.'
  },
  {
    icon: 'mdi-palette-outline',
    title: 'UI quality',
    text: 'Clean spacing, readable hierarchy and consistent user experience across screens.'
  },
  {
    icon: 'mdi-api',
    title: 'API integration',
    text: 'Practical experience integrating REST APIs and supporting business workflows.'
  }
]
</script>

<template>
  <section id="about" class="about-section">
    <div class="container">
      <div ref="elementRef" :class="['content-wrapper', { 'is-visible': isVisible }]">
        <div class="section-title">
          <span class="section-kicker">About</span>
          <h2>Frontend profile with solid product delivery habits</h2>
          <p>Professional, pragmatic and focused on building interfaces that are clear for users and maintainable for teams.</p>
        </div>

        <div class="about-grid">
          <div class="image-wrapper">
            <div class="image-border">
              <img :src="aboutImg" alt="Workspace illustration" class="about-image" />
              <div class="image-caption">
                <span>Frontend-first workflow</span>
                <strong>Vue.js · TypeScript · UI/UX</strong>
              </div>
            </div>
          </div>

          <div class="text-content">
            <div class="intro-card">
              <v-icon icon="mdi-account-tie" class="card-icon" />
              <div>
                <span class="intro-label">{{ profile.title }}</span>
                <h3>Clean interfaces for practical business needs</h3>
                <p>{{ profile.bio }}</p>
              </div>
            </div>

            <div class="detail-card education-card">
              <v-icon icon="mdi-school-outline" />
              <span>Education</span>
              <strong>{{ profile.education }}</strong>
            </div>

            <div class="detail-card location-card">
              <v-icon icon="mdi-map-marker-outline" />
              <span>Location</span>
              <strong>{{ profile.location }}</strong>
            </div>

            <div class="highlights-grid">
              <div v-for="item in highlights" :key="item.title" class="highlight-card">
                <div class="highlight-icon">
                  <v-icon :icon="item.icon" size="22" />
                </div>
                <div>
                  <h4>{{ item.title }}</h4>
                  <p>{{ item.text }}</p>
                </div>
              </div>
            </div>

            <div class="about-actions">
              <a :href="profile.cvUrl" download class="about-button primary">
                <v-icon icon="mdi-file-download-outline" size="20" />
                Download CV
              </a>
              <a href="#contact" class="about-button secondary">
                <v-icon icon="mdi-email-outline" size="20" />
                Contact me
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  position: relative;
  padding: var(--section-padding) 0;
  background:
    radial-gradient(circle at 85% 10%, rgba(239, 68, 68, 0.08), transparent 24rem),
    #0a0a0a;
}

.content-wrapper {
  opacity: 0;
  transform: translateY(36px);
  transition: opacity 0.75s ease, transform 0.75s ease;
}

.content-wrapper.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.section-title {
  max-width: 790px;
  margin: 0 auto 3.4rem;
  text-align: center;
}

.section-kicker {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.9rem;
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
  font-size: clamp(2rem, 4vw, 3.25rem);
  line-height: 1.05;
  letter-spacing: -0.055em;
  font-weight: 900;
}

.section-title p {
  margin-top: 1rem;
  color: #a1a1aa;
  font-size: 1.05rem;
  line-height: 1.7;
}

.about-grid {
  display: grid;
  grid-template-columns: minmax(280px, 0.82fr) minmax(0, 1.18fr);
  gap: clamp(2rem, 5vw, 4.25rem);
  align-items: start;
}

.image-wrapper {
  position: sticky;
  top: 6rem;
}

.image-border {
  position: relative;
  width: min(100%, 445px);
  margin: 0 auto;
  padding: 0.72rem;
  border-radius: 1.8rem;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.75), rgba(127, 29, 29, 0.22));
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.42);
  overflow: hidden;
}

.image-border::after {
  content: '';
  position: absolute;
  inset: 0.72rem;
  border-radius: 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  pointer-events: none;
}

.about-image {
  display: block;
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 1.25rem;
}

.image-caption {
  position: absolute;
  left: 1.25rem;
  right: 1.25rem;
  bottom: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 1rem;
  background: rgba(10, 10, 10, 0.72);
  backdrop-filter: blur(12px);
}

.image-caption span,
.image-caption strong {
  display: block;
}

.image-caption span {
  color: #a1a1aa;
  font-size: 0.78rem;
  font-weight: 750;
}

.image-caption strong {
  color: white;
  font-size: 0.9rem;
  font-weight: 850;
  white-space: nowrap;
}

.text-content {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  align-content: start;
}

.intro-card,
.detail-card,
.highlight-card {
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.065), rgba(255, 255, 255, 0.028));
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(12px);
}

.intro-card {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  padding: clamp(1.2rem, 2.5vw, 1.55rem);
  border-radius: 1.4rem;
}

.intro-label {
  display: inline-flex;
  margin-bottom: 0.45rem;
  color: #fca5a5;
  font-size: 0.86rem;
  font-weight: 850;
}

.intro-card h3 {
  color: white;
  font-size: clamp(1.35rem, 2vw, 1.75rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  margin-bottom: 0.55rem;
}

.intro-card p {
  color: #d4d4d8;
  line-height: 1.72;
}

.card-icon {
  flex: 0 0 auto;
  color: #ef4444;
  font-size: 2rem;
  margin-top: 0.15rem;
}

.detail-card {
  min-height: 136px;
  padding: 1.15rem;
  border-radius: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.detail-card .v-icon {
  color: #ef4444;
}

.detail-card span {
  color: #a1a1aa;
  font-size: 0.86rem;
  font-weight: 750;
}

.detail-card strong {
  color: white;
  font-size: 0.98rem;
  line-height: 1.45;
}

.highlights-grid {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.highlight-card {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  min-height: 188px;
  padding: 1rem;
  border-radius: 1.15rem;
  transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
}

.highlight-card:hover {
  transform: translateY(-5px);
  border-color: rgba(239, 68, 68, 0.3);
  background: rgba(239, 68, 68, 0.08);
}

.highlight-icon {
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.95rem;
  color: #ef4444;
  background: rgba(239, 68, 68, 0.12);
}

.highlight-card h4 {
  color: white;
  font-weight: 850;
  margin-bottom: 0.3rem;
}

.highlight-card p {
  color: #a1a1aa;
  line-height: 1.55;
  font-size: 0.95rem;
}

.about-actions {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 0.1rem;
}

.about-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  min-height: 3rem;
  padding: 0 1.05rem;
  border-radius: 0.95rem;
  text-decoration: none;
  font-weight: 850;
  transition: transform 0.24s ease, background 0.24s ease, border-color 0.24s ease, box-shadow 0.24s ease;
}

.about-button.primary {
  background: linear-gradient(135deg, #ef4444, #b91c1c);
  color: white;
  box-shadow: 0 18px 38px rgba(239, 68, 68, 0.18);
}

.about-button.secondary {
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.055);
}

.about-button:hover {
  transform: translateY(-3px);
}

.about-button.secondary:hover {
  border-color: rgba(239, 68, 68, 0.34);
  background: rgba(239, 68, 68, 0.12);
}

@media (max-width: 1080px) {
  .about-grid {
    grid-template-columns: 1fr;
  }

  .image-wrapper {
    position: relative;
    top: auto;
  }
}

@media (max-width: 760px) {
  .section-title {
    text-align: left;
    margin-bottom: 2.2rem;
  }

  .text-content,
  .highlights-grid {
    grid-template-columns: 1fr;
  }

  .intro-card {
    grid-template-columns: 1fr;
  }

  .image-caption {
    flex-direction: column;
    align-items: flex-start;
  }

  .image-caption strong {
    white-space: normal;
  }

  .about-actions {
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>
