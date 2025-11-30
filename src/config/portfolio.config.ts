// src/config/portfolio.config.ts
import type { Profile } from '../types/profile'
import type { Skill } from '../types/skill'
import type { Project } from '../types/project'
import type { NavigationItem } from '../types/navigation'
import type { Experience } from '../types/experience'


export const profileData: Profile = {
  name: 'Mohamed Tamagoult',
  title: 'Fullstack Developer',
  titles: [
    'Fullstack Developer',
    'Frontend Developer',
    'Backend Developer',
    '.NET Developer',
    'Vue.js Specialist'
  ],
  bio: 'Experienced Fullstack Developer with solid expertise in backend (.NET, C#) and modern frontend (Vue.js, TypeScript). Capable of designing, developing and maintaining complete applications, integrating systems, optimizing SQL databases and automating business workflows. Motivated, rigorous and solution-oriented, with excellent adaptability.',
  education: "Master's Degree in Computer Science - University of Constantine 2",
  location: 'Batna, Algeria',
  phone: '0555545161 / 0791108304',
  email: 'mohamed.tamagoult@gmail.com',
  image: '../assets/images/photo.png',

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
    id: 'trust-bank',
    company: 'Trust Bank',
    position: 'Senior Development Officer (Fullstack)',
    period: 'June 2025 - Present',
    location: 'Algeria',
    type: 'full-time',
    description: 'Fullstack development for banking digitalization projects',
    responsibilities: [
      'Fullstack development in C#/.NET with banking system integration',
      'Participation in digitalization projects for TP/TPE services',
      'Technical and functional analysis of card processing requirements',
      'Improvement of exchange flows with SATIM, NI and external partners',
      'Design and optimization of SQL Server procedures for mass processing',
      'Participation in testing, validation and production deployment',
      'Technical support and incident resolution',
      'Daily monitoring of application functionality'
    ],
    technologies: ['C#', '.NET Core', 'SQL Server', 'API REST', 'Banking Systems'],
    current: true
  },
  {
    id: 'sigservice',
    company: 'SIGSERVICE',
    position: 'Frontend Developer',
    period: 'September 2024 - juin 2025 ',
    location: 'Algeria',
    type: 'full-time',
    description: 'Development of modern and performant interfaces',
    responsibilities: [
      'Frontend development with Vue.js, TypeScript and Tailwind',
      'Reusable component creation and UI/UX optimization',
      'REST API integration and performance optimization',
      'Implementation of best practices: responsive design, clean architecture',
      'Code reviews and bug fixing',
      'CI/CD pipelines management via GitLab'
    ],
    technologies: ['Vue.js', 'TypeScript', 'Tailwind', 'REST API', 'GitLab CI/CD'],
    current: false
  },
  {
    id: 'freelance',
    company: 'Freelance',
    position: 'Fullstack Developer',
    period: '2020 - Present',
    location: 'Remote',
    type: 'freelance',
    description: 'Development of complete web solutions',
    responsibilities: [
      'Full websites (frontend + backend)',
      'Development in C#/.NET, Node.js, Vue.js',
      'Database design and optimization (SQL Server, Oracle)',
      'Workflow automation with Laserfiche Workflow',
      'API integration and deployment',
      'Technical maintenance'
    ],
    technologies: ['C#', '.NET', 'Vue.js', 'Node.js', 'SQL Server', 'Oracle', 'Laserfiche'],
    current: true
  }
]


export const skillsData: Skill[] = [
  // Backend
  { id: 'csharp', name: 'C#', icon: 'mdi-language-csharp', category: 'backend', proficiency: 90 },
  { id: 'dotnet', name: '.NET Core', icon: 'mdi-microsoft', category: 'backend', proficiency: 90 },
  { id: 'entity-framework', name: 'Entity Framework', icon: 'mdi-database', category: 'backend', proficiency: 85 },
  { id: 'api-rest', name: 'API REST', icon: 'mdi-api', category: 'backend', proficiency: 90 },

  // Frontend
  { id: 'vue', name: 'Vue.js', icon: 'mdi-vuejs', category: 'frontend', proficiency: 95 },
  { id: 'typescript', name: 'TypeScript', icon: 'mdi-language-typescript', category: 'frontend', proficiency: 90 },
  { id: 'javascript', name: 'JavaScript', icon: 'mdi-language-javascript', category: 'frontend', proficiency: 95 },
  { id: 'tailwind', name: 'Tailwind CSS', icon: 'mdi-wind-turbine', category: 'frontend', proficiency: 90 },
  { id: 'vuetify', name: 'Vuetify', icon: 'mdi-vuejs', category: 'frontend', proficiency: 85 },
  { id: 'html', name: 'HTML5', icon: 'mdi-language-html5', category: 'frontend', proficiency: 95 },
  { id: 'css', name: 'CSS3', icon: 'mdi-language-css3', category: 'frontend', proficiency: 90 },

  // Databases
  { id: 'sql-server', name: 'SQL Server', icon: 'mdi-database', category: 'backend', proficiency: 90 },
  { id: 'oracle', name: 'Oracle PL/SQL', icon: 'mdi-database', category: 'backend', proficiency: 80 },

  // DevOps & Tools
  { id: 'git', name: 'Git', icon: 'mdi-git', category: 'framework', proficiency: 90 },
  { id: 'gitlab', name: 'GitLab CI/CD', icon: 'mdi-gitlab', category: 'framework', proficiency: 85 },
  { id: 'github', name: 'GitHub', icon: 'mdi-github', category: 'framework', proficiency: 90 },

  // Other
  { id: 'laserfiche', name: 'Laserfiche Workflow', icon: 'mdi-cog-sync', category: 'framework', proficiency: 75 },
  { id: 'excel', name: 'Excel VBA', icon: 'mdi-file-excel', category: 'framework', proficiency: 85 }
]


export const projectsData: Project[] = [
  {
    id: 'trust-bank-digitalization',
    title: 'Banking Digitalization Platform',
    description: 'Fullstack development of banking services digitalization platform.',
    image: '../assets/images/banking.png',
    url: '#',
    technologies: ['C#', '.NET Core', 'SQL Server', 'API REST', 'Banking Integration'],
    featured: true,
    category: 'professional'
  },
  {
    id: 'sigservice-app',
    title: 'SIGSERVICE Web Application',
    description: 'Modern web application with Vue.js and TypeScript.',
    image: '../assets/images/sigservice.png',
    url: '#',
    technologies: ['Vue.js', 'TypeScript', 'Tailwind', 'REST API', 'GitLab CI/CD'],
    featured: true,
    category: 'professional'
  },
  {
    id: 'houter',
    title: 'Template Houter',
    description: 'Modern real estate website with smooth animations.',
    image: '../assets/images/one.png',
    url: 'https://temaplate-houter.vercel.app/',
    technologies: ['Vue.js', 'Tailwind CSS', 'Vuetify'],
    featured: true,
    category: 'personal'
  },
  {
    id: 'dream-agency',
    title: 'Dream Agency',
    description: 'Travel agency website with booking features.',
    image: '/assets/images/recentWork.png',
    url: 'https://my-agency-template-ke5o.vercel.app/',
    technologies: ['Vue.js', 'CSS3', 'JavaScript'],
    featured: false,
    category: 'personal'
  },
  {
    id: 'antropologica',
    title: 'Antropologica',
    description: 'Blog platform for PhD students.',
    image: '../assets/images/blog.png',
    url: 'https://antropologyca.vercel.app/',
    technologies: ['Vue.js', 'REST API', 'Database Integration'],
    featured: false,
    category: 'personal'
  }
]

/* ---------------------------------------------------
   NAVIGATION
--------------------------------------------------- */
export const navigationItems: NavigationItem[] = [
  { title: 'Home', id: 'home', icon: 'mdi-home' },
  { title: 'About', id: 'about', icon: 'mdi-account' },
  { title: 'Experience', id: 'experience', icon: 'mdi-briefcase' },
  { title: 'Skills', id: 'skills', icon: 'mdi-code-tags' },
  { title: 'Projects', id: 'projects', icon: 'mdi-rocket-launch' },
  { title: 'Contact', id: 'contact', icon: 'mdi-email' }
]

/* ---------------------------------------------------
   LANGUAGES
--------------------------------------------------- */
export const languages = [
  { name: 'Arabic', level: 'Native', proficiency: 100 },
  { name: 'French', level: 'Advanced', proficiency: 85 },
  { name: 'English', level: 'Good', proficiency: 75 }
]
