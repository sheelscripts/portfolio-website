// Single source of truth for every line of resume-derived copy.
// Sources: sheelendra_addverb.tex (robotics/embedded canon),
//          sheelendra_ekacare.tex (full-stack canon).

export const contact = {
  name: "Sheelendra",
  role: "Full-stack engineer for physical systems.",
  tagline: "I ship robotics, embedded firmware, and the software that runs them.",
  email: "sheelscripts@gmail.com",
  phone: "+91 9354928838",
  github: "https://github.com/sheelscripts",
  githubHandle: "sheelscripts",
  linkedin: "https://linkedin.com/in/sheelscripts",
  linkedinHandle: "sheelscripts",
  x: "https://x.com/sheelscripts",
  xHandle: "sheelscripts",
  location: "New Delhi, India",
  coords: { lat: "N 28.6139°", lng: "E 77.2090°" },
} as const;

export type TimelineEntry = {
  date: string;
  title: string;
  org: string;
  detail: string;
  meta?: string;
  href?: string;
  kind: "milestone" | "role" | "project" | "award";
};

export const timeline: TimelineEntry[] = [
  {
    date: "2023",
    title: "B.Tech, Automation & Robotics",
    org: "GGSIPU - USAR",
    href: "https://www.ipu.ac.in/usar/",
    detail:
      "Started the University School of Automation and Robotics (USAR) program at Guru Gobind Singh Indraprastha University (GGSIPU) — a lab-heavy setting where embedded systems, mechatronics, and machine learning all arrived in the same course, and where the student ecosystem later became the launchpad for learning and other campus reletad ventures.",
    meta: "USAR · GGSIPU · 2023 - 2027",
    kind: "milestone",
  },
  {
    date: "Sep 2024 — 2025",
    title: "Founder & Licensee, TEDx GGSIPU EDC",
    org: "TEDx GGSIPU EDC",
    href: "https://www.ted.com/tedx/events/59774",
    detail:
      "Founded TEDx GGSIPU EDC, built a team and organized the inaugural TEDx event for the university's East Delhi Campus with 450+ attendees, 11 influential cross-domain speakers and end-to-end production.",
    meta: "450+ attendees · 11 influential speakers",
    kind: "role",
  },
  {
    date: "Jul — Aug 2025",
    title: "Summer Internship, CCML LAB",
    org: "INMAS · DRDO",
    detail:
      "Designed a 6-DOF robotic arm (Arduino, PCA9685, MG995/SG90) with calibrated PWM motion mapping for repeatable trajectory execution. Built a custom Android app for real-time Bluetooth control with joint-limit safety. Integrated BLE telemetry from BMI270 IMU and FSR pressure sensors for biomechanics studies; reduced sensor calibration error below 3% through hardware-level signal conditioning.",
    meta: "Validated by Mr. Rajesh Tiwari DRDO Scientist F",
    kind: "role",
  },
  {
    date: "Oct 2025 — 2026",
    title: "Vice Chair & Full-Stack Lead",
    org: "GGSIPU EDC ACM Student Chapter",
    href: "https://usar.acm.org",
    detail:
      "Lead the chapter's technical direction: organising robotics workshops and hackathons, and shipping the portal infrastructure that runs them. Built real-time telemetry visualization dashboards for hardware-monitoring portals using React and Next.js — reducing deployment time by 35% and reaching a Lighthouse score of 98. Contributed to the chapter's ACM Emerging Chapter Award (Honourable Mention) conferred at IIT Hyderabad.",
    meta: "ACM Award · IIT Hyderabad",
    kind: "award",
  },
  // {
  //   date: "Jan 2026",
  //   title: "CareAssist — deployed",
  //   org: "care-assist-liart.vercel.app",
  //   detail:
  //     "Real-time AI monitoring platform: ESP32 + MQTT + FastAPI ingestion, LSTM-based predictive alerting, sub-2s latency across all monitoring nodes.",
  //   kind: "project",
  // },
  // {
  //   date: "Mar 2026",
  //   title: "AQMS rover — shipped",
  //   org: "github.com/sheelendra-scripts/AQI",
  //   detail:
  //     "Autonomous AQI monitoring rover: ESP32 + BLE, PM2.5, gas, GPS, IMU. Interrupt-driven telemetry streaming 120+ sensor readings/min to a FastAPI + React dashboard with real-time anomaly detection.",
  //   meta: "250 Delhi wards · +60% hazard detection",
  //   kind: "project",
  // },
  // {
  //   date: "May 2026",
  //   title: "STM32 Controller Board — validated",
  //   org: "github.com/sheelendra-scripts/STM32",
  //   detail:
  //     "Compact 2-layer STM32F103C8T6 PCB designed in KiCad from scratch — optimized power routing, decoupling layout, native USB D+/D− on PA11/PA12 for DFU flashing. Bring-up validated with oscilloscope probing of UART, SPI, I²C, PWM.",
  //   kind: "project",
  // },
];

export type Project = {
  index: string;
  name: string;
  category: string;
  blurb: string;
  stack: string[];
  result: { label: string; value: string }[];
  description: string;
  href?: string;
  hrefLabel?: string;
  internal?: string;
  meta?: string;
};

export const projects: Project[] = [
  {
    index: "01",
    name: "CareAssist",
    category: "Real-Time AI Monitoring Platform",
    blurb:
      "A clinical dashboard where ESP32 sensor nodes, MQTT, LSTM anomaly detection, and a triage queue all meet in a sub-2s loop.",
    stack: ["Next.js", "TypeScript", "FastAPI", "SQLite", "ESP32", "MQTT", "LSTM", "Tailwind"],
    result: [
      { label: "False-alarm reduction", value: "90%" },
      { label: "Critical response time", value: "−65%" },
      { label: "End-to-end latency", value: "< 2s" },
    ],
    description:
      "Architected a full-stack clinical dashboard with 30+ reusable UI components, processing live vitals from ESP32 nodes via MQTT. Built a real-time NEWS2 scoring engine with Kalman-filtered sensor data and trend-based anomaly detection. Designed a dynamic OPD triage queue using a composite priority algorithm (α·NEWS2 + β·Risk + γ·WaitTime) to eliminate FIFO blind spots — cutting triage assessment time by 40%.",
    href: "https://care-assist-liart.vercel.app",
    hrefLabel: "care-assist-liart.vercel.app",
  },
  {
    index: "02",
    name: "AQMS",
    category: "Autonomous AQI Monitoring Rover",
    blurb:
      "A mobile sensing platform that fuses PM2.5, gas, GPS, and IMU over I²C/SPI/UART, dead-reckoning through Delhi's wards.",
    stack: ["ESP32", "BLE", "I²C", "SPI", "UART", "FastAPI", "React", "Anomaly Detection"],
    result: [
      { label: "Wards monitored", value: "250" },
      { label: "Hazard detection speed", value: "+60%" },
      { label: "Readings / min", value: "120+" },
    ],
    description:
      "Built an ESP32-based mobile sensing platform with full sensor fusion across PM2.5, gas, GPS (u-blox), and IMU (MPU6050) over I²C/SPI/UART; implemented dead-reckoning position estimation using IMU + GPS fusion. Engineered interrupt-driven BLE telemetry firmware streaming 120+ sensor readings/min to a FastAPI + React dashboard with real-time anomaly detection.",
    href: "https://github.com/sheelscripts/AQI",
    hrefLabel: "github.com/sheelendra-scripts/AQI",
  },
  {
    index: "03",
    name: "STM32 Controller Board",
    category: "KiCad PCB Design",
    blurb:
      "A 2-layer STM32F103C8T6 board with native USB DFU, designed from schematic to validated bring-up.",
    stack: ["STM32F103", "KiCad", "USB DFU", "UART", "SPI", "I²C", "PWM"],
    result: [
      { label: "Layers", value: "2" },
      { label: "Buses validated", value: "4" },
      { label: "Toolchain", value: "DFU" },
    ],
    description:
      "Designed a compact 2-layer STM32F103C8T6 PCB from scratch in KiCad with optimized power routing, decoupling layout, and native USB D+/D− lines on PA11/PA12 for DFU flashing. Validated bring-up with oscilloscope probing of UART, SPI, I²C, and PWM signal integrity across peripheral ICs including servo drivers and sensor modules.",
    href: "https://github.com/sheelendra-scripts/STM32",
    hrefLabel: "github.com/sheelendra-scripts/STM32",
  },
  {
    index: "04",
    name: "ACM Website",
    category: "Chapter Infrastructure",
    blurb:
      "Telemetry dashboards and the public-facing site for the ACM student chapter — the React + Next.js stack that powered the chapter's ACM Emerging Chapter Award (Honourable Mention) at IIT Hyderabad.",
    stack: ["React", "Next.js", "TypeScript", "Tailwind", "WebSockets", "Lighthouse 98"],
    result: [
      { label: "Lighthouse", value: "98" },
      { label: "Deploy time", value: "−35%" },
      { label: "Recognition", value: "IIT-H" },
    ],
    description:
      "Built the real-time telemetry visualization dashboards and chapter website for the GGSIPU EDC ACM Student Chapter — reusable React + Next.js components powering hardware-monitoring portals. Reduced feature deployment time by 35% and reached a Lighthouse score of 98. The work contributed to the chapter's ACM Emerging Chapter Award (Honourable Mention) conferred at IIT Hyderabad.",
    href: "https://usar.acm.org",
    hrefLabel: "usar.acm.org",
  },
  {
    index: "05",
    name: "6-DOF Robotic Arm",
    category: "DRDO Research Prototype",
    blurb:
      "A repeatable-trajectory arm with a calibrated PWM map, a custom Android control app, and a BLE telemetry pipeline.",
    stack: ["Arduino", "PCA9685", "MG995 / SG90", "BLE", "BMI270", "FSR", "Android"],
    result: [
      { label: "Degrees of freedom", value: "6" },
      { label: "Calibration error", value: "< 3%" },
      { label: "Validator", value: "DRDO Sc. F" },
    ],
    description:
      "Designed a 6-DOF robotic arm (Arduino, PCA9685, MG995/SG90 servos) with calibrated PWM motion mapping for repeatable trajectory execution. Built a custom Android app for real-time Bluetooth control with joint-limit safety logic. Integrated BLE telemetry using BMI270 IMU and FSR pressure sensors for blunt-injury biomechanics detection; reduced sensor calibration error below 3% through hardware-level signal conditioning.",
    meta: "DRDO · INMAS · CCML LAB",
  },
];

export const skills: { domain: string; items: string[] }[] = [
  {
    domain: "Robotics",
    items: [
      "ROS",
      "Forward / Inverse Kinematics",
      "DH Parameters",
      "Newton-Euler Dynamics",
      "PID Control",
      "ZMP Stability",
      "Motion Planning",
      "SLAM (conceptual)",
      "Sensor Fusion",
    ],
  },
  {
    domain: "Embedded",
    items: [
      "STM32",
      "ESP32",
      "Arduino",
      "C / C++",
      "PWM · I²C · SPI · UART",
      "BLE",
      "CAN (conceptual)",
      "KiCad PCB Design",
    ],
  },
  {
    domain: "AI & Data",
    items: [
      "Python",
      "TensorFlow",
      "LSTM",
      "OpenCV",
      "Kalman Filtering",
      "Anomaly Detection",
      "GCP · Vertex AI",
    ],
  },
  {
    domain: "Web & Systems",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "FastAPI",
      "MQTT · WebSockets",
      "SQLite · Postgres",
      "Linux · Git",
    ],
  },
];

export type Role = {
  org: string;
  href?: string;
  role: string;
  period: string;
  detail: string;
  meta?: string;
};

export const leadership: Role[] = [
  {
    org: "GGSIPU EDC ACM Student Chapter",
    href: "https://usar.acm.org",
    role: "Vice Chair & Full-Stack Lead",
    period: "Oct 2025 — Present",
    detail:
      "Lead the chapter's technical direction — organising robotics workshops and hackathons, and shipping the portal infrastructure behind them. Built real-time telemetry visualization dashboards for hardware-monitoring portals with React and Next.js, reducing deployment time by 35% and reaching a Lighthouse score of 98. Contributed to the ACM Emerging Chapter Award (Honourable Mention) conferred at IIT Hyderabad.",
    meta: "ACM Emerging Chapter Award · IIT Hyderabad",
  },
  {
    org: "TEDx Guru Gobind Singh Indraprastha University East Delhi Campus",
    href: "https://www.ted.com/tedx/events/59774",
    role: "Founder & Organizer",
    period: "Sep 2024 — 2025",
    detail:
      "Founded TEDx Guru Gobind Singh Indraprastha University East Delhi Campus (GGSIPU EDC), built a cross-functional team, and produced the inaugural event from blank page to keynote — end-to-end production, 450+ attendees, 11 influential cross-domain speakers.",
    meta: "450+ attendees · 11 influential speakers",
  },
];

export const education = {
  school: "Guru Gobind Singh Indraprastha University — USAR",
  degree: "B.Tech, Automation & Robotics",
  period: "2023 — 2027",
  coursework: [
    "Advanced Robotics",
    "ROS",
    "Computer Vision",
    "Mechatronics",
    "Machine Learning",
    "IoT",
    "DBMS",
  ],
};

export type Cert = {
  name: string;
  org: string;
  period: string;
  status?: "ongoing" | "complete";
};

export const certifications: Cert[] = [
  { name: "Artificial Intelligence", org: "Samsung Innovation Campus", period: "2025 — 2026", status: "complete" },
  { name: "CS50x", org: "Harvard University", period: "2025 — 2026", status: "complete" },
  { name: "Modern Robotics", org: "Northwestern University", period: "Ongoing", status: "ongoing" },
];
