const REGIONS = [
  "Dar es Salaam",
  "Arusha",
  "Mwanza",
  "Dodoma",
  "Zanzibar",
  "Mbeya",
  "Morogoro",
  "Tanga",
  "Iringa",
  "Tabora",
  "Kilimanjaro",
  "Remote"
];
const INDUSTRIES = [
  { value: "hospitality", en: "Tourism & Hospitality", sw: "Hoteli na Utalii" },
  { value: "agriculture", en: "Agriculture", sw: "Kilimo" },
  { value: "healthcare", en: "Healthcare", sw: "Afya" },
  { value: "education", en: "Education", sw: "Elimu" },
  { value: "finance", en: "Banking & Finance", sw: "Fedha na Benki" },
  { value: "telecom", en: "Telecommunications", sw: "Mawasiliano" },
  { value: "construction", en: "Construction", sw: "Ujenzi" },
  { value: "ict", en: "Technology / ICT", sw: "Teknolojia" },
  { value: "mining", en: "Mining", sw: "Madini" },
  { value: "ngo", en: "NGO & Development", sw: "Mashirika Yasiyo ya Kiserikali" },
  { value: "government", en: "Government", sw: "Serikali" },
  { value: "logistics", en: "Transport & Logistics", sw: "Usafirishaji" },
  { value: "manufacturing", en: "Manufacturing", sw: "Viwanda" }
];
const POSITION_LEVELS = [
  { value: "intern", label: "Intern" },
  { value: "graduate_trainee", label: "Graduate Trainee" },
  { value: "entry", label: "Entry Level" },
  { value: "mid", label: "Mid-Level" },
  { value: "senior", label: "Senior" },
  { value: "manager", label: "Manager" },
  { value: "director", label: "Director" },
  { value: "executive", label: "Executive" }
];
const CONTRACT_TYPES = [
  { value: "permanent", label: "Permanent" },
  { value: "contract", label: "Contract" },
  { value: "temporary", label: "Temporary" },
  { value: "freelance", label: "Freelance" },
  { value: "internship", label: "Internship" },
  { value: "volunteer", label: "Volunteer" },
  { value: "consultancy", label: "Consultancy" }
];
const QUALIFICATIONS = [
  { value: "certificate", label: "Certificate" },
  { value: "diploma", label: "Diploma" },
  { value: "bachelors", label: "Bachelor's Degree" },
  { value: "masters", label: "Master's" },
  { value: "phd", label: "PhD" },
  { value: "professional", label: "Professional Certification" }
];
const SALARY_BANDS = [
  { value: "any", label: "Any salary", min: 0, max: null },
  { value: "neg", label: "Negotiable", min: 0, max: null },
  { value: "u500", label: "Below TZS 500K", min: 0, max: 5e5 },
  { value: "500_1m", label: "TZS 500K – 1M", min: 5e5, max: 1e6 },
  { value: "1m_3m", label: "TZS 1M – 3M", min: 1e6, max: 3e6 },
  { value: "3m_5m", label: "TZS 3M – 5M", min: 3e6, max: 5e6 },
  { value: "5m_10m", label: "TZS 5M – 10M", min: 5e6, max: 1e7 },
  { value: "10m_plus", label: "Above TZS 10M", min: 1e7, max: null }
];
function industryLabel(value, lang = "en") {
  const m = INDUSTRIES.find((i) => i.value === value);
  return m ? m[lang] : value ?? "";
}
function formatSalary(min, max, currency = "TZS", negotiable) {
  if (negotiable) return "Negotiable";
  if (!min && !max) return "Not disclosed";
  const fmt = (n) => n >= 1e6 ? `${(n / 1e6).toFixed(n % 1e6 ? 1 : 0)}M` : `${Math.round(n / 1e3)}K`;
  if (min && max) return `${currency} ${fmt(min)} – ${fmt(max)}`;
  if (min) return `${currency} from ${fmt(min)}`;
  if (max) return `${currency} up to ${fmt(max)}`;
  return "";
}
function timeAgo(date) {
  const d = typeof date === "string" ? new Date(date) : date;
  const s = Math.floor((Date.now() - d.getTime()) / 1e3);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const days = Math.floor(h / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}
export {
  CONTRACT_TYPES as C,
  INDUSTRIES as I,
  POSITION_LEVELS as P,
  QUALIFICATIONS as Q,
  REGIONS as R,
  SALARY_BANDS as S,
  formatSalary as f,
  industryLabel as i,
  timeAgo as t
};
