import company1 from '@/assets/img/figma/company-1.svg'
import company2 from '@/assets/img/figma/company-2.svg'
import company3 from '@/assets/img/figma/company-3.svg'
import company4 from '@/assets/img/figma/company-4.svg'
import company5 from '@/assets/img/figma/company-5.svg'

export const categories = [
  { name: 'Agriculture', icon: 'pi-sun' },
  { name: 'Metal Production', icon: 'pi-cog' },
  { name: 'Commerce', icon: 'pi-shopping-cart' },
  { name: 'Construction', icon: 'pi-building' },
  { name: 'Hotels & Tourism', icon: 'pi-globe' },
  { name: 'Education', icon: 'pi-book' },
  { name: 'Financial Services', icon: 'pi-wallet' },
  { name: 'Transport', icon: 'pi-truck' },
]

export const jobTypes = ['Full Time', 'Part Time', 'Freelance', 'Seasonal', 'Fixed-Price']
export const experienceLevels = ['No-experience', 'Fresher', 'Intermediate', 'Expert']
export const locations = ['New-York, USA', 'Boston, USA', 'Miami, USA', 'Los Angeles, USA', 'Chicago, USA', 'Remote']

export const companies = [
  { name: 'Instagram', logo: company1, description: 'At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum.', openJobs: 8 },
  { name: 'Tesla', logo: company2, description: 'At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum.', openJobs: 18 },
  { name: 'McDonald\'s', logo: company4, description: 'At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum.', openJobs: 12 },
  { name: 'Apple', logo: company5, description: 'At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum.', openJobs: 9 },
]

const description = [
  'Nunc sed a nisl purus. Nibh dis faucibus proin lacus tristique. Sit congue non vitae odio sit erat in. Felis eu ultrices a sed massa. Commodo fringilla sed tempor risus laoreet ultricies ipsum. Habitasse morbi faucibus in iaculis lectus. Nisi enim feugiat enim volutpat. Sem quis viverra viverra odio mauris nunc.',
  'Et nunc ut tempus duis nisl sed massa. Ornare varius faucibus nisi vitae vitae cras ornare. Cras facilisis dignissim augue lorem amet adipiscing cursus fames mauris. Tortor amet porta proin in. Orci imperdiet nisi dignissim pellentesque morbi vitae. Quisque tincidunt metus lectus porta eget blandit euismod sem nunc.',
]

const responsibilities = [
  'Collaborate with cross-functional teams to define, design and ship new features.',
  'Own the delivery of projects from planning through to launch and iteration.',
  'Build strong relationships with clients and internal stakeholders.',
  'Track key metrics and report progress to leadership on a weekly basis.',
  'Identify process improvements and help implement best practices.',
  'Mentor junior team members and contribute to a positive team culture.',
]

const skills = [
  'Excellent written and verbal communication skills.',
  'Strong problem-solving ability and attention to detail.',
  'Experience working in a fast-paced, deadline-driven environment.',
  'Comfortable with modern productivity and collaboration tools.',
  'Ability to work independently as well as part of a team.',
]

const minutesAgo = (m) => new Date(Date.now() - m * 60 * 1000).toISOString()

// Dummy job data used across the app (replaces the json-server API for listing/detail pages).
const rawJobs = [
  { title: 'Forward Security Director', company: 'Bauch, Schuppe and Schulist Co', logo: company5, category: 'Hotels & Tourism', type: 'Full Time', salaryMin: 40000, salaryMax: 42000, location: 'New-York, USA', experience: 'Expert', years: '5 Years', degree: 'Master', postedMinutes: 10, tags: ['security', 'management'] },
  { title: 'Regional Creative Facilitator', company: 'Wisozk - Becker Co', logo: company2, category: 'Commerce', type: 'Part Time', salaryMin: 28000, salaryMax: 32000, location: 'Los Angeles, USA', experience: 'Intermediate', years: '3 Years', degree: 'Bachelor', postedMinutes: 12, tags: ['design', 'marketing'] },
  { title: 'Internal Integration Planner', company: 'Mraz, Quigley and Feest Inc.', logo: company1, category: 'Construction', type: 'Full Time', salaryMin: 48000, salaryMax: 50000, location: 'Chicago, USA', experience: 'Intermediate', years: '4 Years', degree: 'Bachelor', postedMinutes: 15, tags: ['construction', 'engineering'] },
  { title: 'District Intranet Director', company: 'VonRueden - Weber Co', logo: company4, category: 'Commerce', type: 'Full Time', salaryMin: 42000, salaryMax: 48000, location: 'Boston, USA', experience: 'Expert', years: '6 Years', degree: 'Master', postedMinutes: 24, tags: ['engineering', 'soft'] },
  { title: 'Corporate Tactics Facilitator', company: 'Cormier, Turner and Feeney Inc', logo: company3, category: 'Commerce', type: 'Full Time', salaryMin: 38000, salaryMax: 40000, location: 'New-York, USA', experience: 'Fresher', years: '1 Year', degree: 'Bachelor', postedMinutes: 26, tags: ['management', 'marketing'] },
  { title: 'Forward Accounts Consultant', company: 'Miller Group', logo: company2, category: 'Financial Services', type: 'Full Time', salaryMin: 45000, salaryMax: 48000, location: 'Miami, USA', experience: 'Intermediate', years: '3 Years', degree: 'Bachelor', postedMinutes: 30, tags: ['finance', 'soft'] },
  { title: 'Corporate Solutions Executive', company: 'Leffler and Sons', logo: company1, category: 'Commerce', type: 'Full Time', salaryMin: 40000, salaryMax: 42000, location: 'New-York, USA', experience: 'Expert', years: '5 Years', degree: 'Master', postedMinutes: 45, tags: ['management', 'soft'] },
  { title: 'Internal Creative Coordinator', company: 'Green Group', logo: company5, category: 'Commerce', type: 'Full Time', salaryMin: 44000, salaryMax: 46000, location: 'New-York, USA', experience: 'Intermediate', years: '2 Years', degree: 'Bachelor', postedMinutes: 60, tags: ['design', 'ui/ux'] },
  { title: 'Senior Vue Developer', company: 'NewTek Solutions', logo: company4, category: 'Telecomunications', type: 'Full Time', salaryMin: 70000, salaryMax: 80000, location: 'Boston, USA', experience: 'Expert', years: '5 Years', degree: 'Bachelor', postedMinutes: 120, tags: ['engineering', 'ui/ux'] },
  { title: 'Front-End Engineer (Vue)', company: 'Veneer Solutions', logo: company3, category: 'Telecomunications', type: 'Freelance', salaryMin: 60000, salaryMax: 70000, location: 'Remote', experience: 'Intermediate', years: '3 Years', degree: 'Bachelor', postedMinutes: 300, tags: ['engineering', 'design'] },
  { title: 'Hotel Operations Manager', company: 'Seaside Resorts', logo: company2, category: 'Hotels & Tourism', type: 'Seasonal', salaryMin: 35000, salaryMax: 39000, location: 'Miami, USA', experience: 'Intermediate', years: '4 Years', degree: 'Diploma', postedMinutes: 1500, tags: ['management', 'soft'] },
  { title: 'Online Course Instructor', company: 'Bright Academy', logo: company1, category: 'Education', type: 'Fixed-Price', salaryMin: 20000, salaryMax: 25000, location: 'Remote', experience: 'No-experience', years: '0 Years', degree: 'Bachelor', postedMinutes: 5000, tags: ['education', 'soft'] },
  { title: 'Site Construction Supervisor', company: 'BuildRight LLC', logo: company5, category: 'Construction', type: 'Full Time', salaryMin: 52000, salaryMax: 58000, location: 'Chicago, USA', experience: 'Expert', years: '7 Years', degree: 'Diploma', postedMinutes: 9000, tags: ['construction', 'management'] },
  { title: 'Junior Financial Analyst', company: 'Capital Partners', logo: company4, category: 'Financial Services', type: 'Part Time', salaryMin: 30000, salaryMax: 34000, location: 'Boston, USA', experience: 'Fresher', years: '1 Year', degree: 'Bachelor', postedMinutes: 20000, tags: ['finance', 'marketing'] },
]

export const jobs = rawJobs.map((job, index) => ({
  id: String(index + 1),
  ...job,
  salary: `$${job.salaryMin}-$${job.salaryMax}`,
  postedAt: minutesAgo(job.postedMinutes),
  description,
  responsibilities,
  skills,
}))

export const getJobById = (id) => jobs.find((job) => job.id === String(id))

export const timeAgo = (iso) => {
  const minutes = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60000))
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  const days = Math.round(hours / 24)
  return `${days} day${days > 1 ? 's' : ''} ago`
}
