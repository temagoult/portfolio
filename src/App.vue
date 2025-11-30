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
  
    <NavBar :items="navigationItems" :title="profileData.name" />

  
    <v-main>
 
      <HeroSection :profile="profileData" />

    
      <AboutSection :profile="profileData" />

    
      <ExperienceSection :experiences="experiencesData" />

      <SkillsSection :skills="skillsData" />

      <ProjectsSection :projects="projectsData" />


      <ContactSection :profile="profileData" />


      <footer class="footer">
        <div class="footer-content">
          <p class="footer-text">
            © {{ new Date().getFullYear() }} {{ profileData.name }}. All rights reserved.
          </p>
          <div class="footer-links">
            <a
              v-for="social in profileData.socialLinks"
              :key="social.platform"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="footer-link"
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
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #000000;
  color: white;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: #0a0a0a;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #ef4444 0%, #dc2626 100%);
  border-radius: 6px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #dc2626 0%, #b91c1c 100%);
}

/* Selection */
::selection {
  background: rgba(239, 68, 68, 0.3);
  color: white;
}

::-moz-selection {
  background: rgba(239, 68, 68, 0.3);
  color: white;
}

/* Vuetify Overrides */
.v-application {
  background: #000000 !important;
}

.v-main {
  padding-top: 0 !important;
}

/* Footer */
.footer {
  background: #000000;
  border-top: 1px solid rgba(239, 68, 68, 0.2);
  padding: 2rem 0;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-text {
  color: #9ca3af;
  font-size: 0.875rem;
}

.footer-links {
  display: flex;
  gap: 1rem;
}

.footer-link {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  color: #9ca3af;
  text-decoration: none;
  transition: all 0.3s ease;
}

.footer-link:hover {
  background: #ef4444;
  color: white;
  transform: translateY(-4px);
}

@media (max-width: 640px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
  }
}

/* Utility Classes */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Loading Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.v-main {
  animation: fadeIn 0.5s ease-out;
}
</style>