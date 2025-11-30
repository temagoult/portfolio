export interface Project {
  id: string
  title: string
  description: string
  image: string
  url: string
  technologies: string[]
  featured?: boolean
  category: 'professional' | 'personal'
}
