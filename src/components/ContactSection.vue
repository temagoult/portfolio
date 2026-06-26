<script setup lang="ts">
import { computed, ref } from 'vue'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import type { Profile } from '../types/profile'

interface Props {
  profile: Profile
}

const props = defineProps<Props>()
const { isVisible, elementRef } = useScrollAnimation({ threshold: 0.18 })

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submitStatus = ref<'idle' | 'success'>('idle')

const normalizedPhone = computed(() => props.profile.phone.replace(/[^+\d]/g, ''))

const contactMethods = computed(() => [
  {
    icon: 'mdi-email-outline',
    title: 'Email',
    value: props.profile.email,
    link: `mailto:${props.profile.email}`,
    color: '#ef4444'
  },
  {
    icon: 'mdi-phone-outline',
    title: 'Phone',
    value: props.profile.phone,
    link: `tel:${normalizedPhone.value}`,
    color: '#22c55e'
  },
  {
    icon: 'mdi-file-pdf-box',
    title: 'CV',
    value: 'Download Mohamed Tamagoult CV',
    link: props.profile.cvUrl,
    color: '#f97316',
    download: true
  },
  {
    icon: 'mdi-map-marker-outline',
    title: 'Location',
    value: props.profile.location,
    link: '',
    color: '#3b82f6'
  }
])

const handleSubmit = () => {
  const subject = form.value.subject.trim() || 'Portfolio contact'
  const body = [
    `Name: ${form.value.name}`,
    `Email: ${form.value.email}`,
    '',
    form.value.message
  ].join('\n')

  window.location.href = `mailto:${props.profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  submitStatus.value = 'success'

  window.setTimeout(() => {
    submitStatus.value = 'idle'
  }, 4500)
}
</script>

<template>
  <section id="contact" class="contact-section">
    <div class="container">
      <div class="section-title">
        <span class="section-kicker">Contact</span>
        <h2>Let us discuss the opportunity</h2>
        <p>For recruitment, frontend roles or project discussions, email is the fastest way to reach me.</p>
      </div>

      <div ref="elementRef" :class="['contact-wrapper', { 'is-visible': isVisible }]">
        <aside class="contact-info">
          <div class="info-header">
            <h3>Contact information</h3>
            <p>All important links are available here, including direct access to my latest CV.</p>
          </div>

          <div class="contact-methods">
            <a
              v-for="method in contactMethods"
              :key="method.title"
              :href="method.link || undefined"
              :download="method.download || undefined"
              :class="['contact-method', { 'not-link': !method.link }]"
              :style="{ '--method-color': method.color }"
              :target="method.title === 'CV' ? '_blank' : undefined"
              :rel="method.title === 'CV' ? 'noopener noreferrer' : undefined"
            >
              <span class="method-icon">
                <v-icon :icon="method.icon" size="24" />
              </span>
              <span class="method-content">
                <span class="method-title">{{ method.title }}</span>
                <span class="method-value">{{ method.value }}</span>
              </span>
            </a>
          </div>

          <div class="social-panel">
            <h4>Professional links</h4>
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

          <div class="languages-panel">
            <h4>Languages</h4>
            <div class="languages">
              <div class="language">
                <span>Arabic</span>
                <strong>Native</strong>
              </div>
              <div class="language">
                <span>French</span>
                <strong>Advanced</strong>
              </div>
              <div class="language">
                <span>English</span>
                <strong>Good working level</strong>
              </div>
            </div>
          </div>
        </aside>

        <div class="contact-form-card">
          <form @submit.prevent="handleSubmit" class="contact-form">
            <div class="form-row">
              <div class="form-group">
                <label for="name">Your name</label>
                <input id="name" v-model="form.name" type="text" placeholder="Your name" required />
              </div>

              <div class="form-group">
                <label for="email">Your email</label>
                <input id="email" v-model="form.email" type="email" placeholder="name@company.com" required />
              </div>
            </div>

            <div class="form-group">
              <label for="subject">Subject</label>
              <input id="subject" v-model="form.subject" type="text" placeholder="Frontend opportunity" required />
            </div>

            <div class="form-group">
              <label for="message">Message</label>
              <textarea id="message" v-model="form.message" rows="7" placeholder="Tell me about the role, project or next step." required></textarea>
            </div>

            <button type="submit" class="submit-btn">
              <v-icon icon="mdi-email-send-outline" size="20" />
              Open email client
            </button>

            <transition name="fade">
              <p v-if="submitStatus === 'success'" class="status-message">
                <v-icon icon="mdi-check-circle-outline" size="20" />
                Your email client has been opened with the message prepared.
              </p>
            </transition>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  position: relative;
  padding: var(--section-padding) 0;
  background:
    radial-gradient(circle at 85% 16%, rgba(239, 68, 68, 0.12), transparent 26rem),
    linear-gradient(180deg, #090909 0%, #120505 100%);
}

.section-title {
  max-width: 760px;
  margin: 0 auto 3.5rem;
  text-align: center;
}

.section-kicker {
  display: inline-flex;
  margin-bottom: 0.85rem;
  padding: 0.42rem 0.75rem;
  border-radius: 999px;
  color: #fca5a5;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.22);
  font-weight: 800;
  font-size: 0.82rem;
}

.section-title h2 {
  color: white;
  font-size: clamp(2rem, 4vw, 3.2rem);
  line-height: 1.08;
  letter-spacing: -0.055em;
  font-weight: 900;
}

.section-title p {
  margin-top: 1rem;
  color: #a1a1aa;
  font-size: 1.05rem;
  line-height: 1.7;
}

.contact-wrapper {
  display: grid;
  grid-template-columns: 0.92fr 1.08fr;
  gap: 1.5rem;
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.75s ease, transform 0.75s ease;
}

.contact-wrapper.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.contact-info,
.contact-form-card {
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.065), rgba(255, 255, 255, 0.028));
  box-shadow: 0 22px 56px rgba(0, 0, 0, 0.22);
  border-radius: 1.55rem;
  backdrop-filter: blur(14px);
}

.contact-info {
  padding: 1.35rem;
  display: flex;
  flex-direction: column;
  gap: 1.35rem;
}

.info-header h3 {
  color: white;
  font-size: 1.45rem;
  font-weight: 900;
  letter-spacing: -0.03em;
  margin-bottom: 0.4rem;
}

.info-header p {
  color: #a1a1aa;
  line-height: 1.65;
}

.contact-methods {
  display: grid;
  gap: 0.8rem;
}

.contact-method {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0.9rem;
  padding: 0.95rem;
  border-radius: 1.1rem;
  color: white;
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(255, 255, 255, 0.08);
  text-decoration: none;
  transition: transform 0.24s ease, border-color 0.24s ease, background 0.24s ease;
}

.contact-method:not(.not-link):hover {
  transform: translateX(5px);
  background: rgba(255, 255, 255, 0.065);
  border-color: var(--method-color);
}

.contact-method.not-link {
  cursor: default;
}

.method-icon {
  width: 46px;
  height: 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.95rem;
  color: var(--method-color);
  background: rgba(255, 255, 255, 0.055);
}

.method-content {
  min-width: 0;
  display: grid;
  gap: 0.2rem;
}

.method-title {
  color: #a1a1aa;
  font-size: 0.84rem;
  font-weight: 800;
}

.method-value {
  color: white;
  font-weight: 800;
  overflow-wrap: anywhere;
}

.social-panel h4,
.languages-panel h4 {
  color: white;
  font-size: 1.05rem;
  font-weight: 900;
  margin-bottom: 0.85rem;
}

.social-icons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.social-link {
  width: 46px;
  height: 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  color: white;
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.08);
  text-decoration: none;
  transition: transform 0.24s ease, background 0.24s ease, border-color 0.24s ease;
}

.social-link:hover {
  transform: translateY(-4px);
  background: var(--social-color);
  border-color: var(--social-color);
}

.languages {
  display: grid;
  gap: 0.65rem;
}

.language {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.9rem;
  padding: 0.78rem 0.9rem;
  border-radius: 0.95rem;
  color: #d4d4d8;
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.language strong {
  color: #fca5a5;
  font-size: 0.86rem;
}

.contact-form-card {
  padding: 1.35rem;
}

.contact-form {
  display: grid;
  gap: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.form-group {
  display: grid;
  gap: 0.45rem;
}

.form-group label {
  color: white;
  font-weight: 850;
  font-size: 0.92rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  padding: 0.92rem 1rem;
  transition: border-color 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
}

.form-group textarea {
  min-height: 174px;
  resize: vertical;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #71717a;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: rgba(239, 68, 68, 0.55);
  background: rgba(255, 255, 255, 0.075);
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
}

.submit-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  width: 100%;
  min-height: 3.15rem;
  border: 0;
  border-radius: 1rem;
  color: white;
  background: linear-gradient(135deg, #ef4444, #b91c1c);
  box-shadow: 0 18px 38px rgba(239, 68, 68, 0.2);
  font-weight: 900;
  cursor: pointer;
  transition: transform 0.24s ease, box-shadow 0.24s ease;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 22px 46px rgba(239, 68, 68, 0.3);
}

.status-message {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  color: #86efac;
  background: rgba(34, 197, 94, 0.08);
  border: 1px solid rgba(34, 197, 94, 0.25);
  border-radius: 0.95rem;
  padding: 0.85rem 0.95rem;
  font-weight: 800;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.24s ease, transform 0.24s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

@media (max-width: 920px) {
  .contact-wrapper {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .section-title {
    text-align: left;
    margin-bottom: 2.4rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .contact-info,
  .contact-form-card {
    padding: 1rem;
  }
}
</style>
