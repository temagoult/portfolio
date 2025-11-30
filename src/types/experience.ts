export interface Experience {
  id: string
  company: string
  position: string
  period: string
  location: string
  type: 'full-time' | 'freelance' | 'contract' | 'internship'
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
  return experiences.filter(exp => exp.type === type)
}

export const getAllTechnologies = (experiences: Experience[]): string[] => {
  const techSet = new Set<string>()
  experiences.forEach(exp => {
    exp.technologies.forEach(tech => techSet.add(tech))
  })
  return Array.from(techSet).sort()
}

export const calculateTotalYears = (experiences: Experience[]): number => {
  const fullTimeExperiences = experiences.filter(exp => exp.type === 'full-time')
  return fullTimeExperiences.length * 0.5
}