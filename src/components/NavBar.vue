<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useNavigation } from '../composables/useNavigation'
import type { NavigationItem } from '../types/navigation'

interface Props {
  items: NavigationItem[]
  title?: string
  cvUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Mohamed Tamagoult',
  cvUrl: '/cv/Mohamed_Tamagoult_CV.pdf'
})

const { scrollToSection } = useNavigation()
const mobileMenuOpen = ref(false)
const isScrolled = ref(false)
const activeSection = ref('home')

const handleScroll = () => {
  isScrolled.value = window.scrollY > 40

  const sections = props.items.map(item => ({
    id: item.id,
    element: document.getElementById(item.id)
  }))

  const scrollPosition = window.scrollY + 120

  for (const section of sections) {
    if (section.element) {
      const { offsetTop, offsetHeight } = section.element
      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        activeSection.value = section.id
        break
      }
    }
  }
}

const handleNavClick = (id: string) => {
  scrollToSection(id)
  mobileMenuOpen.value = false
  activeSection.value = id
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav :class="['navbar', { scrolled: isScrolled }]">
    <div class="nav-container">
      <button type="button" class="nav-brand" @click="handleNavClick('home')" aria-label="Go to home">
        <span class="brand-mark">MT</span>
        <span class="brand-text">{{ title }}</span>
      </button>

      <div class="nav-menu desktop">
        <button
          v-for="item in items"
          :key="item.id"
          type="button"
          @click="handleNavClick(item.id)"
          :class="['nav-link', { active: activeSection === item.id }]"
        >
          <v-icon v-if="item.icon" :icon="item.icon" size="17" />
          <span>{{ item.title }}</span>
        </button>
      </div>

      <a :href="cvUrl" class="nav-cv desktop-cv" download>
        CV
        <v-icon icon="mdi-download" size="17" />
      </a>

      <button
        class="mobile-menu-btn"
        type="button"
        @click="mobileMenuOpen = !mobileMenuOpen"
        :class="{ open: mobileMenuOpen }"
        aria-label="Toggle menu"
        :aria-expanded="mobileMenuOpen"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>

    <transition name="mobile-menu">
      <div v-if="mobileMenuOpen" class="mobile-menu">
        <div class="mobile-menu-overlay" @click="closeMobileMenu"></div>
        <div class="mobile-menu-content">
          <button
            v-for="item in items"
            :key="item.id"
            type="button"
            @click="handleNavClick(item.id)"
            :class="['mobile-nav-link', { active: activeSection === item.id }]"
          >
            <v-icon v-if="item.icon" :icon="item.icon" size="22" />
            <span>{{ item.title }}</span>
          </button>
          <a :href="cvUrl" class="mobile-cv" download @click="closeMobileMenu">
            <v-icon icon="mdi-download" size="22" />
            Download CV
          </a>
        </div>
      </div>
    </transition>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(5, 5, 8, 0.56);
  backdrop-filter: blur(18px);
  transition: all 0.25s ease;
  border-bottom: 1px solid transparent;
}

.navbar.scrolled {
  background: rgba(5, 5, 8, 0.88);
  border-bottom-color: var(--color-border);
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.28);
}

.nav-container {
  max-width: 1380px;
  margin: 0 auto;
  padding: 0.85rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.nav-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  user-select: none;
}

.brand-mark {
  width: 42px;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 13px;
  color: white;
  background: linear-gradient(135deg, var(--color-primary), #991b1b);
  font-size: 0.92rem;
  font-weight: 950;
  letter-spacing: -0.04em;
  box-shadow: var(--shadow-accent);
}

.brand-text {
  color: white;
  font-size: 1rem;
  font-weight: 900;
  letter-spacing: -0.035em;
}

.nav-menu.desktop {
  display: none;
  align-items: center;
  gap: 0.25rem;
  padding: 0.35rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.035);
}

@media (min-width: 900px) {
  .nav-menu.desktop {
    display: flex;
  }
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.62rem 0.86rem;
  background: transparent;
  border: none;
  border-radius: 999px;
  color: var(--color-muted);
  font-size: 0.92rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.25s ease;
}

.nav-link:hover,
.nav-link.active {
  color: white;
  background: rgba(239, 68, 68, 0.14);
}

.nav-cv,
.mobile-cv {
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  text-decoration: none;
  font-weight: 900;
  color: white;
  border: 1px solid var(--color-border-accent);
  background: rgba(239, 68, 68, 0.11);
  transition: all 0.25s ease;
}

.nav-cv {
  display: none;
  min-height: 42px;
  padding: 0.65rem 0.95rem;
  border-radius: 999px;
}

.nav-cv:hover,
.mobile-cv:hover {
  background: var(--color-primary);
  transform: translateY(-2px);
}

@media (min-width: 900px) {
  .desktop-cv {
    display: inline-flex;
  }
}

.mobile-menu-btn {
  display: flex;
  flex-direction: column;
  gap: 0.34rem;
  padding: 0.58rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--color-border);
  border-radius: 0.8rem;
  cursor: pointer;
  z-index: 1001;
}

@media (min-width: 900px) {
  .mobile-menu-btn {
    display: none;
  }
}

.hamburger-line {
  width: 24px;
  height: 2px;
  background: white;
  border-radius: 2px;
  transition: all 0.25s ease;
}

.mobile-menu-btn.open .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translateY(8px);
  background: var(--color-primary);
}

.mobile-menu-btn.open .hamburger-line:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.open .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translateY(-8px);
  background: var(--color-primary);
}

.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
}

.mobile-menu-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(6px);
}

.mobile-menu-content {
  position: relative;
  margin-left: auto;
  width: min(86vw, 320px);
  height: 100vh;
  padding: 6rem 1.25rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  background: linear-gradient(145deg, rgba(22, 7, 9, 0.98) 0%, rgba(5, 5, 8, 0.98) 100%);
  border-left: 1px solid var(--color-border-accent);
  overflow-y: auto;
}

.mobile-nav-link,
.mobile-cv {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.85rem;
  padding: 1rem;
  border-radius: 1rem;
  color: #e5e7eb;
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid var(--color-border);
  font-weight: 850;
  cursor: pointer;
  transition: all 0.25s ease;
  text-align: left;
}

.mobile-nav-link:hover,
.mobile-nav-link.active {
  background: rgba(239, 68, 68, 0.14);
  border-color: var(--color-border-accent);
  color: white;
}

.mobile-cv {
  margin-top: 0.4rem;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.25s ease;
}

.mobile-menu-enter-active .mobile-menu-overlay,
.mobile-menu-leave-active .mobile-menu-overlay {
  transition: opacity 0.25s ease;
}

.mobile-menu-enter-active .mobile-menu-content,
.mobile-menu-leave-active .mobile-menu-content {
  transition: transform 0.25s ease;
}

.mobile-menu-enter-from .mobile-menu-overlay,
.mobile-menu-leave-to .mobile-menu-overlay {
  opacity: 0;
}

.mobile-menu-enter-from .mobile-menu-content,
.mobile-menu-leave-to .mobile-menu-content {
  transform: translateX(100%);
}

@media (max-width: 480px) {
  .brand-text {
    display: none;
  }
}
</style>
