<script setup lang="ts">
import { computed } from 'vue'
import { useTypewriter } from '../composables/useTypewriter'
import type { Profile } from '../types/profile'

interface Props {
  profile: Profile
}

const props = defineProps<Props>()

const { currentText } = useTypewriter({
  texts: props.profile.titles,
  typingSpeed: 100,
  deletingSpeed: 50,
  pauseDuration: 2000
})

const displayTitle = computed(() => currentText.value || props.profile.titles[0])
</script>

<template>
  <section id="home" class="hero-section">
    <div class="container">
      <div class="grid md:grid-cols-2 gap-8 items-center min-h-screen py-20">
        <!-- Left Content -->
        <div class="hero-content space-y-6">
          <div class="text-sm md:text-lg text-red-500 font-medium animate-fade-in">
            Hi, my name is
          </div>
          
          <h1 class="text-4xl md:text-6xl font-bold animate-slide-up">
            {{ profile.name }}
          </h1>
          
          <div class="text-2xl md:text-4xl font-semibold h-20 flex items-center">
            <span class="text-gray-400">I am a</span>
            <span class="ml-3 text-red-500 typewriter-text">
              {{ displayTitle }}
              <span class="cursor-blink">|</span>
            </span>
          </div>

          <!-- Social Links -->
          <div class="flex gap-4 pt-4">
            <a
              v-for="social in profile.socialLinks"
              :key="social.platform"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
              :style="{ '--hover-color': social.color }"
              :aria-label="social.platform"
            >
              <i :class="`mdi ${social.icon}`" style="font-size: 32px;"></i>
            </a>
          </div>

          <!-- CTA Button -->
          <div class="pt-6">
            <a
              href="#projects"
              class="cta-button"
            >
              View My Work
              <i class="mdi mdi-arrow-right" style="font-size: 20px;"></i>
            </a>
          </div>
        </div>

        <!-- Right Image -->
        <div class="hero-image">
          <div class="image-container">
            <img
              src="../assets/images/photo.png"
              :alt="profile.name"
              class="profile-img"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  background: #000000;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.hero-section::before {
  content: '';
  position: absolute;
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%);
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  animation: pulse 4s ease-in-out infinite;
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  width: 100%;
}

.cursor-blink {
  animation: blink 1s step-end infinite;
}

.social-link {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.social-link:hover {
  background: var(--hover-color);
  border-color: var(--hover-color);
  transform: translateY(-4px) scale(1.1);
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3);
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(239, 68, 68, 0.5);
}

.hero-image {
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-container {
  position: relative;
  width: 100%;
  max-width: 500px;
  aspect-ratio: 1;
  animation: float 6s ease-in-out infinite;
}

.image-container::before {
  content: '';
  position: absolute;
  inset: -10px;
  background: linear-gradient(135deg, #ef4444, #dc2626, #b91c1c);
  border-radius: 50%;
  animation: rotate 8s linear infinite;
  z-index: -1;
  opacity: 0.5;
  filter: blur(20px);
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 20%;
  border-radius: 50%;
  border: 4px solid rgba(239, 68, 68, 0.3);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

@keyframes pulse {
  0%, 100% { 
    transform: translateY(-50%) scale(1); 
    opacity: 0.3; 
  }
  50% { 
    transform: translateY(-50%) scale(1.1); 
    opacity: 0.5; 
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-slide-up {
  animation: slideUp 1s ease-out 0.2s both;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .hero-section {
    min-height: auto;
    padding: 6rem 0 4rem;
  }

  .grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .hero-content h1 {
    font-size: 2rem;
  }
  
  .typewriter-text {
    font-size: 1.5rem;
  }

  .image-container {
    max-width: 300px;
  }

  .hero-content {
    order: 2;
  }

  .hero-image {
    order: 1;
  }
}
</style>