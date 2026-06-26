export type ProjectCategory = 'professional' | 'personal'

export interface Project {
  id: string
  title: string
  role?: string
  description: string
  image: string
  url: string
  technologies: string[]
  featured?: boolean
  category: ProjectCategory
}
