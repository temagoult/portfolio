<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useNavigation } from '../composables/useNavigation'
import type { NavigationItem } from '../types/navigation'

interface Props {
  items: NavigationItem[]
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Mohamed Tamagoult'
})

const { scrollToSection } = useNavigation()
const mobileMenuOpen = ref(false)
const isScrolled = ref(false)
const activeSection = ref('home')

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50

  // Update active section based on scroll position
  const sections = props.items.map(item => ({
    id: item.id,
    element: document.getElementById(item.id)
  }))

  const scrollPosition = window.scrollY + 100

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
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav :class="['navbar', { 'scrolled': isScrolled }]">
    <div class="nav-container">
      <!-- Logo/Title -->
      <div class="nav-brand" @click="handleNavClick('home')">
        <span class="brand-text">{{ title }}</span>
        <span class="brand-dot">.</span>
      </div>

      <!-- Desktop Navigation -->
      <div class="nav-menu desktop">
        <button
          v-for="item in items"
          :key="item.id"
          @click="handleNavClick(item.id)"
          :class="['nav-link', { 'active': activeSection === item.id }]"
        >
          <v-icon v-if="item.icon" :icon="item.icon" size="18" />
          <span>{{ item.title }}</span>
        </button>
      </div>

      <!-- Mobile Menu Button -->
      <button 
        class="mobile-menu-btn"
        @click="mobileMenuOpen = !mobileMenuOpen"
        :class="{ 'open': mobileMenuOpen }"
        aria-label="Toggle menu"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>

    <!-- Mobile Navigation -->
    <transition name="mobile-menu">
      <div v-if="mobileMenuOpen" class="mobile-menu">
        <div class="mobile-menu-overlay" @click="closeMobileMenu"></div>
        <div class="mobile-menu-content">
          <button
            v-for="item in items"
            :key="item.id"
            @click="handleNavClick(item.id)"
            :class="['mobile-nav-link', { 'active': activeSection === item.id }]"
          >
            <v-icon v-if="item.icon" :icon="item.icon" size="24" />
            <span>{{ item.title }}</span>
          </button>
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
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  border-bottom: 1px solid transparent;
}

.navbar.scrolled {
  background: rgba(0, 0, 0, 0.95);
  border-bottom-color: rgba(239, 68, 68, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Brand */
.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
}

.nav-brand:hover {
  color: #ef4444;
}

.brand-text {
  background: linear-gradient(135deg, #ffffff 0%, #ef4444 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-dot {
  color: #ef4444;
  font-size: 2rem;
  line-height: 1;
}

/* Desktop Menu */
.nav-menu.desktop {
  display: none;
  gap: 0.5rem;
}

@media (min-width: 768px) {
  .nav-menu.desktop {
    display: flex;
  }
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: transparent;
  border: none;
  border-radius: 0.5rem;
  color: #d1d5db;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: #ef4444;
  transform: translateX(-50%);
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: white;
  background: rgba(239, 68, 68, 0.1);
}

.nav-link:hover::before {
  width: 80%;
}

.nav-link.active {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.15);
}

.nav-link.active::before {
  width: 80%;
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  padding: 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1001;
}

@media (min-width: 768px) {
  .mobile-menu-btn {
    display: none;
  }
}

.hamburger-line {
  width: 24px;
  height: 2px;
  background: white;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.mobile-menu-btn.open .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translateY(9px);
  background: #ef4444;
}

.mobile-menu-btn.open .hamburger-line:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.open .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translateY(-9px);
  background: #ef4444;
}

/* Mobile Menu */
.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
}

.mobile-menu-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
}

.mobile-menu-content {
  position: relative;
  margin-left: auto;
  width: 280px;
  height: 100vh;
  background: linear-gradient(135deg, #1a0000 0%, #0a0a0a 100%);
  border-left: 1px solid rgba(239, 68, 68, 0.2);
  padding: 6rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 0.75rem;
  color: #d1d5db;
  font-size: 1.125rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.mobile-nav-link:hover {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.3);
  color: white;
  transform: translateX(-4px);
}

.mobile-nav-link.active {
  background: rgba(239, 68, 68, 0.15);
  border-color: rgba(239, 68, 68, 0.4);
  color: #ef4444;
}

/* Mobile Menu Transitions */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-active .mobile-menu-overlay,
.mobile-menu-leave-active .mobile-menu-overlay {
  transition: opacity 0.3s ease;
}

.mobile-menu-enter-active .mobile-menu-content,
.mobile-menu-leave-active .mobile-menu-content {
  transition: transform 0.3s ease;
}

.mobile-menu-enter-from .mobile-menu-overlay,
.mobile-menu-leave-to .mobile-menu-overlay {
  opacity: 0;
}

.mobile-menu-enter-from .mobile-menu-content,
.mobile-menu-leave-to .mobile-menu-content {
  transform: translateX(100%);
}

/* Scrollbar for mobile menu */
.mobile-menu-content::-webkit-scrollbar {
  width: 4px;
}

.mobile-menu-content::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
}

.mobile-menu-content::-webkit-scrollbar-thumb {
  background: rgba(239, 68, 68, 0.5);
  border-radius: 2px;
}

.mobile-menu-content::-webkit-scrollbar-thumb:hover {
  background: rgba(239, 68, 68, 0.7);
}
</style>