import type { Profile } from '../types/profile'
import type { Skill } from '../types/skill'
import type { Project } from '../types/project'
import type { NavigationItem } from '../types/navigation'
import type { Experience } from '../types/experience'
import bankingImage from '../assets/images/banking.svg'
import sigserviceImage from '../assets/images/sigservice.svg'
import mailstoneImage from '../assets/images/mailstone.svg'
import houterImage from '../assets/images/one.png'
import dreamAgencyImage from '../assets/images/recentWork.png'
import antropologicaImage from '../assets/images/blog.png'

export const profileData: Profile = {
  name: 'Mohamed Tamagoult',
  title: 'Software Engineer',
  titles: [
    'Frontend Developer',
    'Vue.js Developer',
    'TypeScript Developer',
    'UI-focused Web Developer'
  ],
  bio: 'Software engineer focused on building clean, responsive and maintainable web interfaces. I work mainly with Vue.js, TypeScript, REST APIs and modern UI systems, with additional experience in business applications, banking environments and SQL-based workflows.',
  education: "Master's Degree in Software Engineering - University Constantine 2",
  location: 'Algiers, Algeria',
  phone: '0555 54 51 61 / 0791 10 83 04',
  email: 'mohamed.tamagoult@gmail.com',
  image: '../assets/images/photo.png',
  cvUrl: '/cv/Mohamed_Tamagoult_CV.pdf',
  portfolioUrl: 'https://storied-rabanadas-3d9fc4.netlify.app/',
  socialLinks: [
    {
      platform: 'github',
      url: 'https://github.com/temagoult',
      icon: 'mdi-github',
      color: '#333333'
    },
    {
      platform: 'linkedin',
      url: 'https://www.linkedin.com/in/mohamed-tamagoult',
      icon: 'mdi-linkedin',
      color: '#0a66c2'
    },
    {
      platform: 'email',
      url: 'mailto:mohamed.tamagoult@gmail.com',
      icon: 'mdi-email',
      color: '#ef4444'
    }
  ]
}

export const experiencesData: Experience[] = [
  {
    id: 'mailstone',
    company: 'Mailstone',
    position: 'Frontend Developer',
    period: 'Remote project',
    location: 'Remote',
    type: 'remote',
    companyUrl: 'https://www.mailstone.io/',
    description: 'Frontend contribution on a client-facing SaaS web application, with focus on interface quality, responsive screens and stable client-side workflows.',
    responsibilities: [
      'Contributed to client-facing frontend features using modern web technologies',
      'Improved UI details, component consistency and visual quality across screens',
      'Participated in bug fixing, interface refinements and client-side workflow improvements',
      'Integrated API-driven data flows and supported smooth user interactions',
      'Collaborated on a SaaS product with attention to usability, stability and maintainability'
    ],
    technologies: ['Vue.js', 'TypeScript', 'REST APIs', 'UI/UX', 'Responsive Design'],
    current: false
  },
  {
    id: 'trust-bank',
    company: 'Trust Bank',
    position: 'Senior Development Delegate / Web Developer',
    period: 'June 2025 - Present',
    location: 'Algeria',
    type: 'full-time',
    description: 'Development and evolution of business applications in a banking environment, with support for digitalization, application maintenance and SQL process optimization.',
    responsibilities: [
      'Contribute to the development and maintenance of internal business applications',
      'Participate in digitalization initiatives and electronic payment service improvements',
      'Analyze business needs, coordinate with stakeholders and support implementation phases',
      'Provide technical support, application maintenance and operational SQL optimization'
    ],
    technologies: ['C#', '.NET Core', 'SQL Server', 'REST APIs', 'Application Support'],
    current: true
  },
  {
    id: 'sigservice',
    company: 'SIGSERVICE',
    position: 'Frontend Developer',
    period: 'September 2024 - Present',
    location: 'Algeria',
    type: 'full-time',
    description: 'Development of web interfaces with Vue.js, TypeScript and Tailwind CSS, with focus on reusable components, API integration and responsive user experience.',
    responsibilities: [
      'Develop web interfaces using Vue.js, TypeScript and Tailwind CSS',
      'Create reusable components and progressively improve user experience',
      'Integrate REST APIs and structure client-side data management',
      'Participate in code reviews, debugging and CI/CD pipeline configuration'
    ],
    technologies: ['Vue.js', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'GitLab CI/CD'],
    current: true
  },
  {
    id: 'originova',
    company: 'Originova',
    position: 'Web Developer',
    period: 'Since 2020',
    location: 'Remote',
    type: 'remote',
    description: 'Remote and client project delivery for websites, internal tools and business applications adapted to client needs.',
    responsibilities: [
      'Designed and delivered websites, internal applications and tools adapted to client needs',
      'Developed web features with Vue.js, C#/.NET, Node.js and REST APIs depending on project scope',
      'Modeled databases, optimized queries and structured data for management applications',
      'Performed maintenance, bug fixing, API integration and user support after delivery'
    ],
    technologies: ['Vue.js', 'C#', '.NET', 'Node.js', 'SQL Server', 'REST APIs'],
    current: true
  }
]

export const skillsData: Skill[] = [
  { id: 'vue', name: 'Vue.js', icon: 'mdi-vuejs', category: 'frontend' },
  { id: 'typescript', name: 'TypeScript', icon: 'mdi-language-typescript', category: 'frontend' },
  { id: 'javascript', name: 'JavaScript', icon: 'mdi-language-javascript', category: 'frontend' },
  { id: 'html', name: 'HTML5', icon: 'mdi-language-html5', category: 'frontend' },
  { id: 'css', name: 'CSS3 / SCSS', icon: 'mdi-language-css3', category: 'frontend' },
  { id: 'responsive', name: 'Responsive Design', icon: 'mdi-responsive', category: 'uiux' },
  { id: 'uiux', name: 'UI/UX', icon: 'mdi-palette-outline', category: 'uiux' },
  { id: 'vite', name: 'Vite', icon: 'mdi-lightning-bolt', category: 'tools' },
  { id: 'vue-router', name: 'Vue Router', icon: 'mdi-routes', category: 'tools' },
  { id: 'vuetify', name: 'Vuetify', icon: 'mdi-vuetify', category: 'frontend' },
  { id: 'tailwind', name: 'Tailwind CSS', icon: 'mdi-tailwind', category: 'frontend' },
  { id: 'rest-api', name: 'REST APIs', icon: 'mdi-api', category: 'tools' },
  { id: 'git', name: 'Git', icon: 'mdi-git', category: 'tools' },
  { id: 'gitlab', name: 'GitLab CI/CD', icon: 'mdi-gitlab', category: 'tools' },
  { id: 'github', name: 'GitHub', icon: 'mdi-github', category: 'tools' },
  { id: 'csharp', name: 'C#', icon: 'mdi-language-csharp', category: 'backend' },
  { id: 'dotnet', name: '.NET Core', icon: 'mdi-microsoft', category: 'backend' },
  { id: 'sql-server', name: 'SQL Server', icon: 'mdi-database', category: 'database' },
  { id: 'oracle', name: 'Oracle PL/SQL', icon: 'mdi-database-outline', category: 'database' },
  { id: 'excel', name: 'Excel VBA', icon: 'mdi-file-excel', category: 'tools' }
]

export const projectsData: Project[] = [
  {
    id: 'mailstone-saas',
    title: 'Mailstone SaaS Website',
    role: 'Frontend contribution',
    description: 'A modern SaaS-oriented web product where I contributed to frontend interface quality, UX refinements, responsive behavior and client-side workflow improvements.',
    image: mailstoneImage,
    url: 'https://www.mailstone.io/',
    technologies: ['Vue.js', 'TypeScript', 'UI/UX', 'Responsive Design', 'REST APIs'],
    featured: true,
    category: 'professional'
  },
  {
    id: 'trust-bank-digitalization',
    title: 'Banking Business Applications',
    role: 'Web development and support',
    description: 'Internal banking application work focused on business workflows, application support, API integration and SQL process optimization.',
    image: bankingImage,
    url: '#',
    technologies: ['C#', '.NET Core', 'SQL Server', 'REST APIs'],
    featured: true,
    category: 'professional'
  },
  {
    id: 'sigservice-app',
    title: 'SIGSERVICE Web Interfaces',
    role: 'Frontend development',
    description: 'Frontend interfaces built with Vue.js and TypeScript, including reusable components, REST API integration and responsive user experience improvements.',
    image: sigserviceImage,
    url: '#',
    technologies: ['Vue.js', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'GitLab CI/CD'],
    featured: true,
    category: 'professional'
  },
  {
    id: 'houter',
    title: 'Template Houter',
    role: 'Frontend implementation',
    description: 'Modern real estate landing page with structured sections, smooth visual flow and responsive frontend implementation.',
    image: houterImage,
    url: 'https://temaplate-houter.vercel.app/',
    technologies: ['Vue.js', 'Tailwind CSS', 'Vuetify'],
    featured: true,
    category: 'personal'
  },
  {
    id: 'dream-agency',
    title: 'Dream Agency',
    role: 'Frontend website',
    description: 'Travel agency website template with clear content structure, responsive layout and clean interface patterns.',
    image: dreamAgencyImage,
    url: 'https://my-agency-template-ke5o.vercel.app/',
    technologies: ['Vue.js', 'CSS3', 'JavaScript'],
    featured: false,
    category: 'personal'
  },
  {
    id: 'antropologica',
    title: 'Antropologica',
    role: 'Web platform',
    description: 'Blog platform concept for academic content with focus on readable layouts and structured content presentation.',
    image: antropologicaImage,
    url: 'https://antropologyca.vercel.app/',
    technologies: ['Vue.js', 'REST APIs', 'Database Integration'],
    featured: false,
    category: 'personal'
  }
]

export const navigationItems: NavigationItem[] = [
  { title: 'Home', id: 'home', icon: 'mdi-home' },
  { title: 'About', id: 'about', icon: 'mdi-account' },
  { title: 'Experience', id: 'experience', icon: 'mdi-briefcase' },
  { title: 'Skills', id: 'skills', icon: 'mdi-code-tags' },
  { title: 'Projects', id: 'projects', icon: 'mdi-rocket-launch' },
  { title: 'Contact', id: 'contact', icon: 'mdi-email' }
]

export const languages = [
  { name: 'Arabic', level: 'Native', proficiency: 100 },
  { name: 'French', level: 'Advanced', proficiency: 85 },
  { name: 'English', level: 'Good working level', proficiency: 75 }
]
