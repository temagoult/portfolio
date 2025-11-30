
export function useNavigation() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return { scrollToSection }
}

// src/composables/useTheme.ts
import { ref, computed } from 'vue'

export function useTheme() {
  const isDark = ref(true)

  const toggleTheme = () => {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
  }

  const themeColors = computed(() => ({
    primary: isDark.value ? '#ef4444' : '#dc2626',
    background: isDark.value ? '#000000' : '#ffffff',
    text: isDark.value ? '#ffffff' : '#000000'
  }))

  return {
    isDark,
    toggleTheme,
    themeColors
  }}