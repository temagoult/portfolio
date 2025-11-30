import { type SocialLink } from "./social"
export interface Profile {
  name: string
  title: string
  titles: string[] // For typewriter effect
  bio: string
  education: string
  location: string
  image: string
  socialLinks: SocialLink[]
  phone:string
  email:string
}