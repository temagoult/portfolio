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
  typingSpeed: 92,
  deletingSpeed: 42,
  pauseDuration: 1700
})

const displayTitle = computed(() => currentText.value || props.profile.titles[0])
</script>

<template>
  <section id="home" class="hero-section">
    <div class="hero-glow hero-glow-one"></div>
    <div class="hero-glow hero-glow-two"></div>
    <div class="container">
      <div class="hero-stack">
        <div class="hero-top">
          <div class="hero-content">
            <div class="hero-eyebrow">
              <span class="status-dot"></span>
              Frontend-focused Software Engineer
            </div>

            <h1 class="hero-title">
              Building clean Vue.js interfaces for real business products.
            </h1>

            <div class="role-line">
              <span class="role-muted">Specialized in</span>
              <span class="role-active">
                {{ displayTitle }}<span class="cursor-blink">|</span>
              </span>
            </div>
          </div>

          <div class="hero-visual" aria-hidden="true">
            <div class="profile-card">
              <div class="profile-card-header">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div class="image-shell">
                <img src="../assets/images/photo.png" :alt="profile.name" class="profile-img" />
              </div>
              <div class="profile-card-footer">
                <div>
                  <strong>{{ profile.name }}</strong>
                  <span>{{ profile.title }}</span>
                </div>
                <div class="availability-pill">Ready</div>
              </div>
            </div>
          </div>
        </div>

        <div class="hero-bottom-panel">
          <p class="hero-description">
            {{ profile.bio }}
          </p>

          <div class="hero-bottom-row">
            <div class="hero-actions" aria-label="Primary actions">
              <a :href="profile.cvUrl" download class="cta-button primary">
                <v-icon icon="mdi-file-download-outline" size="20" />
                Download CV
              </a>
              <a :href="profile.cvUrl" target="_blank" rel="noopener noreferrer" class="cta-button secondary">
                <v-icon icon="mdi-eye-outline" size="20" />
                View CV
              </a>
              <a href="#projects" class="cta-button ghost">
                <v-icon icon="mdi-rocket-launch-outline" size="20" />
                View Projects
              </a>
            </div>

            <div class="hero-meta">
              <div class="hero-tags" aria-label="Core frontend stack">
                <span>Vue.js</span>
                <span>TypeScript</span>
                <span>UI/UX</span>
                <span>REST APIs</span>
              </div>

              <div class="social-links" aria-label="Social links">
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
                  <v-icon :icon="social.icon" size="23" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 7rem 0 4.6rem;
  background:
    linear-gradient(135deg, rgba(239, 68, 68, 0.12), transparent 28%),
    radial-gradient(circle at 12% 22%, rgba(239, 68, 68, 0.1), transparent 22rem),
    #050505;
}

.hero-glow {
  position: absolute;
  border-radius: 999px;
  filter: blur(8px);
  pointer-events: none;
}

.hero-glow-one {
  width: 34rem;
  height: 34rem;
  top: 10%;
  right: -10rem;
  background: radial-gradient(circle, rgba(239, 68, 68, 0.16), transparent 68%);
  animation: floatSoft 8s ease-in-out infinite;
}

.hero-glow-two {
  width: 24rem;
  height: 24rem;
  left: -9rem;
  bottom: 7rem;
  background: radial-gradient(circle, rgba(127, 29, 29, 0.22), transparent 72%);
  animation: floatSoft 9s ease-in-out infinite reverse;
}

.hero-stack {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: clamp(1.6rem, 3vw, 2.35rem);
}

.hero-top {
  display: grid;
  grid-template-columns: minmax(0, 1.02fr) minmax(320px, 0.86fr);
  align-items: start;
  gap: clamp(2rem, 5vw, 4.6rem);
}

.hero-content {
  animation: slideUp 0.7s ease-out both;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.55rem 0.85rem;
  border: 1px solid rgba(239, 68, 68, 0.28);
  border-radius: 999px;
  color: #fca5a5;
  background: rgba(239, 68, 68, 0.08);
  font-size: 0.92rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  margin-bottom: 1.45rem;
}

.status-dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 999px;
  background: #22c55e;
  box-shadow: 0 0 0 6px rgba(34, 197, 94, 0.12);
}

.hero-title {
  font-size: clamp(2.9rem, 5.6vw, 5.45rem);
  line-height: 0.96;
  letter-spacing: -0.07em;
  font-weight: 900;
  color: white;
  max-width: 710px;
}

.hero-visual {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding-top: 0;
  animation: slideUp 0.8s ease-out 0.1s both;
}

.profile-card {
  position: relative;
  width: min(450px, 100%);
  padding: 1rem;
  border: 1px solid rgba(239, 68, 68, 0.24);
  border-radius: 2rem;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.095), rgba(255, 255, 255, 0.035));
  box-shadow: var(--shadow-premium);
  backdrop-filter: blur(18px);
}

.profile-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.5), transparent 38%, rgba(255, 255, 255, 0.08));
  z-index: -1;
}

.profile-card-header {
  display: flex;
  gap: 0.42rem;
  padding: 0.25rem 0.25rem 0.9rem;
}

.profile-card-header span {
  width: 0.72rem;
  height: 0.72rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
}

.profile-card-header span:first-child {
  background: #ef4444;
}

.image-shell {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1;
  border-radius: 1.5rem;
  background: #111;
}

.profile-img {
  width: 100%;
  height: 118%;
  object-fit: cover;
  object-position: center 15%;
  transform: translateY(-2%);
  filter: saturate(1.04) contrast(1.03);
}

.profile-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 0.3rem 0.1rem;
}

.profile-card-footer strong,
.profile-card-footer span {
  display: block;
}

.profile-card-footer strong {
  color: white;
  font-size: 1.05rem;
}

.profile-card-footer span {
  color: #a1a1aa;
  font-size: 0.9rem;
  margin-top: 0.15rem;
}

.availability-pill {
  padding: 0.52rem 0.82rem;
  border: 1px solid rgba(34, 197, 94, 0.28);
  border-radius: 999px;
  color: #86efac;
  background: rgba(34, 197, 94, 0.08);
  font-weight: 800;
  font-size: 0.78rem;
}


.hero-bottom-panel {
  width: 100%;
  padding: clamp(1.25rem, 3vw, 1.75rem);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1.6rem;
  background:
    linear-gradient(135deg, rgba(239, 68, 68, 0.12), transparent 38%),
    rgba(255, 255, 255, 0.045);
  box-shadow: 0 22px 60px rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(16px);
  animation: slideUp 0.8s ease-out 0.2s both;
}

.role-line {
  min-height: 2.35rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.65rem;
  margin-top: clamp(1rem, 2vw, 1.4rem);
  font-size: clamp(1.08rem, 1.85vw, 1.45rem);
  font-weight: 850;
}

.role-muted {
  color: #a1a1aa;
}

.role-active {
  color: #ef4444;
}

.cursor-blink {
  display: inline-block;
  margin-left: 0.08rem;
  animation: blink 1s step-end infinite;
}

.hero-description {
  margin-top: 0;
  max-width: none;
  color: #d4d4d8;
  line-height: 1.78;
  font-size: clamp(1rem, 1.35vw, 1.12rem);
}

.hero-bottom-row {
  margin-top: 1.45rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.2rem;
  flex-wrap: wrap;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  min-height: 3.15rem;
  padding: 0 1.18rem;
  border-radius: 1rem;
  font-weight: 850;
  text-decoration: none;
  transition: transform 0.24s ease, box-shadow 0.24s ease, background 0.24s ease, border-color 0.24s ease;
}

.cta-button.primary {
  background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
  color: white;
  box-shadow: 0 18px 38px rgba(239, 68, 68, 0.24);
}

.cta-button.secondary,
.cta-button.ghost {
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #f4f4f5;
  background: rgba(255, 255, 255, 0.055);
}

.cta-button.ghost {
  background: transparent;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 22px 44px rgba(239, 68, 68, 0.28);
}

.cta-button.secondary:hover,
.cta-button.ghost:hover {
  background: rgba(239, 68, 68, 0.13);
  border-color: rgba(239, 68, 68, 0.34);
}

.hero-meta {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.85rem;
  flex-wrap: wrap;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.65rem;
}

.hero-tags span {
  padding: 0.5rem 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  color: #d4d4d8;
  background: rgba(255, 255, 255, 0.04);
  font-size: 0.86rem;
  font-weight: 700;
}

.social-links {
  display: flex;
  gap: 0.65rem;
}

.social-link {
  width: 42px;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.9rem;
  color: white;
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.09);
  text-decoration: none;
  transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease;
}

.social-link:hover {
  background: var(--hover-color);
  border-color: var(--hover-color);
  transform: translateY(-4px);
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }

  51%, 100% {
    opacity: 0;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes floatSoft {
  0%, 100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-12px);
  }
}

@media (max-width: 1040px) {
  .hero-top {
    grid-template-columns: 1fr;
  }

  .hero-visual {
    justify-content: center;
    padding-top: 0;
  }

  .profile-card {
    max-width: 380px;
  }
}

@media (max-width: 760px) {
  .hero-section {
    padding: 6.4rem 0 4rem;
  }

  .hero-title {
    font-size: clamp(2.45rem, 13vw, 3.7rem);
  }

  .hero-bottom-row,
  .hero-meta {
    align-items: stretch;
    justify-content: flex-start;
  }

  .hero-actions {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
  }

  .cta-button {
    width: 100%;
  }

  .hero-tags {
    justify-content: flex-start;
  }

}
</style>
