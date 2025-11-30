export interface Skill {
  id: string
  name: string
  icon: string
  category: 'frontend' | 'backend' | 'language' | 'framework'
  proficiency?: number
}
