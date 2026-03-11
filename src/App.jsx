import { useState, useEffect, useRef } from "react";

// ─── DESIGN SYSTEM ───────────────────────────────────────────────────────────
const DS = {
  colors: {
    primary: "#0A2E52",
    primaryMid: "#1A4F7A",
    primaryLight: "#2E7BAE",
    accent: "#E8702A",
    accentLight: "#FF8C42",
    teal: "#007B8A",
    tealLight: "#00A8BC",
    success: "#1E7E44",
    successLight: "#E6F4EA",
    warning: "#C8830A",
    warningLight: "#FFF8E6",
    danger: "#C0392B",
    dangerLight: "#FDECEA",
    bg: "#F0F4F8",
    card: "#FFFFFF",
    border: "#D8E3ED",
    text: "#0D1B2A",
    textSub: "#4A6174",
    textMuted: "#8A9BAE",
    white: "#FFFFFF",
    navyGrad1: "#071E38",
    navyGrad2: "#0A2E52",
    gold: "#D4A017",
    goldLight: "#FFF3CC",
    purple: "#5E35B1",
    purpleLight: "#EDE7F6",
  },
  radius: { sm: 8, md: 12, lg: 16, xl: 24, full: 999 },
  shadow: {
    sm: "0 2px 8px rgba(10,46,82,0.08)",
    md: "0 4px 16px rgba(10,46,82,0.12)",
    lg: "0 8px 32px rgba(10,46,82,0.16)",
    xl: "0 16px 48px rgba(10,46,82,0.2)",
  },
};

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const HOSPITALS = [
  { id: 1, name: "Apollo Hospitals", city: "Chennai", nabh: "NABH Gold", score: 4.8, specialties: ["Cardiology", "Oncology", "Neurology"], international: true, beds: 560, img: "🏥", accExpiry: "2026-08", procedures: 12400, languages: ["English", "Arabic", "Russian"] },
  { id: 2, name: "Fortis Healthcare", city: "Gurugram", nabh: "NABH Silver", score: 4.6, specialties: ["Orthopedics", "Cardiac Surgery", "Urology"], international: true, beds: 340, img: "🏥", accExpiry: "2025-11", procedures: 9800, languages: ["English", "French", "Bengali"] },
  { id: 3, name: "Medanta - The Medicity", city: "Gurugram", nabh: "NABH Gold", score: 4.9, specialties: ["Liver Transplant", "Cardiac", "Kidney Transplant"], international: true, beds: 1250, img: "🏥", accExpiry: "2027-03", procedures: 18200, languages: ["English", "Arabic", "Hindi"] },
  { id: 4, name: "AIIMS Delhi", city: "New Delhi", nabh: "NABH Gold", score: 4.7, specialties: ["Neurosurgery", "Pediatrics", "AYUSH"], international: false, beds: 2478, img: "🏥", accExpiry: "2026-12", procedures: 22000, languages: ["English", "Hindi"] },
  { id: 5, name: "Kokilaben Dhirubhai Ambani", city: "Mumbai", nabh: "NABH Gold", score: 4.8, specialties: ["Oncology", "Robotic Surgery", "BMT"], international: true, beds: 750, img: "🏥", accExpiry: "2026-09", procedures: 15600, languages: ["English", "Arabic", "Gujarati"] },
];

const MVTFS = [
  { id: 1, name: "IndiaHealth Connect", city: "New Delhi", certNo: "NABH-MVTF-2341", score: 4.7, languages: ["English", "Arabic", "Russian"], specialization: ["Cardiac", "Oncology"], since: 2015, cases: 3400 },
  { id: 2, name: "MedJourney India", city: "Chennai", certNo: "NABH-MVTF-1892", score: 4.5, languages: ["English", "French", "Tamil"], specialization: ["Orthopedics", "Transplant"], since: 2017, cases: 2100 },
  { id: 3, name: "Wellness Bridge", city: "Mumbai", certNo: "NABH-MVTF-2890", score: 4.9, languages: ["English", "Arabic", "Urdu"], specialization: ["AYUSH", "Wellness", "Cardiac"], since: 2012, cases: 5600 },
  { id: 4, name: "CureIndia Partners", city: "Bengaluru", certNo: "NABH-MVTF-3110", score: 4.6, languages: ["English", "Sinhala", "Bangla"], specialization: ["Fertility", "Neurology"], since: 2019, cases: 1200 },
];

const OVERSEAS = [
  { id: 1, name: "Gulf Med Partners", country: "UAE", type: "Overseas MVTF", languages: ["Arabic", "English"], patients: 890, verified: true },
  { id: 2, name: "AfroHealth Tourism", country: "Nigeria", type: "Travel Agent", languages: ["English", "Yoruba"], patients: 340, verified: true },
  { id: 3, name: "Dr. Rajan Mehta (Referring)", country: "Canada", type: "Referring Doctor", languages: ["English", "Hindi"], patients: 120, verified: true },
  { id: 4, name: "SriLanka Med Tours", country: "Sri Lanka", type: "Travel Agent", languages: ["English", "Sinhala"], patients: 560, verified: true },
];

const ACCOMMODATION = [
  { id: 1, name: "Medstay Suites", city: "Chennai", type: "Serviced Apartment", nearHospital: "Apollo Hospitals", distance: "0.3 km", amenities: ["Wheelchair Access", "Diet Support", "Attendant Room"], rating: 4.6, priceRange: "₹3,500–₹6,000/night" },
  { id: 2, name: "Recovery Haven", city: "Gurugram", type: "Recovery Home", nearHospital: "Medanta", distance: "0.8 km", amenities: ["24hr Nursing", "Diet Kitchen", "Transport"], rating: 4.8, priceRange: "₹5,000–₹9,000/night" },
  { id: 3, name: "Healing Residency", city: "Mumbai", type: "Hotel", nearHospital: "Kokilaben", distance: "1.2 km", amenities: ["Wheelchair Access", "Interpreter", "Halal Food"], rating: 4.4, priceRange: "₹4,500–₹7,500/night" },
];

const ALLIED = [
  { id: 1, name: "FX India Healthcare", category: "Forex", services: ["Currency Exchange", "Wire Transfer", "Travel Cards"], rating: 4.5 },
  { id: 2, name: "Global Health Insure", category: "Insurance", services: ["Medical Travel Insurance", "Emergency Cover", "Repatriation"], rating: 4.7 },
  { id: 3, name: "MedTranslate Pro", category: "Translator", languages: ["Arabic", "Russian", "French", "Sinhala"], rating: 4.9 },
  { id: 4, name: "Atharva Wellness", category: "AYUSH", services: ["Ayurveda", "Yoga Therapy", "Panchakarma"], rating: 4.8 },
  { id: 5, name: "Recovery Wellness Spa", category: "Wellness", services: ["Post-op Rehab", "Physiotherapy", "Meditation"], rating: 4.6 },
];

const GRIEVANCES = [
  { id: "GRV-2024-0891", raised: "2024-11-12", against: "Fortis Healthcare", status: "Resolved", summary: "Miscommunication on treatment cost estimate", resolution: "Cost sheet corrected and re-issued" },
  { id: "GRV-2024-0674", raised: "2024-10-03", against: "IndiaHealth Connect", status: "In Progress", summary: "Delayed visa support documentation" },
  { id: "GRV-2024-1024", raised: "2024-12-01", against: "Recovery Haven", status: "Under Review", summary: "Accommodation standards not as described" },
];

const ONBOARDING_QUEUE = [
  { id: "APP-2024-0441", name: "MedLink Arabia", type: "Overseas Partner", country: "Saudi Arabia", applied: "2024-12-05", status: "Pending" },
  { id: "APP-2024-0442", name: "Nairobi Health Tours", type: "Overseas Partner", country: "Kenya", applied: "2024-12-06", status: "Pending" },
  { id: "APP-2024-0443", name: "HealthBridge India", type: "Indian MVTF", city: "Pune", applied: "2024-12-07", status: "Under Review" },
  { id: "APP-2024-0444", name: "Lotus Multispecialty Hospital", type: "Hospital", city: "Jaipur", applied: "2024-12-08", status: "Pending" },
];

// ─── ICONS (SVG inline) ───────────────────────────────────────────────────────
const Icon = ({ name, size = 20, color = "currentColor" }) => {
  const icons = {
    home: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    hospital: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,
    users: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    globe: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    bed: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>,
    alert: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    star: <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    starEmpty: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    filter: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
    chevronRight: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
    chevronLeft: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    phone: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8 10.46a16 16 0 0 0 6 6l1.27-.84a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    mail: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    admin: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    x: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    mapPin: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    award: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
    chat: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    clipboard: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>,
    arrowRight: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    trendUp: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    settings: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    eye: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    bell: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    leaf: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>,
    logout: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  };
  return icons[name] || null;
};

// ─── STAR RATING ─────────────────────────────────────────────────────────────
const StarRating = ({ score, size = 12 }) => (
  <span style={{ display: "flex", gap: 1 }}>
    {[1,2,3,4,5].map(i => (
      <Icon key={i} name={i <= Math.round(score) ? "star" : "starEmpty"} size={size} color={i <= Math.round(score) ? DS.colors.gold : DS.colors.border} />
    ))}
  </span>
);

// ─── NABH BADGE ──────────────────────────────────────────────────────────────
const NabhBadge = ({ tier }) => {
  const c = tier === "NABH Gold" ? { bg: "#FFF8E6", text: "#C8830A", dot: "#D4A017" } :
            tier === "NABH Silver" ? { bg: "#F0F4F8", text: "#4A6174", dot: "#8A9BAE" } :
            { bg: "#E6F4EA", text: "#1E7E44", dot: "#1E7E44" };
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:4, padding:"3px 8px", borderRadius:DS.radius.full, background:c.bg, fontSize:10, fontWeight:700, color:c.text }}>
      <span style={{ width:6, height:6, borderRadius:"50%", background:c.dot }} />
      {tier}
    </span>
  );
};

// ─── STATUS BADGE ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const styles = {
    "Resolved": { bg: DS.colors.successLight, text: DS.colors.success },
    "In Progress": { bg: DS.colors.warningLight, text: DS.colors.warning },
    "Under Review": { bg: DS.colors.purpleLight, text: DS.colors.purple },
    "Pending": { bg: "#E3F2FD", text: "#1565C0" },
    "Approved": { bg: DS.colors.successLight, text: DS.colors.success },
  };
  const s = styles[status] || { bg: DS.colors.bg, text: DS.colors.textSub };
  return (
    <span style={{ padding:"3px 9px", borderRadius:DS.radius.full, background:s.bg, color:s.text, fontSize:10, fontWeight:700 }}>
      {status}
    </span>
  );
};

// ─── CARD ────────────────────────────────────────────────────────────────────
const Card = ({ children, style = {}, onClick }) => (
  <div onClick={onClick} style={{
    background: DS.colors.card, borderRadius: DS.radius.lg,
    boxShadow: DS.shadow.sm, padding: 16, marginBottom: 12,
    border: `1px solid ${DS.colors.border}`,
    cursor: onClick ? "pointer" : "default",
    transition: "all 0.15s ease",
    ...style,
  }}
  onMouseEnter={e => { if (onClick) { e.currentTarget.style.boxShadow = DS.shadow.md; e.currentTarget.style.transform = "translateY(-1px)"; }}}
  onMouseLeave={e => { e.currentTarget.style.boxShadow = DS.shadow.sm; e.currentTarget.style.transform = "none"; }}
  >{children}</div>
);

// ─── BOTTOM NAV ──────────────────────────────────────────────────────────────
const BottomNav = ({ active, onNavigate, role }) => {
  const adminNav = [
    { id: "home", icon: "home", label: "Dashboard" },
    { id: "onboarding", icon: "clipboard", label: "Onboarding" },
    { id: "grievances", icon: "alert", label: "Grievances" },
    { id: "analytics", icon: "trendUp", label: "Analytics" },
    { id: "profile", icon: "settings", label: "Settings" },
  ];
  const userNav = [
    { id: "home", icon: "home", label: "Home" },
    { id: "hospitals", icon: "hospital", label: "Hospitals" },
    { id: "directory", icon: "users", label: "Directory" },
    { id: "grievances", icon: "alert", label: "SoS" },
    { id: "profile", icon: "settings", label: "Profile" },
  ];
  const items = role === "admin" ? adminNav : userNav;
  return (
    <div style={{
      position:"absolute", bottom:0, left:0, right:0,
      background:DS.colors.card,
      borderTop:`1px solid ${DS.colors.border}`,
      display:"flex", boxShadow:"0 -4px 20px rgba(10,46,82,0.08)",
      zIndex:50,
    }}>
      {items.map(item => (
        <button key={item.id} onClick={() => onNavigate(item.id)} style={{
          flex:1, display:"flex", flexDirection:"column", alignItems:"center",
          gap:3, padding:"10px 4px", border:"none", background:"transparent",
          cursor:"pointer",
          color: active === item.id ? DS.colors.accent : DS.colors.textMuted,
          transition:"color 0.15s",
        }}>
          <div style={{ position:"relative" }}>
            <Icon name={item.icon} size={22} color={active === item.id ? DS.colors.accent : DS.colors.textMuted} />
            {active === item.id && <div style={{ position:"absolute", bottom:-8, left:"50%", transform:"translateX(-50%)", width:4, height:4, borderRadius:"50%", background:DS.colors.accent }} />}
          </div>
          <span style={{ fontSize:10, fontWeight:active===item.id?700:500 }}>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

// ─── SEARCH BAR ──────────────────────────────────────────────────────────────
const SearchBar = ({ placeholder, value, onChange }) => (
  <div style={{ position:"relative", marginBottom:12 }}>
    <div style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)" }}>
      <Icon name="search" size={16} color={DS.colors.textMuted} />
    </div>
    <input
      value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder || "Search..."}
      style={{
        width:"100%", padding:"10px 12px 10px 38px",
        borderRadius:DS.radius.md, border:`1.5px solid ${DS.colors.border}`,
        background:DS.colors.card, fontSize:14, color:DS.colors.text,
        outline:"none", boxSizing:"border-box",
        fontFamily:"inherit",
      }}
    />
  </div>
);

// ─── SECTION HEADER ──────────────────────────────────────────────────────────
const SectionHeader = ({ title, sub, action, onAction }) => (
  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
    <div>
      <div style={{ fontSize:18, fontWeight:800, color:DS.colors.text, letterSpacing:"-0.3px" }}>{title}</div>
      {sub && <div style={{ fontSize:12, color:DS.colors.textMuted, marginTop:2 }}>{sub}</div>}
    </div>
    {action && <button onClick={onAction} style={{ fontSize:12, color:DS.colors.accent, fontWeight:700, border:"none", background:"none", cursor:"pointer", padding:"4px 8px" }}>{action}</button>}
  </div>
);

// ─── STAT CARD ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, icon, color, sub }) => (
  <div style={{ flex:"1 1 calc(50% - 6px)", background:DS.colors.card, borderRadius:DS.radius.md, padding:"14px 12px", border:`1px solid ${DS.colors.border}`, boxShadow:DS.shadow.sm }}>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
      <div>
        <div style={{ fontSize:22, fontWeight:800, color:DS.colors.text }}>{value}</div>
        <div style={{ fontSize:11, color:DS.colors.textMuted, marginTop:2 }}>{label}</div>
        {sub && <div style={{ fontSize:10, color:color||DS.colors.success, marginTop:3, fontWeight:600 }}>{sub}</div>}
      </div>
      <div style={{ width:36, height:36, borderRadius:DS.radius.md, background:color?`${color}18`:`${DS.colors.teal}18`, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <Icon name={icon} size={18} color={color||DS.colors.teal} />
      </div>
    </div>
  </div>
);

// ════════════════════════════════════════════════════════════════════════════
// SCREENS
// ════════════════════════════════════════════════════════════════════════════

// ─── SPLASH / LOGIN ──────────────────────────────────────────────────────────
const SplashScreen = ({ onNext }) => {
  const [step, setStep] = useState("splash");
  const [role, setRole] = useState("");
  const [otp, setOtp] = useState("");
  const [cred, setCred] = useState({ user: "", pass: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const roles = [
    { id: "overseas", label: "Overseas Partner", icon: "globe", sub: "Travel agents, overseas MVTFs, referring doctors", color: DS.colors.tealLight },
    { id: "mvtf", label: "Indian MVTF", icon: "users", sub: "NABH-certified Indian facilitators", color: DS.colors.primaryLight },
    { id: "hospital", label: "Hospital", icon: "hospital", sub: "NABH-accredited hospitals", color: DS.colors.success },
    { id: "admin", label: "QCI / NABH Admin", icon: "admin", sub: "Platform governance & oversight", color: DS.colors.accent },
  ];

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onNext(role || "overseas"); }, 1200);
  };

  const handleSendOtp = () => { setOtpSent(true); };

  if (step === "splash") return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", background:`linear-gradient(160deg, ${DS.colors.navyGrad1} 0%, ${DS.colors.navyGrad2} 50%, ${DS.colors.primaryMid} 100%)`, position:"relative", overflow:"hidden" }}>
      {/* decorative circles */}
      <div style={{ position:"absolute", top:-80, right:-80, width:260, height:260, borderRadius:"50%", border:`1px solid rgba(255,255,255,0.06)` }} />
      <div style={{ position:"absolute", top:-40, right:-40, width:160, height:160, borderRadius:"50%", border:`1px solid rgba(255,255,255,0.08)` }} />
      <div style={{ position:"absolute", bottom:120, left:-60, width:200, height:200, borderRadius:"50%", border:`1px solid rgba(255,255,255,0.05)` }} />

      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:32 }}>
        <div style={{ width:80, height:80, borderRadius:DS.radius.xl, background:"rgba(255,255,255,0.12)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:24, backdropFilter:"blur(10px)", border:"1px solid rgba(255,255,255,0.2)" }}>
          <span style={{ fontSize:36 }}>🏥</span>
        </div>
        <div style={{ fontSize:28, fontWeight:900, color:DS.colors.white, textAlign:"center", letterSpacing:"-0.5px", marginBottom:8 }}>Bharat Health Connect</div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.6)", textAlign:"center", lineHeight:1.5, marginBottom:6 }}>India's Medical Value Tourism</div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.6)", textAlign:"center", lineHeight:1.5 }}>Digital Access Platform</div>
        <div style={{ marginTop:16, padding:"6px 14px", background:"rgba(232,112,42,0.2)", borderRadius:DS.radius.full, border:"1px solid rgba(232,112,42,0.4)" }}>
          <span style={{ fontSize:11, color:DS.colors.accentLight, fontWeight:700, letterSpacing:1 }}>GOVERNED BY QCI • NABH VERIFIED</span>
        </div>
      </div>

      <div style={{ padding:"0 24px 48px" }}>
        <button onClick={() => setStep("selectRole")} style={{ width:"100%", padding:"15px", borderRadius:DS.radius.lg, background:DS.colors.accent, color:DS.colors.white, fontSize:16, fontWeight:800, border:"none", cursor:"pointer", letterSpacing:"0.3px", boxShadow:`0 4px 20px rgba(232,112,42,0.4)` }}>
          Get Started
        </button>
        <div style={{ textAlign:"center", marginTop:14 }}>
          <span onClick={() => setStep("login")} style={{ fontSize:13, color:"rgba(255,255,255,0.5)", cursor:"pointer" }}>Already registered? <span style={{ color:DS.colors.accentLight, fontWeight:700 }}>Sign In</span></span>
        </div>
      </div>
    </div>
  );

  if (step === "selectRole") return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", background:DS.colors.bg }}>
      <div style={{ padding:"24px 20px 16px", background:`linear-gradient(135deg, ${DS.colors.primary} 0%, ${DS.colors.primaryMid} 100%)` }}>
        <button onClick={() => setStep("splash")} style={{ background:"none", border:"none", padding:0, cursor:"pointer", marginBottom:16 }}>
          <Icon name="chevronLeft" size={22} color="rgba(255,255,255,0.8)" />
        </button>
        <div style={{ fontSize:22, fontWeight:800, color:DS.colors.white }}>Select Your Role</div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.6)", marginTop:4 }}>Your credentials will be verified against the NABH registry</div>
      </div>
      <div style={{ flex:1, overflow:"auto", padding:"20px 16px" }}>
        {roles.map(r => (
          <div key={r.id} onClick={() => { setRole(r.id); setStep("login"); }} style={{
            background:DS.colors.card, borderRadius:DS.radius.lg, padding:"16px", marginBottom:12,
            border: role===r.id ? `2px solid ${DS.colors.accent}` : `1.5px solid ${DS.colors.border}`,
            cursor:"pointer", display:"flex", alignItems:"center", gap:14,
            boxShadow: DS.shadow.sm,
          }}>
            <div style={{ width:48, height:48, borderRadius:DS.radius.md, background:`${r.color}22`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <Icon name={r.icon} size={22} color={r.color} />
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:15, fontWeight:700, color:DS.colors.text }}>{r.label}</div>
              <div style={{ fontSize:12, color:DS.colors.textMuted, marginTop:2 }}>{r.sub}</div>
            </div>
            <Icon name="chevronRight" size={18} color={DS.colors.textMuted} />
          </div>
        ))}
        <div style={{ marginTop:8, padding:"14px 16px", borderRadius:DS.radius.md, background:DS.colors.goldLight, border:`1px solid ${DS.colors.gold}44` }}>
          <div style={{ fontSize:12, color:DS.colors.warning, fontWeight:600, marginBottom:4 }}>📋 Not yet registered?</div>
          <div style={{ fontSize:11, color:DS.colors.textSub }}>Visit the NABH portal to initiate your accreditation and registration process before signing in.</div>
        </div>
      </div>
    </div>
  );

  if (step === "login") return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", background:DS.colors.bg }}>
      <div style={{ padding:"24px 20px 20px", background:`linear-gradient(135deg, ${DS.colors.primary} 0%, ${DS.colors.primaryMid} 100%)` }}>
        <button onClick={() => setStep("selectRole")} style={{ background:"none", border:"none", padding:0, cursor:"pointer", marginBottom:16 }}>
          <Icon name="chevronLeft" size={22} color="rgba(255,255,255,0.8)" />
        </button>
        <div style={{ fontSize:22, fontWeight:800, color:DS.colors.white }}>Welcome Back</div>
        <div style={{ fontSize:13, color:"rgba(255,255,255,0.6)", marginTop:4 }}>Sign in with your NABH-issued credentials</div>
      </div>
      <div style={{ flex:1, padding:"24px 20px", overflow:"auto" }}>
        <div style={{ marginBottom:16 }}>
          <label style={{ fontSize:12, fontWeight:600, color:DS.colors.textSub, display:"block", marginBottom:6 }}>NABH Username / ID</label>
          <input value={cred.user} onChange={e => setCred({...cred, user:e.target.value})} placeholder="e.g. NABH-2341-OVS" style={{ width:"100%", padding:"12px 14px", borderRadius:DS.radius.md, border:`1.5px solid ${DS.colors.border}`, background:DS.colors.card, fontSize:14, color:DS.colors.text, outline:"none", boxSizing:"border-box", fontFamily:"inherit" }} />
        </div>
        <div style={{ marginBottom:20 }}>
          <label style={{ fontSize:12, fontWeight:600, color:DS.colors.textSub, display:"block", marginBottom:6 }}>Password</label>
          <input type="password" value={cred.pass} onChange={e => setCred({...cred, pass:e.target.value})} placeholder="Enter your password" style={{ width:"100%", padding:"12px 14px", borderRadius:DS.radius.md, border:`1.5px solid ${DS.colors.border}`, background:DS.colors.card, fontSize:14, color:DS.colors.text, outline:"none", boxSizing:"border-box", fontFamily:"inherit" }} />
        </div>

        {!otpSent ? (
          <button onClick={handleSendOtp} style={{ width:"100%", padding:"12px", borderRadius:DS.radius.md, background:DS.colors.bg, color:DS.colors.primary, fontSize:14, fontWeight:700, border:`1.5px solid ${DS.colors.border}`, cursor:"pointer", marginBottom:12 }}>
            Send OTP Verification
          </button>
        ) : (
          <div style={{ marginBottom:16 }}>
            <label style={{ fontSize:12, fontWeight:600, color:DS.colors.textSub, display:"block", marginBottom:6 }}>OTP (sent to registered mobile)</label>
            <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter 6-digit OTP" maxLength={6} style={{ width:"100%", padding:"12px 14px", borderRadius:DS.radius.md, border:`1.5px solid ${DS.colors.accent}`, background:DS.colors.card, fontSize:16, letterSpacing:8, textAlign:"center", color:DS.colors.text, outline:"none", boxSizing:"border-box", fontFamily:"inherit" }} />
            <div style={{ fontSize:11, color:DS.colors.textMuted, marginTop:6, textAlign:"center" }}>✓ OTP sent to +91 ••••••7834</div>
          </div>
        )}

        <button onClick={handleLogin} disabled={loading} style={{ width:"100%", padding:"14px", borderRadius:DS.radius.lg, background: loading ? DS.colors.textMuted : DS.colors.accent, color:DS.colors.white, fontSize:15, fontWeight:800, border:"none", cursor: loading ? "default":"pointer", boxShadow:`0 4px 16px rgba(232,112,42,0.35)` }}>
          {loading ? "Verifying..." : "Sign In"}
        </button>

        <div style={{ marginTop:20, padding:"14px", borderRadius:DS.radius.md, background:DS.colors.tealLight, border:`1px solid ${DS.colors.teal}33` }}>
          <div style={{ fontSize:11, color:DS.colors.teal, fontWeight:700, marginBottom:3 }}>Demo Mode</div>
          <div style={{ fontSize:11, color:DS.colors.textSub }}>Click Sign In to explore as <strong>{role || "Overseas Partner"}</strong>. All data shown is illustrative.</div>
        </div>
      </div>
    </div>
  );
  return null;
};

// ─── HOME SCREEN ─────────────────────────────────────────────────────────────
const HomeScreen = ({ role, onNavigate }) => {
  const profiles = {
    overseas: { name: "Gulf Med Partners", country: "UAE", greeting: "Good morning", nabh: "NABH Assured Partner" },
    mvtf: { name: "Wellness Bridge", city: "Mumbai", greeting: "Good morning", nabh: "NABH Certified MVTF" },
    hospital: { name: "Apollo Hospitals", city: "Chennai", greeting: "Good morning", nabh: "NABH Gold" },
    admin: { name: "QCI Admin", unit: "MVT Secretariat", greeting: "Good morning", nabh: "Platform Administrator" },
  };
  const p = profiles[role] || profiles.overseas;

  const quickActions = role === "admin" ? [
    { id:"onboarding", icon:"clipboard", label:"Onboarding\nQueue", count:4, color:DS.colors.accent },
    { id:"grievances", icon:"alert", label:"Grievance\nQueue", count:3, color:DS.colors.danger },
    { id:"analytics", icon:"trendUp", label:"Analytics\nDashboard", color:DS.colors.teal },
    { id:"hospitals", icon:"hospital", label:"Hospital\nDirectory", color:DS.colors.success },
  ] : role === "hospital" ? [
    { id:"hospitals", icon:"hospital", label:"My Profile", color:DS.colors.primaryLight },
    { id:"directory", icon:"users", label:"Find Partners", color:DS.colors.teal },
    { id:"grievances", icon:"alert", label:"Raise SoS", count:1, color:DS.colors.danger },
    { id:"allied", icon:"leaf", label:"Allied\nServices", color:DS.colors.success },
  ] : [
    { id:"hospitals", icon:"hospital", label:"Find\nHospitals", color:DS.colors.primaryLight },
    { id:"directory", icon:"users", label:"Find\nMVTFs", color:DS.colors.teal },
    { id:"accommodation", icon:"bed", label:"Accommodation", color:DS.colors.success },
    { id:"grievances", icon:"alert", label:"Raise SoS", color:DS.colors.danger },
  ];

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", background:DS.colors.bg, overflow:"hidden" }}>
      {/* Header */}
      <div style={{ background:`linear-gradient(135deg, ${DS.colors.primary} 0%, ${DS.colors.primaryMid} 100%)`, padding:"20px 20px 28px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-30, right:-30, width:120, height:120, borderRadius:"50%", background:"rgba(255,255,255,0.04)" }} />
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.55)", marginBottom:4 }}>{p.greeting} 👋</div>
            <div style={{ fontSize:18, fontWeight:800, color:DS.colors.white }}>{p.name}</div>
            <div style={{ marginTop:6, display:"flex", gap:6, alignItems:"center" }}>
              <div style={{ width:6, height:6, borderRadius:"50%", background:"#4CAF50" }} />
              <span style={{ fontSize:11, color:"rgba(255,255,255,0.6)" }}>{p.nabh}</span>
            </div>
          </div>
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            <button onClick={() => onNavigate("profile")} style={{ width:38, height:38, borderRadius:"50%", background:"rgba(255,255,255,0.12)", border:"1.5px solid rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
              <Icon name="bell" size={18} color="rgba(255,255,255,0.9)" />
            </button>
            <div style={{ width:40, height:40, borderRadius:"50%", background:"rgba(232,112,42,0.3)", border:"2px solid rgba(232,112,42,0.6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>
              {role==="admin" ? "👤" : role==="hospital" ? "🏥" : role==="mvtf" ? "🤝" : "🌍"}
            </div>
          </div>
        </div>
      </div>

      <div style={{ flex:1, overflow:"auto", padding:"0 16px 80px" }}>
        {/* Trust Score card */}
        <div style={{ background:`linear-gradient(135deg, ${DS.colors.accent} 0%, #c85a1a 100%)`, borderRadius:DS.radius.lg, padding:"16px 20px", marginTop:-14, marginBottom:16, boxShadow:`0 4px 20px rgba(232,112,42,0.35)` }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.7)", marginBottom:4 }}>QCI TRUST SCORE</div>
              <div style={{ display:"flex", alignItems:"baseline", gap:6 }}>
                <span style={{ fontSize:34, fontWeight:900, color:DS.colors.white }}>4.8</span>
                <span style={{ fontSize:13, color:"rgba(255,255,255,0.7)" }}>/ 5.0</span>
              </div>
              <StarRating score={4.8} size={14} />
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ width:64, height:64, borderRadius:"50%", background:"rgba(255,255,255,0.15)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", border:"2px solid rgba(255,255,255,0.3)" }}>
                <Icon name="award" size={28} color={DS.colors.white} />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <SectionHeader title="Quick Access" />
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:20 }}>
          {quickActions.map(a => (
            <button key={a.id} onClick={() => onNavigate(a.id)} style={{
              background:DS.colors.card, borderRadius:DS.radius.lg, padding:"16px 14px", border:`1.5px solid ${DS.colors.border}`,
              cursor:"pointer", textAlign:"left", position:"relative", boxShadow:DS.shadow.sm,
            }}>
              <div style={{ width:40, height:40, borderRadius:DS.radius.md, background:`${a.color}18`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:10 }}>
                <Icon name={a.icon} size={20} color={a.color} />
              </div>
              <div style={{ fontSize:13, fontWeight:700, color:DS.colors.text, whiteSpace:"pre-line", lineHeight:1.3 }}>{a.label}</div>
              {a.count && <div style={{ position:"absolute", top:10, right:10, width:18, height:18, borderRadius:"50%", background:a.color, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontSize:10, fontWeight:800, color:DS.colors.white }}>{a.count}</span>
              </div>}
            </button>
          ))}
        </div>

        {/* Stats Row */}
        {role !== "admin" && <>
          <SectionHeader title="Your Network" />
          <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:20 }}>
            <StatCard label="Verified Hospitals" value="2,847" icon="hospital" color={DS.colors.teal} sub="↑ 124 this month" />
            <StatCard label="Active Partners" value="1,293" icon="users" color={DS.colors.primaryLight} sub="↑ 56 this month" />
            <StatCard label="Your Connections" value={role==="overseas"?"34":role==="mvtf"?"67":"28"} icon="globe" color={DS.colors.success} />
            <StatCard label="Open Tickets" value="2" icon="alert" color={DS.colors.warning} sub="SoS Active" />
          </div>
        </>}

        {role === "admin" && <>
          <SectionHeader title="Platform Overview" />
          <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:20 }}>
            <StatCard label="Total Stakeholders" value="4,847" icon="users" color={DS.colors.teal} sub="↑ 234 this month" />
            <StatCard label="NABH Hospitals" value="2,847" icon="hospital" color={DS.colors.primaryLight} />
            <StatCard label="Open Grievances" value="12" icon="alert" color={DS.colors.danger} sub="3 critical" />
            <StatCard label="Pending Approvals" value="4" icon="clipboard" color={DS.colors.warning} />
          </div>
        </>}

        {/* Featured Hospitals */}
        {role !== "admin" && <>
          <SectionHeader title="Top Rated Hospitals" action="View All" onAction={() => onNavigate("hospitals")} />
          {HOSPITALS.slice(0,2).map(h => (
            <Card key={h.id} onClick={() => onNavigate("hospitals")}>
              <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                <div style={{ width:48, height:48, borderRadius:DS.radius.md, background:DS.colors.tealLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>🏥</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:4 }}>
                    <div style={{ fontSize:14, fontWeight:700, color:DS.colors.text }}>{h.name}</div>
                    <NabhBadge tier={h.nabh} />
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:4, marginTop:4 }}>
                    <Icon name="mapPin" size={12} color={DS.colors.textMuted} />
                    <span style={{ fontSize:12, color:DS.colors.textMuted }}>{h.city}</span>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:6 }}>
                    <StarRating score={h.score} size={11} />
                    <span style={{ fontSize:11, fontWeight:700, color:DS.colors.text }}>{h.score}</span>
                  </div>
                  <div style={{ display:"flex", gap:4, marginTop:8, flexWrap:"wrap" }}>
                    {h.specialties.slice(0,2).map(s => (
                      <span key={s} style={{ padding:"2px 8px", borderRadius:DS.radius.full, background:DS.colors.tealLight, fontSize:10, color:DS.colors.teal, fontWeight:600 }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </>}
      </div>
    </div>
  );
};

// ─── HOSPITAL DIRECTORY ──────────────────────────────────────────────────────
const HospitalScreen = ({ role, onNavigate }) => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [treatType, setTreatType] = useState(null);

  const filters = ["All", "Gold", "Silver", "Cardiac", "Oncology", "AYUSH"];
  const filtered = HOSPITALS.filter(h => {
    const q = search.toLowerCase();
    const matchSearch = h.name.toLowerCase().includes(q) || h.city.toLowerCase().includes(q) || h.specialties.some(s => s.toLowerCase().includes(q));
    if (activeFilter === "All") return matchSearch;
    if (activeFilter === "Gold") return matchSearch && h.nabh === "NABH Gold";
    if (activeFilter === "Silver") return matchSearch && h.nabh === "NABH Silver";
    return matchSearch && h.specialties.some(s => s.includes(activeFilter));
  });

  if (selected) return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", background:DS.colors.bg }}>
      <div style={{ background:`linear-gradient(135deg, ${DS.colors.primary} 0%, ${DS.colors.primaryMid} 100%)`, padding:"20px 20px 24px" }}>
        <button onClick={() => setSelected(null)} style={{ background:"none", border:"none", cursor:"pointer", marginBottom:12, display:"flex", alignItems:"center", gap:6 }}>
          <Icon name="chevronLeft" size={20} color="rgba(255,255,255,0.8)" />
          <span style={{ color:"rgba(255,255,255,0.8)", fontSize:13 }}>Hospitals</span>
        </button>
        <div style={{ fontSize:22, fontWeight:800, color:DS.colors.white }}>{selected.name}</div>
        <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:6 }}>
          <Icon name="mapPin" size={14} color="rgba(255,255,255,0.6)" />
          <span style={{ fontSize:13, color:"rgba(255,255,255,0.6)" }}>{selected.city}</span>
          <NabhBadge tier={selected.nabh} />
        </div>
      </div>
      <div style={{ flex:1, overflow:"auto", padding:"16px 16px 80px" }}>
        {/* Score */}
        <Card style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ fontSize:11, color:DS.colors.textMuted, marginBottom:4 }}>QCI TRUST SCORE</div>
            <div style={{ display:"flex", alignItems:"baseline", gap:6 }}>
              <span style={{ fontSize:28, fontWeight:900, color:DS.colors.text }}>{selected.score}</span>
              <span style={{ color:DS.colors.textMuted, fontSize:12 }}>/ 5.0</span>
            </div>
            <StarRating score={selected.score} size={14} />
          </div>
          <div>
            <div style={{ fontSize:11, color:DS.colors.textMuted, marginBottom:4 }}>TOTAL PROCEDURES</div>
            <div style={{ fontSize:22, fontWeight:800, color:DS.colors.primary }}>{selected.procedures.toLocaleString()}</div>
            <div style={{ fontSize:11, color:DS.colors.textMuted }}>{selected.beds} beds</div>
          </div>
        </Card>

        {/* Treatment type */}
        <SectionHeader title="Treatment Type" />
        <div style={{ display:"flex", gap:10, marginBottom:16 }}>
          {["Allopathic", "AYUSH"].map(t => (
            <button key={t} onClick={() => setTreatType(treatType===t?null:t)} style={{
              flex:1, padding:"12px", borderRadius:DS.radius.md, border:`1.5px solid ${treatType===t?DS.colors.accent:DS.colors.border}`,
              background:treatType===t?DS.colors.accent:DS.colors.card, color:treatType===t?DS.colors.white:DS.colors.text,
              fontWeight:700, fontSize:13, cursor:"pointer",
            }}>{t === "AYUSH" ? "🌿 " : "🏥 "}{t}</button>
          ))}
        </div>

        <SectionHeader title="Specialties" />
        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:16 }}>
          {selected.specialties.map(s => (
            <span key={s} style={{ padding:"6px 12px", borderRadius:DS.radius.full, background:DS.colors.tealLight, fontSize:12, color:DS.colors.teal, fontWeight:600 }}>{s}</span>
          ))}
        </div>

        <SectionHeader title="Languages" />
        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:16 }}>
          {selected.languages.map(l => (
            <span key={l} style={{ padding:"6px 12px", borderRadius:DS.radius.full, background:DS.colors.bg, border:`1px solid ${DS.colors.border}`, fontSize:12, color:DS.colors.textSub, fontWeight:600 }}>🌐 {l}</span>
          ))}
        </div>

        <SectionHeader title="Accreditation" />
        <Card>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:DS.colors.text }}>NABH Accreditation</div>
              <div style={{ fontSize:12, color:DS.colors.textMuted, marginTop:2 }}>Valid until {selected.accExpiry}</div>
            </div>
            <NabhBadge tier={selected.nabh} />
          </div>
        </Card>

        <div style={{ display:"flex", gap:10, marginTop:8 }}>
          <button style={{ flex:1, padding:"13px", borderRadius:DS.radius.lg, background:DS.colors.accent, color:DS.colors.white, fontWeight:800, fontSize:14, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
            <Icon name="phone" size={16} color={DS.colors.white} /> Connect
          </button>
          <button style={{ flex:1, padding:"13px", borderRadius:DS.radius.lg, background:DS.colors.card, color:DS.colors.primary, fontWeight:700, fontSize:14, border:`1.5px solid ${DS.colors.primary}`, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
            <Icon name="mail" size={16} color={DS.colors.primary} /> Enquire
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", background:DS.colors.bg }}>
      <div style={{ background:`linear-gradient(135deg, ${DS.colors.primary} 0%, ${DS.colors.primaryMid} 100%)`, padding:"20px 20px 16px" }}>
        <div style={{ fontSize:22, fontWeight:800, color:DS.colors.white, marginBottom:4 }}>Hospital Directory</div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.6)" }}>{HOSPITALS.length} NABH-verified hospitals</div>
      </div>
      <div style={{ flex:1, overflow:"auto", padding:"16px 16px 80px" }}>
        <SearchBar placeholder="Search hospitals, specialties, cities..." value={search} onChange={setSearch} />
        <div style={{ display:"flex", gap:6, marginBottom:14, overflowX:"auto", paddingBottom:4 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{
              padding:"6px 14px", borderRadius:DS.radius.full, whiteSpace:"nowrap",
              background:activeFilter===f?DS.colors.primary:DS.colors.card,
              color:activeFilter===f?DS.colors.white:DS.colors.textSub,
              border:`1.5px solid ${activeFilter===f?DS.colors.primary:DS.colors.border}`,
              fontWeight:600, fontSize:12, cursor:"pointer",
            }}>{f}</button>
          ))}
        </div>
        {filtered.map(h => (
          <Card key={h.id} onClick={() => setSelected(h)}>
            <div style={{ display:"flex", gap:12 }}>
              <div style={{ width:52, height:52, borderRadius:DS.radius.md, background:DS.colors.tealLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>🏥</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:4, alignItems:"flex-start" }}>
                  <div style={{ fontSize:15, fontWeight:700, color:DS.colors.text }}>{h.name}</div>
                  <NabhBadge tier={h.nabh} />
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:4, marginTop:3 }}>
                  <Icon name="mapPin" size={12} color={DS.colors.textMuted} />
                  <span style={{ fontSize:12, color:DS.colors.textMuted }}>{h.city}</span>
                  <span style={{ fontSize:12, color:DS.colors.border }}>•</span>
                  <span style={{ fontSize:12, color:DS.colors.textMuted }}>{h.beds} beds</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:5 }}>
                  <StarRating score={h.score} size={11} />
                  <span style={{ fontSize:11, fontWeight:700, color:DS.colors.text }}>{h.score}</span>
                  <span style={{ fontSize:11, color:DS.colors.textMuted }}>• {h.procedures.toLocaleString()} procedures</span>
                </div>
                <div style={{ display:"flex", gap:4, marginTop:7, flexWrap:"wrap" }}>
                  {h.specialties.slice(0,3).map(s => (
                    <span key={s} style={{ padding:"2px 7px", borderRadius:DS.radius.full, background:DS.colors.bg, border:`1px solid ${DS.colors.border}`, fontSize:10, color:DS.colors.textSub }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ─── DIRECTORY SCREEN (MVTFs + Overseas + Accommodation + Allied) ─────────────
const DirectoryScreen = ({ role }) => {
  const [tab, setTab] = useState(role === "hospital" ? "overseas" : "mvtf");
  const [search, setSearch] = useState("");

  const tabs = role === "overseas"
    ? [{ id:"mvtf", label:"MVTFs" }, { id:"accommodation", label:"Stay" }, { id:"allied", label:"Services" }]
    : role === "mvtf"
    ? [{ id:"overseas", label:"Overseas Partners" }, { id:"accommodation", label:"Stay" }, { id:"allied", label:"Services" }]
    : [{ id:"overseas", label:"Overseas" }, { id:"mvtf", label:"MVTFs" }, { id:"accommodation", label:"Stay" }, { id:"allied", label:"Services" }];

  const renderContent = () => {
    if (tab === "mvtf") return (
      <>
        {MVTFS.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.city.toLowerCase().includes(search.toLowerCase())).map(m => (
          <Card key={m.id}>
            <div style={{ display:"flex", gap:12 }}>
              <div style={{ width:48, height:48, borderRadius:DS.radius.full, background:DS.colors.primaryLight+"22", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>🤝</div>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div style={{ fontSize:14, fontWeight:700, color:DS.colors.text }}>{m.name}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:3 }}>
                    <StarRating score={m.score} size={10} />
                    <span style={{ fontSize:11, fontWeight:700 }}>{m.score}</span>
                  </div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:4, marginTop:3 }}>
                  <Icon name="mapPin" size={11} color={DS.colors.textMuted} />
                  <span style={{ fontSize:11, color:DS.colors.textMuted }}>{m.city}</span>
                  <span style={{ fontSize:11, color:DS.colors.border }}>•</span>
                  <span style={{ fontSize:11, color:DS.colors.textMuted }}>Since {m.since}</span>
                </div>
                <div style={{ fontSize:11, color:DS.colors.textMuted, marginTop:3 }}>{m.cases.toLocaleString()} cases handled</div>
                <div style={{ display:"flex", gap:4, marginTop:6, flexWrap:"wrap" }}>
                  {m.languages.slice(0,3).map(l => <span key={l} style={{ padding:"2px 6px", borderRadius:DS.radius.full, background:DS.colors.bg, border:`1px solid ${DS.colors.border}`, fontSize:10, color:DS.colors.textSub }}>🌐 {l}</span>)}
                </div>
                <div style={{ display:"flex", gap:6, marginTop:10 }}>
                  <button style={{ flex:1, padding:"8px", borderRadius:DS.radius.md, background:DS.colors.accent, color:DS.colors.white, fontWeight:700, fontSize:12, border:"none", cursor:"pointer" }}>Connect</button>
                  <button style={{ flex:1, padding:"8px", borderRadius:DS.radius.md, background:DS.colors.card, color:DS.colors.primary, fontWeight:700, fontSize:12, border:`1px solid ${DS.colors.primary}`, cursor:"pointer" }}>View Profile</button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </>
    );

    if (tab === "overseas") return (
      <>
        {OVERSEAS.filter(o => o.name.toLowerCase().includes(search.toLowerCase()) || o.country.toLowerCase().includes(search.toLowerCase())).map(o => (
          <Card key={o.id}>
            <div style={{ display:"flex", gap:12 }}>
              <div style={{ width:48, height:48, borderRadius:DS.radius.full, background:DS.colors.tealLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>🌍</div>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div style={{ fontSize:14, fontWeight:700, color:DS.colors.text }}>{o.name}</div>
                  {o.verified && <span style={{ padding:"2px 7px", borderRadius:DS.radius.full, background:DS.colors.successLight, fontSize:10, color:DS.colors.success, fontWeight:700 }}>✓ Verified</span>}
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:4, marginTop:3 }}>
                  <span style={{ fontSize:12, color:DS.colors.textMuted }}>🌐 {o.country}</span>
                  <span style={{ fontSize:11, color:DS.colors.border }}>•</span>
                  <span style={{ fontSize:12, color:DS.colors.textMuted }}>{o.type}</span>
                </div>
                <div style={{ fontSize:11, color:DS.colors.textMuted, marginTop:3 }}>{o.patients} patients referred</div>
                <div style={{ display:"flex", gap:6, marginTop:10 }}>
                  <button style={{ flex:1, padding:"8px", borderRadius:DS.radius.md, background:DS.colors.accent, color:DS.colors.white, fontWeight:700, fontSize:12, border:"none", cursor:"pointer" }}>Connect</button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </>
    );

    if (tab === "accommodation") return (
      <>
        <div style={{ padding:"8px 12px", borderRadius:DS.radius.md, background:DS.colors.tealLight, marginBottom:12, fontSize:11, color:DS.colors.teal, fontWeight:600 }}>
          💡 Tip: Select a hospital first to see accommodation sorted by proximity
        </div>
        {ACCOMMODATION.filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.city.toLowerCase().includes(search.toLowerCase())).map(a => (
          <Card key={a.id}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
              <div style={{ fontSize:15, fontWeight:700, color:DS.colors.text }}>{a.name}</div>
              <div style={{ display:"flex", alignItems:"center", gap:3 }}>
                <Icon name="star" size={11} color={DS.colors.gold} />
                <span style={{ fontSize:12, fontWeight:700 }}>{a.rating}</span>
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:4, marginTop:4 }}>
              <Icon name="mapPin" size={11} color={DS.colors.textMuted} />
              <span style={{ fontSize:12, color:DS.colors.textMuted }}>{a.city}</span>
              <span style={{ fontSize:11, color:DS.colors.border }}>•</span>
              <span style={{ fontSize:12, color:DS.colors.teal, fontWeight:600 }}>{a.distance} from {a.nearHospital}</span>
            </div>
            <div style={{ display:"flex", gap:4, marginTop:8, flexWrap:"wrap" }}>
              {a.amenities.map(am => <span key={am} style={{ padding:"3px 8px", borderRadius:DS.radius.full, background:DS.colors.successLight, fontSize:10, color:DS.colors.success, fontWeight:600 }}>✓ {am}</span>)}
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:10 }}>
              <span style={{ fontSize:12, fontWeight:700, color:DS.colors.text }}>{a.priceRange}</span>
              <button style={{ padding:"7px 14px", borderRadius:DS.radius.md, background:DS.colors.accent, color:DS.colors.white, fontWeight:700, fontSize:12, border:"none", cursor:"pointer" }}>Contact</button>
            </div>
          </Card>
        ))}
      </>
    );

    if (tab === "allied") return (
      <>
        {ALLIED.filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.category.toLowerCase().includes(search.toLowerCase())).map(a => {
          const catIcon = { Forex:"💱", Insurance:"🛡️", Translator:"🌐", AYUSH:"🌿", Wellness:"💆" };
          const catColor = { Forex:DS.colors.primary, Insurance:DS.colors.teal, Translator:DS.colors.success, AYUSH:DS.colors.success, Wellness:DS.colors.purple };
          return (
            <Card key={a.id}>
              <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                <div style={{ width:44, height:44, borderRadius:DS.radius.md, background:`${catColor[a.category] || DS.colors.teal}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{catIcon[a.category]}</div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                    <div style={{ fontSize:14, fontWeight:700, color:DS.colors.text }}>{a.name}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:3 }}>
                      <Icon name="star" size={11} color={DS.colors.gold} />
                      <span style={{ fontSize:11, fontWeight:700 }}>{a.rating}</span>
                    </div>
                  </div>
                  <span style={{ padding:"2px 8px", borderRadius:DS.radius.full, background:`${catColor[a.category]||DS.colors.teal}18`, fontSize:10, color:catColor[a.category]||DS.colors.teal, fontWeight:700 }}>{a.category}</span>
                  {a.services && <div style={{ fontSize:11, color:DS.colors.textMuted, marginTop:5 }}>{a.services.join(" • ")}</div>}
                  {a.languages && <div style={{ fontSize:11, color:DS.colors.textMuted, marginTop:5 }}>Languages: {a.languages.join(", ")}</div>}
                  <button style={{ marginTop:10, padding:"7px 14px", borderRadius:DS.radius.md, background:DS.colors.accent, color:DS.colors.white, fontWeight:700, fontSize:12, border:"none", cursor:"pointer" }}>Contact</button>
                </div>
              </div>
            </Card>
          );
        })}
      </>
    );
  };

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", background:DS.colors.bg }}>
      <div style={{ background:`linear-gradient(135deg, ${DS.colors.primary} 0%, ${DS.colors.primaryMid} 100%)`, padding:"20px 20px 0" }}>
        <div style={{ fontSize:22, fontWeight:800, color:DS.colors.white, marginBottom:14 }}>Directory</div>
        <div style={{ display:"flex", gap:0, overflowX:"auto", paddingBottom:0 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding:"10px 16px", border:"none", cursor:"pointer", whiteSpace:"nowrap", fontSize:13, fontWeight:700,
              background:"transparent", color:tab===t.id?"white":"rgba(255,255,255,0.5)",
              borderBottom: tab===t.id ? `2.5px solid ${DS.colors.accent}` : "2.5px solid transparent",
            }}>{t.label}</button>
          ))}
        </div>
      </div>
      <div style={{ flex:1, overflow:"auto", padding:"16px 16px 80px" }}>
        <SearchBar placeholder={`Search ${tab}...`} value={search} onChange={setSearch} />
        {renderContent()}
      </div>
    </div>
  );
};

// ─── GRIEVANCE / SoS SCREEN ───────────────────────────────────────────────────
const GrievanceScreen = ({ role }) => {
  const [view, setView] = useState("list");
  const [form, setForm] = useState({ category:"Hospital", against:"", detail:"" });
  const [submitted, setSubmitted] = useState(false);

  if (submitted) return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:32, background:DS.colors.bg }}>
      <div style={{ width:80, height:80, borderRadius:"50%", background:DS.colors.successLight, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20 }}>
        <Icon name="check" size={36} color={DS.colors.success} />
      </div>
      <div style={{ fontSize:22, fontWeight:800, color:DS.colors.text, textAlign:"center", marginBottom:8 }}>Complaint Submitted</div>
      <div style={{ fontSize:13, color:DS.colors.textSub, textAlign:"center", marginBottom:6 }}>Your ticket has been raised with QCI/NABH</div>
      <div style={{ padding:"10px 20px", borderRadius:DS.radius.lg, background:DS.colors.card, border:`1.5px solid ${DS.colors.border}`, marginBottom:24 }}>
        <span style={{ fontSize:14, fontWeight:800, color:DS.colors.primary }}>GRV-2024-1025</span>
      </div>
      <button onClick={() => { setSubmitted(false); setView("list"); }} style={{ padding:"12px 32px", borderRadius:DS.radius.lg, background:DS.colors.accent, color:DS.colors.white, fontWeight:800, border:"none", cursor:"pointer" }}>
        Back to Grievances
      </button>
    </div>
  );

  if (view === "new") return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", background:DS.colors.bg }}>
      <div style={{ background:`linear-gradient(135deg, ${DS.colors.danger} 0%, #8B0000 100%)`, padding:"20px 20px 20px" }}>
        <button onClick={() => setView("list")} style={{ background:"none", border:"none", cursor:"pointer", marginBottom:12 }}>
          <Icon name="chevronLeft" size={20} color="rgba(255,255,255,0.8)" />
        </button>
        <div style={{ fontSize:22, fontWeight:800, color:DS.colors.white }}>Raise Complaint / SoS</div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.6)", marginTop:4 }}>All complaints are routed directly to QCI Admin</div>
      </div>
      <div style={{ flex:1, overflow:"auto", padding:"20px 16px 80px" }}>
        <div style={{ marginBottom:14 }}>
          <label style={{ fontSize:12, fontWeight:600, color:DS.colors.textSub, display:"block", marginBottom:6 }}>Category</label>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {["Hospital","MVTF","Accommodation","Allied Service","Overseas Partner"].map(c => (
              <button key={c} onClick={() => setForm({...form,category:c})} style={{ padding:"7px 12px", borderRadius:DS.radius.full, border:`1.5px solid ${form.category===c?DS.colors.danger:DS.colors.border}`, background:form.category===c?DS.colors.dangerLight:DS.colors.card, color:form.category===c?DS.colors.danger:DS.colors.textSub, fontWeight:600, fontSize:12, cursor:"pointer" }}>{c}</button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom:14 }}>
          <label style={{ fontSize:12, fontWeight:600, color:DS.colors.textSub, display:"block", marginBottom:6 }}>Name of Entity</label>
          <input value={form.against} onChange={e => setForm({...form,against:e.target.value})} placeholder="e.g. Apollo Hospitals, Mumbai" style={{ width:"100%", padding:"11px 13px", borderRadius:DS.radius.md, border:`1.5px solid ${DS.colors.border}`, background:DS.colors.card, fontSize:14, outline:"none", boxSizing:"border-box", fontFamily:"inherit" }} />
        </div>
        <div style={{ marginBottom:14 }}>
          <label style={{ fontSize:12, fontWeight:600, color:DS.colors.textSub, display:"block", marginBottom:6 }}>Describe the Issue</label>
          <textarea value={form.detail} onChange={e => setForm({...form,detail:e.target.value})} rows={5} placeholder="Describe the issue in detail..." style={{ width:"100%", padding:"11px 13px", borderRadius:DS.radius.md, border:`1.5px solid ${DS.colors.border}`, background:DS.colors.card, fontSize:14, outline:"none", resize:"none", boxSizing:"border-box", fontFamily:"inherit" }} />
        </div>
        <div style={{ padding:"12px 14px", borderRadius:DS.radius.md, background:DS.colors.warningLight, border:`1px solid ${DS.colors.gold}44`, marginBottom:18 }}>
          <div style={{ fontSize:11, color:DS.colors.warning, fontWeight:600 }}>⚠️ What happens next?</div>
          <div style={{ fontSize:11, color:DS.colors.textSub, marginTop:4, lineHeight:1.5 }}>QCI Admin will review your ticket within 2 business days, assign it to the concerned party, and set a resolution timeline. You can track status using your ticket ID.</div>
        </div>
        <button onClick={() => setSubmitted(true)} style={{ width:"100%", padding:"14px", borderRadius:DS.radius.lg, background:DS.colors.danger, color:DS.colors.white, fontWeight:800, fontSize:15, border:"none", cursor:"pointer" }}>
          Submit Complaint
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", background:DS.colors.bg }}>
      <div style={{ background:`linear-gradient(135deg, ${DS.colors.primary} 0%, ${DS.colors.primaryMid} 100%)`, padding:"20px 20px 16px" }}>
        <div style={{ fontSize:22, fontWeight:800, color:DS.colors.white, marginBottom:4 }}>Grievances & SoS</div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.6)" }}>QCI-mediated complaint resolution</div>
      </div>
      <div style={{ flex:1, overflow:"auto", padding:"16px 16px 80px" }}>
        <button onClick={() => setView("new")} style={{ width:"100%", padding:"13px", borderRadius:DS.radius.lg, background:DS.colors.danger, color:DS.colors.white, fontWeight:800, fontSize:14, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:20, boxShadow:`0 4px 16px rgba(192,57,43,0.3)` }}>
          <Icon name="plus" size={18} color={DS.colors.white} /> Raise New Complaint / SoS
        </button>

        <SectionHeader title="Your Tickets" sub={`${GRIEVANCES.length} total grievances`} />
        {GRIEVANCES.map(g => (
          <Card key={g.id}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
              <div style={{ fontSize:12, fontWeight:700, color:DS.colors.primary }}>{g.id}</div>
              <StatusBadge status={g.status} />
            </div>
            <div style={{ fontSize:14, fontWeight:600, color:DS.colors.text, marginBottom:4 }}>{g.summary}</div>
            <div style={{ fontSize:12, color:DS.colors.textMuted, marginBottom:6 }}>Against: <span style={{ color:DS.colors.textSub, fontWeight:600 }}>{g.against}</span></div>
            <div style={{ fontSize:11, color:DS.colors.textMuted }}>Raised: {g.raised}</div>
            {g.resolution && <div style={{ marginTop:8, padding:"8px 10px", borderRadius:DS.radius.md, background:DS.colors.successLight }}>
              <div style={{ fontSize:11, color:DS.colors.success, fontWeight:700 }}>✓ Resolution</div>
              <div style={{ fontSize:11, color:DS.colors.success, marginTop:2 }}>{g.resolution}</div>
            </div>}
            <div style={{ display:"flex", gap:8, marginTop:10 }}>
              <button style={{ flex:1, padding:"7px", borderRadius:DS.radius.md, background:DS.colors.bg, color:DS.colors.primary, fontWeight:700, fontSize:12, border:`1px solid ${DS.colors.border}`, cursor:"pointer" }}>Track Status</button>
              <button style={{ flex:1, padding:"7px", borderRadius:DS.radius.md, background:DS.colors.bg, color:DS.colors.primary, fontWeight:700, fontSize:12, border:`1px solid ${DS.colors.border}`, cursor:"pointer" }}>Add Update</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ─── ADMIN: ONBOARDING QUEUE ──────────────────────────────────────────────────
const OnboardingScreen = () => {
  const [items, setItems] = useState(ONBOARDING_QUEUE);
  const [action, setAction] = useState(null);

  const handleDecision = (id, decision) => {
    setItems(prev => prev.map(i => i.id===id ? {...i, status: decision==="approve"?"Approved":"Rejected"} : i));
    setAction(null);
  };

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", background:DS.colors.bg }}>
      <div style={{ background:`linear-gradient(135deg, ${DS.colors.primary} 0%, ${DS.colors.primaryMid} 100%)`, padding:"20px 20px 16px" }}>
        <div style={{ fontSize:22, fontWeight:800, color:DS.colors.white, marginBottom:4 }}>Onboarding Queue</div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.6)" }}>{items.filter(i=>i.status==="Pending"||i.status==="Under Review").length} pending applications</div>
      </div>
      <div style={{ flex:1, overflow:"auto", padding:"16px 16px 80px" }}>
        {items.map(app => (
          <Card key={app.id}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
              <div style={{ fontSize:11, fontWeight:700, color:DS.colors.primary }}>{app.id}</div>
              <StatusBadge status={app.status} />
            </div>
            <div style={{ fontSize:15, fontWeight:700, color:DS.colors.text }}>{app.name}</div>
            <div style={{ fontSize:12, color:DS.colors.textMuted, marginTop:3 }}>{app.type} • {app.country || app.city}</div>
            <div style={{ fontSize:11, color:DS.colors.textMuted, marginTop:2 }}>Applied: {app.applied}</div>
            {(app.status === "Pending" || app.status === "Under Review") && (
              <div style={{ display:"flex", gap:8, marginTop:12 }}>
                <button onClick={() => handleDecision(app.id, "approve")} style={{ flex:1, padding:"9px", borderRadius:DS.radius.md, background:DS.colors.success, color:DS.colors.white, fontWeight:700, fontSize:12, border:"none", cursor:"pointer" }}>✓ Approve</button>
                <button onClick={() => handleDecision(app.id, "review")} style={{ flex:1, padding:"9px", borderRadius:DS.radius.md, background:DS.colors.warningLight, color:DS.colors.warning, fontWeight:700, fontSize:12, border:`1px solid ${DS.colors.warning}44`, cursor:"pointer" }}>Request Changes</button>
                <button onClick={() => handleDecision(app.id, "reject")} style={{ flex:1, padding:"9px", borderRadius:DS.radius.md, background:DS.colors.dangerLight, color:DS.colors.danger, fontWeight:700, fontSize:12, border:`1px solid ${DS.colors.danger}44`, cursor:"pointer" }}>✕ Reject</button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

// ─── ADMIN: ANALYTICS ─────────────────────────────────────────────────────────
const AnalyticsScreen = () => {
  const bars = [
    { label:"Jan", value:68, color:DS.colors.primaryLight },
    { label:"Feb", value:74, color:DS.colors.primaryLight },
    { label:"Mar", value:82, color:DS.colors.primaryLight },
    { label:"Apr", value:79, color:DS.colors.primaryLight },
    { label:"May", value:91, color:DS.colors.accent },
    { label:"Jun", value:88, color:DS.colors.accent },
  ];
  const maxVal = Math.max(...bars.map(b=>b.value));

  const sourceMarkets = [
    { country:"UAE", patients:2840, pct:28 },
    { country:"Bangladesh", patients:1920, pct:19 },
    { country:"Nigeria", patients:1540, pct:15 },
    { country:"Sri Lanka", patients:1210, pct:12 },
    { country:"Others", patients:2590, pct:26 },
  ];

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", background:DS.colors.bg }}>
      <div style={{ background:`linear-gradient(135deg, ${DS.colors.primary} 0%, ${DS.colors.primaryMid} 100%)`, padding:"20px 20px 16px" }}>
        <div style={{ fontSize:22, fontWeight:800, color:DS.colors.white, marginBottom:4 }}>Analytics Dashboard</div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.6)" }}>QCI MVT Ecosystem Intelligence</div>
      </div>
      <div style={{ flex:1, overflow:"auto", padding:"16px 16px 80px" }}>
        {/* KPI Row */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:20 }}>
          <StatCard label="Total Patients (2024)" value="6.5L" icon="users" color={DS.colors.teal} sub="↑ 18% YoY" />
          <StatCard label="Platform Revenue" value="$13B" icon="trendUp" color={DS.colors.success} sub="GDP Contribution" />
          <StatCard label="Avg. Trust Score" value="4.6" icon="award" color={DS.colors.gold} sub="↑ 0.2 this quarter" />
          <StatCard label="Resolution Rate" value="87%" icon="check" color={DS.colors.primaryLight} sub="Grievance SLA" />
        </div>

        {/* Onboardings chart */}
        <SectionHeader title="Monthly Onboardings" sub="New verified stakeholders" />
        <Card>
          <div style={{ display:"flex", alignItems:"flex-end", gap:8, height:90, padding:"0 4px" }}>
            {bars.map(b => (
              <div key={b.label} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                <div style={{ fontSize:10, fontWeight:700, color:DS.colors.textSub }}>{b.value}</div>
                <div style={{ width:"100%", height:`${(b.value/maxVal)*70}px`, borderRadius:"4px 4px 0 0", background:b.color, transition:"height 0.3s" }} />
                <div style={{ fontSize:10, color:DS.colors.textMuted }}>{b.label}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Source markets */}
        <SectionHeader title="Top Source Markets" sub="Patient origin countries" />
        <Card>
          {sourceMarkets.map((m, i) => (
            <div key={m.country} style={{ marginBottom: i < sourceMarkets.length-1 ? 12 : 0 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                <span style={{ fontSize:13, fontWeight:600, color:DS.colors.text }}>{m.country}</span>
                <span style={{ fontSize:12, color:DS.colors.textMuted }}>{m.patients.toLocaleString()} patients ({m.pct}%)</span>
              </div>
              <div style={{ height:6, borderRadius:DS.radius.full, background:DS.colors.bg, overflow:"hidden" }}>
                <div style={{ height:"100%", width:`${m.pct}%`, borderRadius:DS.radius.full, background:i===0?DS.colors.accent:i===1?DS.colors.teal:DS.colors.primaryLight }} />
              </div>
            </div>
          ))}
        </Card>

        {/* Accreditation expiry alerts */}
        <SectionHeader title="Accreditation Alerts" sub="Upcoming expiries" />
        {[
          { name:"Fortis Healthcare", expiry:"2025-11-30", days:30, color:DS.colors.danger },
          { name:"Care Hospitals", expiry:"2025-12-15", days:45, color:DS.colors.warning },
          { name:"Narayana Health", expiry:"2026-01-10", days:70, color:DS.colors.gold },
        ].map(a => (
          <Card key={a.name} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 16px" }}>
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:DS.colors.text }}>{a.name}</div>
              <div style={{ fontSize:11, color:DS.colors.textMuted, marginTop:2 }}>Expires: {a.expiry}</div>
            </div>
            <span style={{ padding:"4px 10px", borderRadius:DS.radius.full, background:`${a.color}18`, color:a.color, fontSize:11, fontWeight:800 }}>{a.days}d left</span>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ─── PROFILE SCREEN ───────────────────────────────────────────────────────────
const ProfileScreen = ({ role, onLogout }) => {
  const profileData = {
    overseas: { name:"Gulf Med Partners", id:"NABH-OVS-2341", country:"UAE", type:"Overseas MVTF", email:"contact@gulfmed.ae", phone:"+971-4-3241000", since:"2018", score:4.8 },
    mvtf: { name:"Wellness Bridge", id:"NABH-MVTF-2890", city:"Mumbai", type:"Indian MVTF", email:"info@wellnessbridge.in", phone:"+91-22-4567890", since:"2012", score:4.9 },
    hospital: { name:"Apollo Hospitals", id:"NABH-HSP-0001", city:"Chennai", type:"NABH Gold Hospital", email:"international@apollohospitals.com", phone:"+91-44-28293333", since:"2002", score:4.8 },
    admin: { name:"Priya Sharma", id:"QCI-ADMIN-007", unit:"MVT Secretariat", type:"QCI Administrator", email:"p.sharma@qcin.org", phone:"+91-11-23348490", since:"2020", score:null },
  };
  const p = profileData[role] || profileData.overseas;

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", background:DS.colors.bg }}>
      <div style={{ background:`linear-gradient(135deg, ${DS.colors.primary} 0%, ${DS.colors.primaryMid} 100%)`, padding:"24px 20px 32px", textAlign:"center" }}>
        <div style={{ width:72, height:72, borderRadius:"50%", background:"rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, margin:"0 auto 12px", border:"2.5px solid rgba(255,255,255,0.3)" }}>
          {role==="admin"?"👤":role==="hospital"?"🏥":role==="mvtf"?"🤝":"🌍"}
        </div>
        <div style={{ fontSize:20, fontWeight:800, color:DS.colors.white }}>{p.name}</div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.6)", marginTop:4 }}>{p.id}</div>
        <div style={{ marginTop:8 }}>
          <NabhBadge tier={p.type} />
        </div>
        {p.score && <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, marginTop:10 }}>
          <StarRating score={p.score} size={14} />
          <span style={{ fontSize:13, fontWeight:700, color:DS.colors.white }}>{p.score} Trust Score</span>
        </div>}
      </div>

      <div style={{ flex:1, overflow:"auto", padding:"16px 16px 80px" }}>
        <Card>
          {[
            { label:"Email", value:p.email, icon:"mail" },
            { label:"Phone", value:p.phone, icon:"phone" },
            { label:p.country?"Country":"City", value:p.country||p.city||p.unit, icon:"mapPin" },
            { label:"Member Since", value:p.since, icon:"award" },
          ].map((item, i, arr) => (
            <div key={item.label} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:i<arr.length-1?`1px solid ${DS.colors.border}`:"none" }}>
              <div style={{ width:32, height:32, borderRadius:DS.radius.md, background:DS.colors.bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Icon name={item.icon} size={15} color={DS.colors.teal} />
              </div>
              <div>
                <div style={{ fontSize:10, color:DS.colors.textMuted, fontWeight:600 }}>{item.label}</div>
                <div style={{ fontSize:13, color:DS.colors.text, fontWeight:600 }}>{item.value}</div>
              </div>
            </div>
          ))}
        </Card>

        <SectionHeader title="Settings" />
        {[
          { label:"Notification Preferences", icon:"bell" },
          { label:"Privacy & Data Settings", icon:"eye" },
          { label:"Language Settings", icon:"globe" },
          { label:"NABH Accreditation Details", icon:"award" },
          { label:"Help & Support", icon:"chat" },
        ].map(item => (
          <Card key={item.label} style={{ display:"flex", alignItems:"center", padding:"13px 16px", marginBottom:8 }}>
            <div style={{ width:36, height:36, borderRadius:DS.radius.md, background:DS.colors.bg, display:"flex", alignItems:"center", justifyContent:"center", marginRight:12 }}>
              <Icon name={item.icon} size={18} color={DS.colors.primary} />
            </div>
            <span style={{ flex:1, fontSize:14, fontWeight:600, color:DS.colors.text }}>{item.label}</span>
            <Icon name="chevronRight" size={16} color={DS.colors.textMuted} />
          </Card>
        ))}

        <button onClick={onLogout} style={{ width:"100%", marginTop:8, padding:"13px", borderRadius:DS.radius.lg, background:DS.colors.dangerLight, color:DS.colors.danger, fontWeight:800, fontSize:14, border:`1.5px solid ${DS.colors.danger}44`, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
          <Icon name="logout" size={18} color={DS.colors.danger} /> Sign Out
        </button>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
// ROOT APP
// ════════════════════════════════════════════════════════════════════════════
export default function BharatHealthConnect() {
  const [screen, setScreen] = useState("splash");
  const [activeTab, setActiveTab] = useState("home");
  const [role, setRole] = useState(null);

  const handleLogin = (selectedRole) => {
    setRole(selectedRole);
    setScreen("app");
    setActiveTab("home");
  };

  const handleNavigate = (tab) => setActiveTab(tab);
  const handleLogout = () => { setScreen("splash"); setRole(null); setActiveTab("home"); };

  const renderTab = () => {
    if (activeTab === "home") return <HomeScreen role={role} onNavigate={handleNavigate} />;
    if (activeTab === "hospitals") return <HospitalScreen role={role} onNavigate={handleNavigate} />;
    if (activeTab === "directory") return <DirectoryScreen role={role} />;
    if (activeTab === "grievances") return <GrievanceScreen role={role} />;
    if (activeTab === "profile") return <ProfileScreen role={role} onLogout={handleLogout} />;
    if (activeTab === "onboarding") return <OnboardingScreen />;
    if (activeTab === "analytics") return <AnalyticsScreen />;
    if (activeTab === "accommodation") return <DirectoryScreen role={role} />;
    if (activeTab === "allied") return <DirectoryScreen role={role} />;
    return <HomeScreen role={role} onNavigate={handleNavigate} />;
  };

  // Phone frame
  return (
    <div style={{ minHeight:"100vh", background:"#1a1a2e", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Segoe UI', system-ui, sans-serif", padding:"20px 0" }}>
      {/* Phone bezel */}
      <div style={{ width:390, background:DS.colors.navyGrad1, borderRadius:48, padding:"12px 10px", boxShadow:"0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 2px rgba(255,255,255,0.04)", position:"relative" }}>
        {/* Notch */}
        <div style={{ width:120, height:28, background:DS.colors.navyGrad1, borderRadius:"0 0 18px 18px", margin:"0 auto 4px", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
          <div style={{ width:10, height:10, borderRadius:"50%", background:"#111" }} />
          <div style={{ width:6, height:6, borderRadius:"50%", background:"#111" }} />
        </div>

        {/* Screen */}
        <div style={{ height:780, borderRadius:38, overflow:"hidden", position:"relative", background:DS.colors.bg }}>
          {screen === "splash" && <SplashScreen onNext={handleLogin} />}
          {screen === "app" && (
            <div style={{ height:"100%", position:"relative" }}>
              <div style={{ height:"100%", paddingBottom:0 }}>
                {renderTab()}
              </div>
              <BottomNav active={activeTab} onNavigate={handleNavigate} role={role} />
            </div>
          )}
        </div>

        {/* Home indicator */}
        <div style={{ width:100, height:4, background:"rgba(255,255,255,0.2)", borderRadius:DS.radius.full, margin:"10px auto 0" }} />
      </div>

      {/* Role selector outside phone */}
      {screen === "app" && (
        <div style={{ position:"fixed", top:20, right:20, background:"rgba(10,46,82,0.95)", borderRadius:DS.radius.lg, padding:"12px 16px", border:"1px solid rgba(255,255,255,0.1)", backdropFilter:"blur(10px)" }}>
          <div style={{ fontSize:10, color:"rgba(255,255,255,0.5)", marginBottom:8, fontWeight:700, letterSpacing:1 }}>SWITCH ROLE</div>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {[{id:"overseas",label:"🌍 Overseas Partner"},{id:"mvtf",label:"🤝 Indian MVTF"},{id:"hospital",label:"🏥 Hospital"},{id:"admin",label:"🛡️ QCI Admin"}].map(r => (
              <button key={r.id} onClick={() => { setRole(r.id); setActiveTab("home"); }} style={{ padding:"6px 12px", borderRadius:DS.radius.md, border:`1px solid ${role===r.id?DS.colors.accent:"rgba(255,255,255,0.15)"}`, background:role===r.id?`${DS.colors.accent}22`:"transparent", color:role===r.id?DS.colors.accentLight:"rgba(255,255,255,0.7)", fontSize:11, fontWeight:600, cursor:"pointer", textAlign:"left" }}>{r.label}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
