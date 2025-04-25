// src/constants/experienceData.js
/**
 * Work experience data for the resume
 */
export const experienceEntries = [
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