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

  const type = () => {
    const fullText = texts[currentIndex.value]
    
    if (isDeleting.value) {
      currentText.value = fullText!.substring(0, currentText.value.length - 1)
      
      if (currentText.value === '') {
        isDeleting.value = false
        currentIndex.value = (currentIndex.value + 1) % texts.length
        timeout = setTimeout(type, typingSpeed)
      } else {
        timeout = setTimeout(type, deletingSpeed)
      }
    } else {
      currentText.value = fullText!.substring(0, currentText.value.length + 1)
      
      if (currentText.value === fullText) {
        timeout = setTimeout(() => {
          isDeleting.value = true
          type()
        }, pauseDuration)
      } else {
        timeout = setTimeout(type, typingSpeed)
      }
    }
  }

  onMounted(() => {
    timeout = setTimeout(type, typingSpeed)
  })

  onUnmounted(() => {
    if (timeout) {
      clearTimeout(timeout)
    }
  })

  return { currentText }
}