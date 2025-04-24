import React, { useState, useEffect } from 'react';

import GameOverlay from './GameOverlay';
import EchoPet from './components/EchoPet';
const LayeredSquaresResume = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [experienceIndex, setExperienceIndex] = useState(0);
  const [projectIndex, setProjectIndex] = useState(0);
  const [showGame, setShowGame] = useState(false);

  // Dog animation state
  const [dogX, setDogX] = useState(0);
  const [echoState, setEchoState] = useState('walkSide');
  const [echoDirection, setEchoDirection] = useState('right');

  useEffect(() => {
    if (echoState !== 'walkSide') return;
    const interval = setInterval(() => {
      setDogX((prevX) => {
        const nextX = echoDirection === 'right' ? prevX + 1 : prevX - 1;
        if (nextX > 40) {
          setEchoDirection('left');
          return 40;
        }
        if (nextX < -40) {
          setEchoDirection('right');
          return -40;
        }
        return nextX;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [echoDirection, echoState]);

  useEffect(() => {
    const moods = ['walkSide', 'sit', 'idleWag'];
    const interval = setInterval(() => {
      setEchoState(moods[Math.floor(Math.random() * moods.length)]);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const experienceEntries = [
    {
      title: "Senior Software Developer (SRE-Focused)",
      meta: "BC Provincial Government · May 2024 – Present · Vancouver, BC (Hybrid)",
      bullets: [
        "Stabilized GCP infrastructure (Cloud Run, Cloud Jobs, VPCs) to boost reliability of public-facing services.",
        "Deployed Redis MemoryStore via custom VPC peering; reduced permit latency by 60% for 50K+ daily validations.",
        "Designed nested UAT environment; saved $6K/year while preserving QA integrity.",
        "Overhauled CI/CD systems: built OTP-secured Playwright pipelines, isolated shared infra, and fixed IAM/artifact issues—reducing bugs by 35% and deployment failures by 78%. Established this as the standard and mentored devs to adopt secure, scalable practices.",
        "Rolled out Keycloak SSO; reduced login-related support tickets by 65%.",
        "Resolved CORS/auth issues via scoped domain policies; maintained 99.9% uptime.",
        "Hardened API security with scoped access patterns; passed pen test with zero breaches.",
        "Standardized infra using IaC; cut drift-related issues by 85%.",
        "Enabled parallel QA testing with Firebase Hosting and custom endpoints; cut QA cycle by 30%.",
        "Improved MTTR from 45 → 12 mins using Uptime Checks, PagerDuty, GA dashboards.",
        "Worked with policy teams to preempt infra risks and align with evolving legislation.",
        "Triaged Postgres issues in prod; accelerated issue resolution.",
        "Championed SOAR scanning + approval workflows; ensured 100% compliance."
      ]
    },
    {
      title: "Site Reliability Engineer (Technical Coordinator)",
      meta: "BC Provincial Government · May 2023 – May 2024 · Victoria, BC",
      bullets: [
        "Ensured 24/7 uptime for justice platforms used by RCMP, courts, and municipal police across BC.",
        "Improved availability to 99.995% via blue/green deployments and automated failovers.",
        "Resolved prod outages for 10K+ users through rapid response + coordinated failover.",
        "Maintained 100% privacy compliance via multi-layer encryption and MFA.",
        "Enabled production-like Oracle testing with SQL masking for FOIPPA compliance.",
        "Optimized Jenkins CI/CD; reduced build time by 40% while preserving audit traceability.",
        "Enforced RBAC across OpenShift and GitHub; upheld least-privilege without blocking teams.",
        "Raised deployment success by 75% via dev–DBA–PM coordination.",
        "Reduced MSSQL downtime by 60% via secure SSMS releases through VMWare Horizon."
      ]
    },
    {
      title: "Software Engineer",
      meta: "Zetron · Jan 2021 – Apr 2023 · Victoria, BC",
      bullets: [
        "Built REST APIs, socket servers, and GUIs for radio systems across 200+ public safety agencies.",
        "Delivered <80ms response using C, Mongoose, Python, Yocto.",
        "Wrote Java socket server for radio-over-IP with <100ms response; refactored to async for 30% speedup.",
        "Modernized UI with JS/HTML/CSS based on user feedback.",
        "Rebuilt CI/CD with 99.95% uptime and automated test suite.",
        "Deployed cloud infra using Azure/Nutanix; cut ops costs by 40%.",
        "Cut test time 95% via Python/PyVISA automation framework.",
        "Slashed regression testing 97% with containerized test suite.",
        "Enabled SSO with Azure AD and enforced RBAC security.",
        "Performed Nessus-based security audits + risk assessments.",
        "Wrote C++ firmware for IP upgrade of military repeater radios."
      ]
    },
    {
      title: "Reliability & Maintenance Intern",
      meta: "Teck Resources · Jan 2019 – Apr 2020 · Elkview Operations",
      bullets: [
        "Led cross-functional infra transformation across rugged mining sites; drove cost savings.",
        "Deployed LTE network with 99.9% uptime in harsh terrain.",
        "Automated sensor data collection; saved 1000+ hours/year.",
        "Built SQL + Power BI pipelines to automate reporting; saved 400+ hours/year.",
        "Introduced remote substation monitoring; saved 200+ hours/year.",
        "Maintained IT infra: networks, domains, servers, incident handling.",
        "Wrote scripts (Bash, PowerShell) for backup + deployment automation.",
        "Hardened infra with firewall policies + identity management."
      ]
    }
  ];
  
  // Color palette - soft, modern colors
  const colors = {
    background: '#f5f0e6', // Soft beige background
    layer1: '#94b9af', // Soft sage green
    layer2: '#dbc49f', // Warm sand
    layer3: '#c1666b', // Muted terracotta
    layer4: '#48617a', // Dusty blue
    center: '#2d4654', // Deep slate blue
    text: '#2d4654',   // Text color matching center
    lightText: '#f5f5f5', // Light text for dark backgrounds
  };

  // Projects array for paging (like experience)
  const projects = [
    {
      title: "Layered Resume Website",
      link: "https://avni.dev",
      bullets: [
        "Designed a retro-styled, multi-layer interactive resume using React and Tailwind CSS.",
        "Implemented pixel-animated section labels and dynamic transitions to simulate folding UI layers.",
        "Built as a creative portfolio project to highlight personal branding and frontend skillset."
      ]
    },
    {
      title: "Domain Health Checker",
      link: "https://github.com/avni-salhotra/domain-health-checker",
      bullets: [
        "Built an automated domain health scanner to detect SSL, DNS, SPF/DKIM/DMARC, redirect, and uptime issues, improving security posture across environments.",
        "Prevented potential breaches by identifying critical production misconfigurations including expired DKIM signatures, missing SPF records, and broken redirect chains.",
        "Engineered real-time alerting using Gmail SMTP with secure app passwords, enabling immediate response to domain health degradations and reducing average incident detection time by 70%.",
        "While the final version is under NDA, an MVP version is publicly available on GitHub."
      ]
    }
  ];

  useEffect(() => {
    // Animation for initial load
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 1800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSectionClick = (section) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    if (activeSection === section) {
      setActiveSection(null);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 800);
    } else {
      setActiveSection(section);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 800);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: colors.background }}>
      <div className="relative w-full aspect-square sm:max-w-[min(90vw,600px)]">
        {/* Layer 1 - Experience */}
        <div 
          className={`absolute rounded-lg shadow-lg transition-all duration-800 cursor-pointer ${
            activeSection === 'experience' 
              ? 'inset-0 z-50' 
              : activeSection 
                ? 'opacity-0 scale-95' 
                : initialLoad 
                  ? 'opacity-0 scale-95 delay-200' 
                  : 'opacity-100 inset-0 scale-100'
          }`}
          style={{ 
            background: colors.layer1, 
            transitionDelay: initialLoad ? '1200ms' : '0ms'
          }}
          onClick={(e) => {
            if (!activeSection || activeSection === 'experience') {
              e.stopPropagation();
              handleSectionClick('experience');
            }
          }}
        >
          {activeSection === 'experience' ? (
            <div onClick={(e) => e.stopPropagation()} className="p-8 h-full flex flex-col justify-between overflow-auto">
              <div className="text-white space-y-2">
                <h3 className="text-xl font-bold">{experienceEntries[experienceIndex].title}</h3>
                <p className="text-sm italic">{experienceEntries[experienceIndex].meta}</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {experienceEntries[experienceIndex].bullets.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex justify-between items-center text-white">
                <button
                  onClick={() => setExperienceIndex((i) => Math.max(0, i - 1))}
                  disabled={experienceIndex === 0}
                  className="px-4 py-2 bg-white bg-opacity-10 rounded hover:bg-opacity-20 disabled:opacity-30"
                >
                  Previous
                </button>
                <span className="text-sm">{`${experienceIndex + 1} / ${experienceEntries.length}`}</span>
                <button
                  onClick={() => setExperienceIndex((i) => Math.min(experienceEntries.length - 1, i + 1))}
                  disabled={experienceIndex === experienceEntries.length - 1}
                  className="px-4 py-2 bg-white bg-opacity-10 rounded hover:bg-opacity-20 disabled:opacity-30"
                >
                  Next
                </button>
              </div>
            </div>
          ) : null}
        </div>
        
        {/* Layer 2 - Projects */}
        {/* Layer 2 - Projects */}
        <div 
          className={`absolute rounded-lg shadow-lg transition-all duration-800 cursor-pointer ${
            activeSection === 'projects' 
              ? 'inset-0 z-50' 
              : activeSection 
                ? 'opacity-0 scale-95' 
                : initialLoad 
                  ? 'opacity-0 scale-95 delay-300' 
                  : 'opacity-100 inset-[10%] scale-100'
          }`}
          style={{ 
            background: colors.layer2,
            transitionDelay: initialLoad ? '800ms' : '0ms'
          }}
          onClick={(e) => {
            if (!activeSection || activeSection === 'projects') {
              e.stopPropagation();
              handleSectionClick('projects');
            }
          }}
        >
          {activeSection === 'projects' ? (
            <div onClick={e => e.stopPropagation()} className="p-8 h-full flex flex-col justify-between overflow-auto">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold" style={{ color: colors.text }}>Projects</h2>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg overflow-hidden shadow-sm flex flex-col">
                  {projects[projectIndex].title !== "Domain Health Checker" && projects[projectIndex].title !== "Layered Resume Website" && (
                    <div className="h-40 bg-black bg-opacity-10 flex items-center justify-center mb-4">
                      {/* Placeholder for project screenshot */}
                      <span style={{ color: colors.text }}>Project Screenshot</span>
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>
                      {projects[projectIndex].link && projects[projectIndex].link !== "#" ? (
                        <a href={projects[projectIndex].link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {projects[projectIndex].title}
                        </a>
                      ) : (
                        projects[projectIndex].title
                      )}
                    </h3>
                    {projects[projectIndex].title === "Domain Health Checker" && (
                      <p className="text-sm italic mb-3" style={{ color: 'rgba(45,70,84,0.8)' }}>
                        Visuals unavailable due to NDA. MVP available on GitHub.
                      </p>
                    )}
                    <ul className="list-disc list-inside text-sm mb-4" style={{ color: 'rgba(45,70,84,0.8)' }}>
                      {projects[projectIndex].bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                    <div className="flex justify-between items-center mt-auto pt-2">
                      <div className="flex gap-1">
                        <span className="w-3 h-3 rounded-full" style={{ background: colors.layer3 }}></span>
                        <span className="w-3 h-3 rounded-full" style={{ background: colors.layer4 }}></span>
                        <span className="w-3 h-3 rounded-full" style={{ background: colors.center }}></span>
                      </div>
                      {projects[projectIndex].link && projects[projectIndex].link !== "#" && (
                        <a className="text-sm hover:underline" style={{ color: colors.text }} href={projects[projectIndex].link} target="_blank" rel="noopener noreferrer">
                          Details →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-between items-center text-black">
                <button
                  onClick={() => setProjectIndex((i) => Math.max(0, i - 1))}
                  disabled={projectIndex === 0}
                  className="px-4 py-2 bg-black bg-opacity-10 rounded hover:bg-opacity-20 disabled:opacity-30"
                >
                  Previous
                </button>
                <span className="text-sm">{`${projectIndex + 1} / ${projects.length}`}</span>
                <button
                  onClick={() => setProjectIndex((i) => Math.min(projects.length - 1, i + 1))}
                  disabled={projectIndex === projects.length - 1}
                  className="px-4 py-2 bg-black bg-opacity-10 rounded hover:bg-opacity-20 disabled:opacity-30"
                >
                  Next
                </button>
              </div>
            </div>
          ) : null}
        </div>
        
        {/* Layer 3 - Skills */}
        <div 
          className={`absolute rounded-lg shadow-lg transition-all duration-800 cursor-pointer ${
            activeSection === 'skills' 
              ? 'inset-0 z-50' 
              : activeSection 
                ? 'opacity-0 scale-95' 
                : initialLoad 
                  ? 'opacity-0 scale-95 delay-400' 
                  : 'opacity-100 inset-[20%] scale-100'
          }`}
          style={{ 
            background: colors.layer3,
            transitionDelay: initialLoad ? '400ms' : '0ms'
          }}
          onClick={(e) => {
            if (!activeSection || activeSection === 'skills') {
              e.stopPropagation();
              handleSectionClick('skills');
            }
          }}
        >
          {activeSection === 'skills' ? (
            <div onClick={(e) => e.stopPropagation()} className="p-8 h-full overflow-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold" style={{ color: colors.lightText }}>Skills</h2>
              </div>

              <div className="space-y-6 text-white text-sm">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Languages</h3>
                  <ul className="flex flex-wrap gap-3">
                    {['JavaScript', 'TypeScript', 'Python', 'C', 'C++', 'Bash', 'SQL', 'HTML', 'CSS'].map(skill => (
                      <li key={skill} className="px-3 py-1 rounded-full bg-white bg-opacity-20">{skill}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Frameworks & Libraries</h3>
                  <ul className="flex flex-wrap gap-3">
                    {['React', 'Node.js', 'Vue.js', 'Express', 'Tailwind CSS', 'Playwright', 'Mongoose'].map(skill => (
                      <li key={skill} className="px-3 py-1 rounded-full bg-white bg-opacity-20">{skill}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Cloud & Infrastructure</h3>
                  <ul className="flex flex-wrap gap-3">
                    {['GCP', 'Firebase', 'Cloud Run', 'Cloud Jobs', 'VPCs', 'IAM', 'Redis MemoryStore', 'Azure', 'Nutanix'].map(skill => (
                      <li key={skill} className="px-3 py-1 rounded-full bg-white bg-opacity-20">{skill}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">DevOps & Tooling</h3>
                  <ul className="flex flex-wrap gap-3">
                    {['CI/CD', 'GitHub Actions', 'Docker', 'Jenkins', 'Terraform', 'Git', 'VMWare Horizon', 'SSMS'].map(skill => (
                      <li key={skill} className="px-3 py-1 rounded-full bg-white bg-opacity-20">{skill}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Security & Auth</h3>
                  <ul className="flex flex-wrap gap-3">
                    {['Keycloak', 'SSO', 'OAuth', 'RBAC', 'Firewall Policies', 'Nessus'].map(skill => (
                      <li key={skill} className="px-3 py-1 rounded-full bg-white bg-opacity-20">{skill}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Data & Monitoring</h3>
                  <ul className="flex flex-wrap gap-3">
                    {['PostgreSQL', 'MongoDB', 'Power BI', 'Grafana', 'Google Analytics', 'Uptime Checks'].map(skill => (
                      <li key={skill} className="px-3 py-1 rounded-full bg-white bg-opacity-20">{skill}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        
        {/* Layer 4 - Education */}
        <div 
          className={`absolute rounded-lg shadow-lg transition-all duration-800 cursor-pointer ${
            activeSection === 'education' 
              ? 'inset-0 z-50' 
              : activeSection 
                ? 'opacity-0 scale-95' 
                : initialLoad 
                  ? 'opacity-0 scale-95 delay-500' 
                  : 'opacity-100 inset-[30%] scale-100'
          }`}
          style={{ 
            background: colors.layer4,
            transitionDelay: initialLoad ? '200ms' : '0ms'
          }}
          onClick={(e) => {
            if (!activeSection || activeSection === 'education') {
              e.stopPropagation();
              handleSectionClick('education');
            }
          }}
        >
          {activeSection === 'education' ? (
            <div onClick={(e) => e.stopPropagation()} className="p-8 h-full overflow-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold" style={{ color: colors.lightText }}>Education</h2>
              </div>
              
              <div className="bg-white bg-opacity-10 rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold" style={{ color: colors.lightText }}>Bachelor of Engineering</h3>
                </div>
                <h4 className="text-lg mb-2" style={{ color: colors.lightText }}>Computer Engineering, University of Victoria</h4>
                <p style={{ color: 'rgba(255,255,255,0.8)' }}>
                  Specialized in Computing Intelligence with coursework in machine learning, computer vision, and pattern recognition.
                </p>
              </div>
            </div>
          ) : null}
        </div>
        
        {/* Center - Personal Info */}
        <div 
          className={`absolute rounded-lg shadow-lg transition-all duration-800 ${
            activeSection 
              ? 'opacity-0 scale-95' 
              : initialLoad 
                ? 'opacity-0 scale-95 delay-600' 
                : 'opacity-100 inset-[40%] scale-100'
          }`}
          style={{ 
            background: colors.center,
            transitionDelay: initialLoad ? '0ms' : '0ms'
          }}
        >
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-4 cursor-pointer"
            onClick={() => setShowGame(true)}
          >
            <h1 className="text-xl md:text-2xl font-bold text-center uppercase tracking-wide font-mono" style={{ color: colors.lightText }}>Avni Salhotra</h1>
            <p className="text-sm md:text-base text-center uppercase tracking-wide mt-1 font-mono" style={{ color: 'rgba(255,255,255,0.8)' }}>Software Engineer</p>
          {/* EchoPet sprite logic with behavior map */}
          {(() => {
            const behaviorMap = {
              walkSide: { row: 0, direction: 'side' },
              sit:      { row: 2, direction: 'side' },
              idleWag:  { row: 3, direction: 'side' },
              asleep:   { row: 5, direction: 'side' },
            };
            return (
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '50%',
                  transform: `translateX(${dogX}%) scaleX(${echoDirection === 'left' ? -1 : 1})`,
                  width: '48px',
                  height: '48px',
                }}
              >
                <EchoPet
                  row={behaviorMap[echoState].row}
                  direction={behaviorMap[echoState].direction}
                />
              </div>
            );
          })()}
          </div>
        </div>
        
        {/* Retro border labels for each section */}
        {!activeSection && !initialLoad && (
          <>
            {/* Desktop view: corner-aligned retro labels */}
            <p className="hidden sm:block absolute bottom-[calc(0%+0.5rem)] right-[calc(0%+0.5rem)] text-xs sm:text-sm md:text-base font-mono text-black opacity-80 tracking-wider animate-pixelAppear">
              EXPERIENCE
            </p>
            <p className="hidden sm:block absolute bottom-[calc(10%+0.5rem)] right-[calc(10%+0.5rem)] text-xs sm:text-sm md:text-base font-mono text-black opacity-80 tracking-wider animate-pixelAppear">
              PROJECTS
            </p>
            <p className="hidden sm:block absolute bottom-[calc(20%+0.5rem)] right-[calc(20%+0.5rem)] text-xs sm:text-sm md:text-base font-mono text-black opacity-80 tracking-wider animate-pixelAppear">
              SKILLS
            </p>
            <p className="hidden sm:block absolute bottom-[calc(30%+0.5rem)] right-[calc(30%+0.5rem)] text-xs sm:text-sm md:text-base font-mono text-black opacity-80 tracking-wider animate-pixelAppear">
              EDUCATION
            </p>

            {/* Mobile view: Center stacked floating labels */}
            <div className="sm:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 space-y-1 text-center">
              {['EXPERIENCE', 'PROJECTS', 'SKILLS', 'EDUCATION'].map((label, i) => (
                <p key={label} className="text-xs font-mono text-black opacity-70 tracking-wider animate-pixelAppear">
                  {label}
                </p>
              ))}
            </div>
          </>
        )}
        {/* RETURN label for expanded section */}
        {activeSection && (
          <div className="absolute top-0 left-0 -translate-y-full ml-1 text-xs sm:text-sm md:text-base font-mono text-black opacity-80 tracking-wider cursor-pointer animate-pixelAppear"
               onClick={() => handleSectionClick(activeSection)}>
            ← RETURN
          </div>
        )}
      </div>
      {showGame && <GameOverlay onClose={() => setShowGame(false)} />}
    </div>
  );
};

export default LayeredSquaresResume;

// Retro pixel animation for section labels
<style>
  {`
    @keyframes pixelAppear {
      0% { opacity: 0; transform: scale(0.95) translateY(4px); filter: blur(1px); }
      100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
    }
    .animate-pixelAppear {
      animation: pixelAppear 0.6s ease-out forwards;
    }
  `}
</style>