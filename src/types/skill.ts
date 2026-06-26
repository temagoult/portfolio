export type SkillCategory = 'frontend' | 'uiux' | 'tools' | 'backend' | 'database'

export interface Skill {
  id: string
  name: string
  icon: string
  category: SkillCategory
  proficiency?: number
}
