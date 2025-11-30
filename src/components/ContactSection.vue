<script setup lang="ts">
import { ref } from 'vue'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import type { Profile } from '../types/profile'

interface Props {
  profile: Profile
}

const props = defineProps<Props>()
const { isVisible, elementRef } = useScrollAnimation({ threshold: 0.2 })

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')

const handleSubmit = async () => {
  isSubmitting.value = true
  
  try {
    // Simulate API call - Replace with your actual email service
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    submitStatus.value = 'success'
    
    // Reset form
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
    
    setTimeout(() => {
      submitStatus.value = 'idle'
    }, 5000)
  } catch (error) {
    submitStatus.value = 'error'
    setTimeout(() => {
      submitStatus.value = 'idle'
    }, 5000)
  } finally {
    isSubmitting.value = false
  }
}

const contactMethods = [
  {
    icon: 'mdi-email',
    title: 'Email',
    value: props.profile.email,
    link: `mailto:${props.profile.email}`,
    color: '#ef4444'
  },
  {
    icon: 'mdi-phone',
    title: 'Phone',
    value: props.profile.phone,
    link: `tel:${props.profile.phone?.replace(/\s/g, '')}`,
    color: '#22c55e'
  },
  {
    icon: 'mdi-map-marker',
    title: 'Location',
    value: props.profile.location,
    link: '#',
    color: '#3b82f6'
  }
]
</script>

<template>
  <section id="contact" class="contact-section">
    <div class="container">
      <!-- Section Title -->
      <div class="section-title">
        <h2>Get In Touch</h2>
        <div class="title-underline"></div>
        <p class="subtitle">Let's work together on your next project</p>
      </div>

      <div 
        ref="elementRef"
        :class="['contact-wrapper', { 'is-visible': isVisible }]"
      >
        <!-- Contact Info -->
        <div class="contact-info">
          <div class="info-header">
            <h3>Contact Information</h3>
            <p>Feel free to reach out through any of these channels</p>
          </div>

          <div class="contact-methods">
            <a
              v-for="method in contactMethods"
              :key="method.title"
              :href="method.link"
              :class="['contact-method', { 'not-link': method.link === '#' }]"
              :style="{ '--method-color': method.color }"
            >
              <div class="method-icon">
                <v-icon :icon="method.icon" size="24" />
              </div>
              <div class="method-content">
                <span class="method-title">{{ method.title }}</span>
                <span class="method-value">{{ method.value }}</span>
              </div>
            </a>
          </div>

          <!-- Social Links -->
          <div class="social-links">
            <h4>Follow Me</h4>
            <div class="social-icons">
              <a
                v-for="social in profile.socialLinks"
                :key="social.platform"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link"
                :style="{ '--social-color': social.color }"
                :aria-label="social.platform"
              >
                <v-icon :icon="social.icon" size="24" />
              </a>
            </div>
          </div>

          <!-- Languages -->
          <div class="languages-section">
            <h4>Languages</h4>
            <div class="languages">
              <div class="language">
                <span>Arabic</span>
                <span class="level">Native</span>
              </div>
              <div class="language">
                <span>French</span>
                <span class="level">Advanced</span>
              </div>
              <div class="language">
                <span>English</span>
                <span class="level">Good</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="contact-form">
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="name">Your Name</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                placeholder="John Doe"
                required
              />
            </div>

            <div class="form-group">
              <label for="email">Your Email</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="john@example.com"
                required
              />
            </div>

            <div class="form-group">
              <label for="subject">Subject</label>
              <input
                id="subject"
                v-model="form.subject"
                type="text"
                placeholder="Project Inquiry"
                required
              />
            </div>

            <div class="form-group">
              <label for="message">Message</label>
              <textarea
                id="message"
                v-model="form.message"
                rows="6"
                placeholder="Tell me about your project..."
                required
              ></textarea>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="submit-btn"
              :disabled="isSubmitting"
            >
              <span v-if="!isSubmitting">
                <v-icon icon="mdi-send" size="20" />
                Send Message
              </span>
              <span v-else>
                <v-icon icon="mdi-loading" size="20" class="spinning" />
                Sending...
              </span>
            </button>

            <!-- Status Messages -->
            <transition name="fade">
              <div v-if="submitStatus === 'success'" class="status-message success">
                <v-icon icon="mdi-check-circle" size="20" />
                Message sent successfully! I'll get back to you soon.
              </div>
            </transition>

            <transition name="fade">
              <div v-if="submitStatus === 'error'" class="status-message error">
                <v-icon icon="mdi-alert-circle" size="20" />
                Failed to send message. Please try again or contact me directly.
              </div>
            </transition>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  background: linear-gradient(180deg, #0a0a0a 0%, #1a0000 100%);
  padding: 6rem 0;
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section-title {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ef4444;
  margin-bottom: 1rem;
}

.title-underline {
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, transparent, #ef4444, transparent);
  margin: 0 auto 1rem;
  border-radius: 2px;
}

.subtitle {
  color: #9ca3af;
  font-size: 1.125rem;
}

/* Contact Wrapper */
.contact-wrapper {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 3rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.contact-wrapper.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Contact Info */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-header h3 {
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
}

.info-header p {
  color: #9ca3af;
  line-height: 1.6;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 0.75rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.contact-method:not(.not-link):hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--method-color);
  transform: translateX(8px);
  box-shadow: 0 4px 20px rgba(239, 68, 68, 0.2);
}

.method-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  color: var(--method-color);
}

.method-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.method-title {
  font-size: 0.875rem;
  color: #9ca3af;
  font-weight: 500;
}

.method-value {
  font-size: 1rem;
  color: white;
  font-weight: 600;
}

/* Social Links */
.social-links h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1rem;
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.social-link {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: var(--social-color);
  border-color: var(--social-color);
  transform: translateY(-4px) rotate(5deg);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

/* Languages */
.languages-section h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1rem;
}

.languages {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.language {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 0.5rem;
  color: #d1d5db;
}

.language .level {
  color: #ef4444;
  font-weight: 600;
  font-size: 0.875rem;
}

/* Contact Form */
.contact-form {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 1rem;
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  color: white;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.875rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #ef4444;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #6b7280;
}

.form-group textarea {
  resize: vertical;
  min-height: 150px;
}

.submit-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(239, 68, 68, 0.4);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.status-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
  font-weight: 500;
}

.status-message.success {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: #22c55e;
}

.status-message.error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .contact-section {
    padding: 4rem 0;
  }

  .section-title h2 {
    font-size: 2rem;
  }

  .contact-wrapper {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .contact-form {
    padding: 1.5rem;
  }

  .social-icons {
    flex-wrap: wrap;
  }
}
</style>