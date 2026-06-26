export type ExperienceType = 'full-time' | 'remote' | 'contract' | 'internship'

export interface Experience {
  id: string
  company: string
  position: string
  period: string
  location: string
  type: ExperienceType
  companyUrl?: string
  description: string
  responsibilities: string[]
  technologies: string[]
  current?: boolean
}

export const isCurrentExperience = (experience: Experience): boolean => {
  return experience.current === true
}

export const sortExperiences = (experiences: Experience[]): Experience[] => {
  return [...experiences].sort((a, b) => {
    if (a.current && !b.current) return -1
    if (!a.current && b.current) return 1
    return 0
  })
}

export const filterExperiencesByType = (
  experiences: Experience[],
  type: Experience['type']
): Experience[] => {
  return experiences.filter(experience => experience.type === type)
}

export const getAllTechnologies = (experiences: Experience[]): string[] => {
  const techSet = new Set<string>()
  experiences.forEach(experience => {
    experience.technologies.forEach(technology => techSet.add(technology))
  })
  return Array.from(techSet).sort()
}
