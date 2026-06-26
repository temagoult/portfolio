<script setup lang="ts">
import { profileData, skillsData, projectsData, navigationItems, experiencesData } from './config/portfolio.config'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ContactSection from './components/ContactSection.vue'
</script>

<template>
  <v-app>
    <NavBar :items="navigationItems" :title="profileData.name" :cv-url="profileData.cvUrl" />
    <v-main>
      <HeroSection :profile="profileData" />
      <AboutSection :profile="profileData" />
      <ExperienceSection :experiences="experiencesData" />
      <SkillsSection :skills="skillsData" />
      <ProjectsSection :projects="projectsData" />
      <ContactSection :profile="profileData" />
      <footer class="footer">
        <div class="footer-content">
          <div>
            <p class="footer-name">{{ profileData.name }}</p>
            <p class="footer-text">Frontend-focused Software Engineer</p>
          </div>
          <div class="footer-links">
            <a
              :href="profileData.cvUrl"
              download
              class="footer-link footer-link-wide"
              aria-label="Download CV"
            >
              <v-icon icon="mdi-file-download-outline" size="18" />
              CV
            </a>
            <a
              v-for="social in profileData.socialLinks"
              :key="social.platform"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-link"
              :aria-label="social.platform"
            >
              <v-icon :icon="social.icon" size="20" />
            </a>
          </div>
        </div>
      </footer>
    </v-main>
  </v-app>
</template>

<style>
:root {
  --color-bg: #050505;
  --color-bg-soft: #0b0b0d;
  --color-surface: rgba(255, 255, 255, 0.045);
  --color-surface-strong: rgba(255, 255, 255, 0.075);
  --color-primary: #ef4444;
  --color-primary-dark: #dc2626;
  --color-text: #ffffff;
  --color-muted: #a1a1aa;
  --color-border: rgba(239, 68, 68, 0.22);
  --color-border-accent: rgba(239, 68, 68, 0.32);
  --container-width: 1180px;
  --section-padding: 6.5rem;
  --shadow-premium: 0 24px 80px rgba(0, 0, 0, 0.42);
  --shadow-accent: 0 18px 48px rgba(239, 68, 68, 0.24);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  background: var(--color-bg);
}

body {
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background:
    radial-gradient(circle at top right, rgba(239, 68, 68, 0.12), transparent 30rem),
    radial-gradient(circle at bottom left, rgba(239, 68, 68, 0.08), transparent 28rem),
    var(--color-bg);
  color: var(--color-text);
}

body::selection {
  background: rgba(239, 68, 68, 0.32);
  color: white;
}

button,
a,
input,
textarea {
  font: inherit;
}

a {
  color: inherit;
}

button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 3px solid rgba(239, 68, 68, 0.55);
  outline-offset: 4px;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #050505;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #ef4444 0%, #991b1b 100%);
  border-radius: 999px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #f87171 0%, #dc2626 100%);
}

.v-application {
  background: transparent !important;
}

.v-main {
  padding-top: 0 !important;
  animation: fadeIn 0.45s ease-out;
}

.container {
  width: 100%;
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 1.5rem;
}

.footer {
  background: rgba(0, 0, 0, 0.88);
  border-top: 1px solid var(--color-border);
  padding: 2.2rem 0;
}

.footer-content {
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
}

.footer-name {
  color: white;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.footer-text {
  color: var(--color-muted);
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.footer-link {
  width: 42px;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 0.85rem;
  color: #d4d4d8;
  text-decoration: none;
  transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}

.footer-link-wide {
  width: auto;
  padding: 0 0.9rem;
  font-weight: 700;
  font-size: 0.86rem;
}

.footer-link:hover {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
  transform: translateY(-3px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  :root {
    --section-padding: 4.5rem;
  }

  .footer-content {
    flex-direction: column;
    text-align: center;
  }

  .footer-links {
    justify-content: center;
    flex-wrap: wrap;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
