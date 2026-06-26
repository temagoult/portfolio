import { ref, onMounted, onUnmounted } from 'vue'

export interface TypewriterOptions {
  texts: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
}

export function useTypewriter(options: TypewriterOptions) {
  const {
    texts,
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseDuration = 2000
  } = options

  const currentText = ref('')
  const currentIndex = ref(0)
  const isDeleting = ref(false)
  let timeout: number | null = null

  const schedule = (callback: () => void, delay: number) => {
    timeout = window.setTimeout(callback, delay)
  }

  const type = () => {
    if (texts.length === 0) {
      return
    }

    const fullText = texts[currentIndex.value] ?? ''

    if (isDeleting.value) {
      currentText.value = fullText.substring(0, currentText.value.length - 1)

      if (currentText.value === '') {
        isDeleting.value = false
        currentIndex.value = (currentIndex.value + 1) % texts.length
        schedule(type, typingSpeed)
      } else {
        schedule(type, deletingSpeed)
      }
    } else {
      currentText.value = fullText.substring(0, currentText.value.length + 1)

      if (currentText.value === fullText) {
        schedule(() => {
          isDeleting.value = true
          type()
        }, pauseDuration)
      } else {
        schedule(type, typingSpeed)
      }
    }
  }

  onMounted(() => {
    schedule(type, typingSpeed)
  })

  onUnmounted(() => {
    if (timeout) {
      window.clearTimeout(timeout)
    }
  })

  return { currentText }
}
