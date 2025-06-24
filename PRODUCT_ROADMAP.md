# Portfolio Website Enhancement - Product Roadmap & Technical Design

**Document Version:** 1.0  
**Date:** December 2024  
**Author:** Principal Engineer + PM  
**Project Codename:** Portfolio 3.0

---

## Executive Summary

### Current State Analysis
The existing portfolio website (salhotra.dev) demonstrates strong technical capabilities through:
- Interactive React-based card system
- Custom HTML5 Canvas game engine
- Mobile-optimized touch interactions
- Production-grade deployment pipeline

### Problem Statement
**For Hiring Managers:** Current UX optimizes for exploration over scanability, creating friction for time-constrained evaluators who need quick candidate assessment.

**For Candidate:** Missing opportunities to showcase technical thought leadership and system design thinking through written content.

### Solution Overview
Transform the portfolio into a **progressive disclosure system** that serves multiple user personas while maintaining technical innovation as a core differentiator.

---

## Product Requirements

### User Personas

#### Primary: Hiring Manager (FAANG Staff Engineer roles)
- **Time constraint:** 30-60 seconds initial evaluation
- **Information needs:** Skills, experience level, technical depth evidence
- **Success criteria:** Can quickly assess fit and find reasons to dig deeper

#### Secondary: Technical Evaluator  
- **Time investment:** 5-15 minutes detailed review
- **Information needs:** Technical thinking, problem-solving approach, code quality
- **Success criteria:** Can evaluate technical leadership and system design capabilities

#### Tertiary: Peer Engineers
- **Engagement level:** Curious exploration
- **Information needs:** Creative solutions, technical innovation
- **Success criteria:** Memorable technical demonstration

### Core User Journeys

#### Journey 1: Quick Professional Assessment
```
Landing Page (30s scan) → Resume Hub → Download PDF
                                   → Blog (technical depth)
                                   → Targeted Resume Tool
```

#### Journey 2: Technical Deep Dive
```
Landing Page → Blog → Individual Posts → Explore Interactive Features → Game
```

#### Journey 3: Skill-Targeted Evaluation
```
Landing Page → Resume Hub → "Prefer targeted resume?" → Skill Selection → Custom Resume Generation → Download
```

---

## Technical Architecture

### Information Architecture Redesign

#### URL Structure
```
salhotra.dev/                    → Landing page (elevator pitch)
salhotra.dev/blog               → Technical blog index
salhotra.dev/blog/[slug]        → Individual blog posts
salhotra.dev/resume             → Resume hub (traditional + targeted)
salhotra.dev/resume/customize   → Skill selection interface
salhotra.dev/explore            → Interactive portfolio (current cards redesigned)
salhotra.dev/game              → Direct game access
salhotra.dev/resume.pdf        → Static PDF download
```

#### Component Architecture
```
src/
├── pages/
│   ├── Landing.jsx                 → New elevator pitch homepage
│   ├── Blog/
│   │   ├── BlogIndex.jsx          → Blog landing with post cards
│   │   ├── BlogPost.jsx           → Individual post template
│   │   └── PostmortemTemplate.jsx → Structured postmortem format
│   ├── Resume/
│   │   ├── ResumeHub.jsx          → Traditional + targeted options
│   │   ├── SkillSelector.jsx      → Interactive skill selection
│   │   ├── CustomResumeViewer.jsx → Generated resume display
│   │   └── PDFGenerator.jsx       → Resume to PDF conversion
│   ├── Explore.jsx                → Renamed interactive portfolio
│   └── Game.jsx                   → Existing game page
├── components/
│   ├── navigation/
│   │   ├── MainNavigation.jsx     → Portfolio/Blog tab system
│   │   └── BreadcrumbNav.jsx      → Contextual navigation
│   ├── landing/
│   │   ├── HeroSection.jsx        → Name, title, elevator pitch
│   │   ├── SkillsBadges.jsx       → Key technologies highlight
│   │   ├── CTAGrid.jsx            → Blog/Resume/Explore options
│   │   └── QuickStats.jsx         → Experience summary
│   ├── blog/
│   │   ├── PostCard.jsx           → Blog post preview cards
│   │   ├── PostContent.jsx        → Blog post content rendering
│   │   ├── CodeBlock.jsx          → Syntax highlighted code
│   │   ├── PostmortemStructure.jsx → Postmortem template components
│   │   └── TagSystem.jsx          → Post categorization
│   ├── resume/
│   │   ├── SkillCategory.jsx      → Grouped skill selection
│   │   ├── ExperienceRenderer.jsx → Dynamic experience display
│   │   ├── ProjectRenderer.jsx    → Dynamic project display
│   │   └── ResumePreview.jsx      → Generated resume preview
│   └── common/
│       ├── EchoPet/               → Existing sprite animation (preserved)
│       ├── Button.jsx             → Apple-inspired button components
│       ├── Card.jsx               → Consistent card styling
│       └── Typography.jsx         → Design system typography
├── hooks/
│   ├── useResumeGeneration.js     → Custom resume logic
│   ├── useSkillFiltering.js       → Skill-based content filtering
│   ├── useBlogData.js             → Blog content management
│   └── useAnalytics.js            → User interaction tracking
├── data/
│   ├── experienceBank.js          → Structured experience data
│   ├── projectsBank.js            → Structured project data
│   ├── skillsTaxonomy.js          → Skills categorization
│   └── blogPosts.js               → Blog content data
└── utils/
    ├── resumeGenerator.js         → Resume generation algorithms
    ├── pdfExporter.js             → PDF generation utilities
    └── contentFilters.js          → Content filtering logic
```

### Data Models

#### Experience Bank Structure
```javascript
const experienceBank = {
  "Google - Staff Engineer": {
    company: "Google",
    title: "Staff Engineer",
    startDate: "2022-01",
    endDate: "present",
    bullets: [
      {
        id: "google-1",
        text: "Led migration of payment system serving 10M+ users from monolith to microservices, reducing latency by 40%",
        skills: ["Go", "Kubernetes", "Technical Leadership", "System Design", "Microservices"],
        isTopImpressive: true,
        metrics: {
          scale: "10M+ users",
          improvement: "40% latency reduction"
        }
      },
      {
        id: "google-2",
        text: "Architected real-time event processing pipeline handling 1M events/second using Kafka and Go",
        skills: ["Go", "Apache Kafka", "Stream Processing", "System Design"],
        isTopImpressive: true,
        metrics: {
          scale: "1M events/second",
          technology: "Kafka + Go"
        }
      },
      {
        id: "google-3",
        text: "Mentored 4 junior engineers, with 3 receiving promotions within 18 months",
        skills: ["Technical Leadership", "Mentoring", "People Management"],
        isTopImpressive: false,
        metrics: {
          people: "4 engineers mentored",
          outcome: "75% promotion rate"
        }
      }
      // Additional bullets...
    ],
    contextualInfo: {
      teamSize: "12 engineers",
      scope: "Payment Infrastructure",
      technologies: ["Go", "Kubernetes", "GCP", "Kafka"]
    }
  },
  "Meta - Senior Engineer": {
    // Similar structure...
  }
  // Additional experiences...
};
```

#### Projects Bank Structure
```javascript
const projectsBank = {
  "salhotra.dev": {
    name: "Interactive Portfolio Website",
    description: "Production-grade portfolio with embedded Canvas game and mobile-first design",
    bullets: [
      {
        id: "portfolio-1",
        text: "Built custom HTML5 Canvas game engine with 60fps performance across mobile and desktop",
        skills: ["JavaScript", "Canvas API", "Game Development", "Performance Optimization"],
        isHighlight: true
      },
      {
        id: "portfolio-2", 
        text: "Implemented mobile-first responsive design with touch gesture navigation",
        skills: ["React", "CSS", "Mobile Development", "UX Design"],
        isHighlight: true
      }
      // Additional bullets...
    ],
    technologies: ["React", "Canvas API", "Tailwind CSS", "Cloudflare Pages"],
    githubUrl: "https://github.com/user/salhotra-dev",
    liveUrl: "https://salhotra.dev",
    featured: true
  }
  // Additional projects...
};
```

#### Skills Taxonomy
```javascript
const skillsTaxonomy = {
  "Programming Languages": {
    skills: ["Go", "TypeScript", "JavaScript", "Python", "Java"],
    priority: 1
  },
  "Frontend Technologies": {
    skills: ["React", "Vue.js", "HTML5", "CSS3", "Canvas API", "WebGL"],
    priority: 2
  },
  "Backend & Infrastructure": {
    skills: ["Node.js", "GraphQL", "REST APIs", "Microservices", "Event Sourcing"],
    priority: 2
  },
  "Cloud & DevOps": {
    skills: ["AWS", "GCP", "Kubernetes", "Docker", "Terraform", "CI/CD"],
    priority: 2
  },
  "Data & Messaging": {
    skills: ["PostgreSQL", "Redis", "Apache Kafka", "Elasticsearch", "MongoDB"],
    priority: 3
  },
  "Leadership & Process": {
    skills: ["Technical Leadership", "Mentoring", "System Design", "Architecture Review"],
    priority: 1
  }
};
```

### Resume Generation Algorithm

#### Core Logic Flow
```javascript
const generateTargetedResume = (selectedSkills, experienceBank, projectsBank) => {
  // 1. Process experiences
  const processedExperiences = Object.entries(experienceBank).map(([jobKey, jobData]) => {
    const matchingBullets = jobData.bullets.filter(bullet =>
      bullet.skills.some(skill => selectedSkills.includes(skill))
    );
    
    let finalBullets;
    if (matchingBullets.length > 0) {
      // Has relevant content - use matching bullets
      finalBullets = matchingBullets;
    } else {
      // No relevant content - use top 2 impressive bullets as fallback
      finalBullets = jobData.bullets
        .filter(bullet => bullet.isTopImpressive)
        .slice(0, 2);
    }
    
    return {
      ...jobData,
      bullets: finalBullets,
      relevanceScore: matchingBullets.length,
      hasTargetedContent: matchingBullets.length > 0
    };
  });
  
  // 2. Process projects
  const processedProjects = Object.entries(projectsBank)
    .map(([projectKey, projectData]) => {
      const matchingBullets = projectData.bullets.filter(bullet =>
        bullet.skills.some(skill => selectedSkills.includes(skill))
      );
      
      const relevanceScore = projectData.technologies
        .filter(tech => selectedSkills.includes(tech)).length +
        matchingBullets.length;
      
      return {
        ...projectData,
        bullets: matchingBullets.length > 0 
          ? matchingBullets 
          : projectData.bullets.filter(bullet => bullet.isHighlight),
        relevanceScore,
        hasTargetedContent: matchingBullets.length > 0
      };
    })
    .filter(project => project.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 3); // Top 3 most relevant projects
  
  // 3. Generate summary statistics
  const stats = {
    totalSelectedSkills: selectedSkills.length,
    experiencesWithTargetedContent: processedExperiences.filter(exp => exp.hasTargetedContent).length,
    projectsWithTargetedContent: processedProjects.filter(proj => proj.hasTargetedContent).length,
    generationTimestamp: new Date().toISOString()
  };
  
  return {
    experiences: processedExperiences,
    projects: processedProjects,
    selectedSkills,
    stats
  };
};
```

---

## User Experience Design

### Apple Design System Implementation

#### Typography Scale
```css
/* San Francisco Pro inspired hierarchy */
.text-title-1     { font-size: 28px; font-weight: 700; line-height: 1.1; }
.text-title-2     { font-size: 22px; font-weight: 600; line-height: 1.2; }
.text-title-3     { font-size: 20px; font-weight: 600; line-height: 1.25; }
.text-headline    { font-size: 17px; font-weight: 600; line-height: 1.3; }
.text-body        { font-size: 17px; font-weight: 400; line-height: 1.47; }
.text-callout     { font-size: 16px; font-weight: 400; line-height: 1.4; }
.text-subhead     { font-size: 15px; font-weight: 400; line-height: 1.35; }
.text-footnote    { font-size: 13px; font-weight: 400; line-height: 1.38; }
.text-caption-1   { font-size: 12px; font-weight: 400; line-height: 1.35; }
.text-caption-2   { font-size: 11px; font-weight: 400; line-height: 1.15; }
```

#### Color System
```css
:root {
  /* Apple-inspired color palette */
  --color-primary: #007AFF;        /* iOS Blue */
  --color-secondary: #5856D6;      /* iOS Purple */
  --color-success: #34C759;        /* iOS Green */
  --color-warning: #FF9500;        /* iOS Orange */
  --color-error: #FF3B30;          /* iOS Red */
  
  /* Text colors */
  --color-text-primary: #000000;
  --color-text-secondary: #3C3C43;
  --color-text-tertiary: #3C3C4399;
  --color-text-quaternary: #3C3C434D;
  
  /* Background colors */
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F2F2F7;
  --color-bg-tertiary: #FFFFFF;
  
  /* System colors for dark mode */
  @media (prefers-color-scheme: dark) {
    --color-text-primary: #FFFFFF;
    --color-text-secondary: #EBEBF5;
    --color-text-tertiary: #EBEBF599;
    --color-text-quaternary: #EBEBF54D;
    
    --color-bg-primary: #000000;
    --color-bg-secondary: #1C1C1E;
    --color-bg-tertiary: #2C2C2E;
  }
}
```

### Landing Page Wireframe

#### Mobile Layout (Primary)
```
┌─────────────────────────┐
│   ☰                     │  ← Navigation indicator
│                        │
│   Avni Salhotra        │  ← text-title-1
│   Staff Engineer       │  ← text-headline, secondary color
│                        │
│   Building scalable     │  ← text-body, primary text
│   systems at [Company] │
│   and leading teams.    │
│                        │
│   ┌─ React ──┐ ┌─ Go ──┐│  ← Skill badges
│   └─────────┘ └───────┘│
│   ┌─ AWS ───┐ ┌─ K8s ─┐│
│   └─────────┘ └───────┘│
│                        │
│   ┌─────────────────────┐│
│   │ 📝 Technical Blog   ││  ← Primary CTA
│   │ Postmortem Wednesday││
│   └─────────────────────┘│
│                        │
│   ┌─────────────────────┐│
│   │ 📄 Resume           ││  ← Secondary CTA
│   │ Traditional & Custom││
│   └─────────────────────┘│
│                        │
│   ┌─────────────────────┐│
│   │ 🎯 Explore My Craft ││  ← Tertiary CTA
│   │ Interactive deep dive││
│   └─────────────────────┘│
│                        │
│   [Scroll for more]     │  ← Hint for additional content
└─────────────────────────┘
```

### Blog Design Patterns

#### Postmortem Wednesday Template
```
┌─────────────────────────┐
│   ← Back to Blog       │  ← Clear navigation
│                        │
│   POSTMORTEM WEDNESDAY  │  ← Category badge (red)
│   December 18, 2024     │  ← Date, tertiary text
│                        │
│   The Great Database    │  ← title-1
│   Lock of 2024         │
│                        │
│   [Hero image/diagram]  │  ← Optional visual
│                        │
│   Context               │  ← section headers (title-3)
│   Production API slow   │  ← body text
│   responses affecting   │
│   40% of users...       │
│                        │
│   Impact                │
│   • 10s response times  │  ← Structured lists
│   • 40% user drop-off   │
│   • $2K revenue loss    │
│                        │
│   Root Cause           │
│   [Technical details    │
│    with code blocks]    │
│                        │
│   ┌─ Key Takeaways ───┐│  ← Summary card
│   │ Always use conn    ││
│   │ pools for DB       ││
│   │ connections        ││
│   └────────────────────┘│
│                        │
│   [Related posts]      │  ← Footer navigation
└─────────────────────────┘
```

### Resume Generation Interface

#### Skill Selection Flow
```
┌─────────────────────────┐
│   Custom Resume Builder │  ← page title
│                        │
│   Select skills you're  │  ← Instructions
│   looking for:          │
│                        │
│   Programming Languages │  ← Category headers
│   ┌─ Go ✓─┐ ┌─ Python ─┐│  ← Toggle buttons
│   └───────┘ └─────────┘│
│   ┌─ TypeScript ✓─┐     │
│   └─────────────┘      │
│                        │
│   Frontend Technologies │
│   ┌─ React ✓─┐ ┌─ Vue ──┐│
│   └─────────┘ └───────┘│
│                        │
│   Leadership            │
│   ┌─ Tech Lead ✓─┐      │
│   └─────────────┘      │
│                        │
│   Selected: 4 skills    │  ← Counter feedback
│                        │
│   ┌─────────────────────┐│
│   │ Generate Resume     ││  ← Action button
│   └─────────────────────┘│
└─────────────────────────┘
```

#### Generated Resume Preview
```
┌─────────────────────────┐
│   Generated Resume      │  ← page title
│                        │
│   Targeting: Go, React, │  ← Selected skills summary
│   TypeScript, Tech Lead │
│                        │
│   ┌─────────────────────┐│
│   │   AVNI SALHOTRA     ││  ← Resume content
│   │   Staff Engineer    ││
│   │                    ││
│   │   EXPERIENCE        ││
│   │   Google (2022-now) ││
│   │   • Led migration...││  ← Filtered bullets
│   │   • Architected...  ││
│   │                    ││
│   │   Meta (2020-2022)  ││
│   │   • Built React...  ││  ← Relevant content
│   │                    ││
│   │   PROJECTS          ││
│   │   salhotra.dev      ││
│   │   • Canvas game...  ││
│   │                    ││
│   └─────────────────────┘│
│                        │
│   ┌─ Download PDF ─────┐│  ← Export options
│   └────────────────────┘│
│   ┌─ Edit Skills ──────┐│
│   └────────────────────┘│
│   ┌─ Share Link ───────┐│
│   └────────────────────┘│
└─────────────────────────┘
```

---

## Implementation Roadmap

### Phase 1: Foundation (Weeks 1-2)
**Scope:** Core architecture and landing page

#### Sprint 1.1: Architecture Setup
- [ ] Create new routing structure (`/`, `/blog`, `/resume`, `/explore`)
- [ ] Implement Apple-inspired design system components
- [ ] Set up data models for experience bank and projects bank
- [ ] Create navigation component with tab system

#### Sprint 1.2: Landing Page
- [ ] Build hero section with elevator pitch
- [ ] Implement skills badges component
- [ ] Create CTA grid (Blog, Resume, Explore)
- [ ] Add quick stats section
- [ ] Responsive mobile-first implementation

**Deliverable:** Functional landing page with navigation to all sections

### Phase 2: Content Systems (Weeks 3-4)
**Scope:** Blog infrastructure and content management

#### Sprint 2.1: Blog Framework
- [ ] Create blog index page with post cards
- [ ] Implement individual blog post template
- [ ] Build postmortem-specific template structure
- [ ] Add code syntax highlighting
- [ ] Create tag/category system

#### Sprint 2.2: Content Creation
- [ ] Write 3-5 initial "Postmortem Wednesday" posts
- [ ] Create blog post data structure
- [ ] Implement blog navigation and search
- [ ] Add social sharing capabilities

**Deliverable:** Functional blog with initial content demonstrating technical depth

### Phase 3: Resume Hub (Weeks 5-6)
**Scope:** Traditional and targeted resume functionality

#### Sprint 3.1: Resume Hub Page
- [ ] Create resume hub layout (traditional + targeted options)
- [ ] Implement PDF download for traditional resume
- [ ] Build "prefer targeted resume?" invitation section
- [ ] Add analytics tracking for feature discovery

#### Sprint 3.2: Skill Selection Interface
- [ ] Build skill taxonomy and categorization
- [ ] Create interactive skill selection UI
- [ ] Implement skill counter and selection feedback
- [ ] Add skill combination suggestions

**Deliverable:** Resume hub with traditional download and skill selection interface

### Phase 4: Resume Generation Engine (Weeks 7-8)
**Scope:** Core targeted resume functionality

#### Sprint 4.1: Data Processing
- [ ] Implement experience bank data structure
- [ ] Create project bank with skill tagging
- [ ] Build resume generation algorithm
- [ ] Add content filtering and ranking logic

#### Sprint 4.2: Resume Viewer & Export
- [ ] Create generated resume preview component
- [ ] Implement PDF generation from custom resume
- [ ] Add resume sharing and permalink functionality
- [ ] Build edit/regeneration workflow

**Deliverable:** End-to-end targeted resume generation and export

### Phase 5: Interactive Portfolio Migration (Weeks 9-10)
**Scope:** Redesign existing interactive elements

#### Sprint 5.1: Explore Section Redesign
- [ ] Rebrand interactive cards as "Explore My Craft"
- [ ] Restructure content focus (methodology vs. resume info)
- [ ] Improve card content and interactions
- [ ] Integrate game as "creative engineering" demonstration

#### Sprint 5.2: Polish & Integration
- [ ] Ensure seamless navigation between all sections
- [ ] Add cross-section linking and related content
- [ ] Implement progressive enhancement
- [ ] Performance optimization and testing

**Deliverable:** Redesigned interactive portfolio integrated with new architecture

### Phase 6: Polish & Launch (Weeks 11-12)
**Scope:** Final optimization and deployment

#### Sprint 6.1: User Experience Polish
- [ ] Comprehensive mobile testing and optimization
- [ ] Accessibility audit and improvements
- [ ] Loading states and error handling
- [ ] Animation and transition polish

#### Sprint 6.2: Launch Preparation
- [ ] SEO optimization for all new pages
- [ ] Analytics implementation
- [ ] Performance monitoring setup
- [ ] Documentation and maintenance guides

**Deliverable:** Production-ready Portfolio 3.0 with full feature set

---

## Success Metrics

### User Engagement Metrics
- **Landing page bounce rate** < 40% (current baseline: ~60%)
- **Time to key information** < 30 seconds (hiring manager scan)
- **Blog engagement**: Average 2+ minutes per post
- **Resume generation usage**: 10%+ of resume hub visitors

### Technical Metrics
- **Mobile page load speed** < 3 seconds
- **Resume generation time** < 2 seconds
- **Cross-browser compatibility** 95%+ (Chrome, Safari, Firefox)
- **Accessibility score** AA compliance (WCAG 2.1)

### Business Impact Metrics
- **Interview conversion rate** improvement (qualitative feedback)
- **Technical discussion starters** from portfolio features
- **Hiring manager positive feedback** on targeted resume feature
- **Industry recognition** of innovative approach

### Feature Adoption Metrics
- **Blog subscription rate** (if implemented)
- **Targeted resume generation rate** vs traditional download
- **Skill combination patterns** (most requested combinations)
- **Interactive portfolio exploration rate** from landing page

---

## Risk Assessment & Mitigation

### Technical Risks

#### High Priority
1. **Resume Generation Performance**
   - *Risk*: Complex filtering algorithms causing slow generation
   - *Mitigation*: Implement caching, optimize algorithms, add loading states

2. **Mobile Experience Complexity**
   - *Risk*: Too many features overwhelming mobile users
   - *Mitigation*: Progressive disclosure, clear navigation hierarchy

3. **Content Management Scalability**
   - *Risk*: Manual blog post management becoming unwieldy
   - *Mitigation*: Structured data models, potential CMS integration future

#### Medium Priority
1. **Browser Compatibility**
   - *Risk*: Advanced features not working on older browsers
   - *Mitigation*: Progressive enhancement, feature detection

2. **PDF Generation Reliability**
   - *Risk*: PDF export failing on various devices/browsers
   - *Mitigation*: Multiple PDF generation approaches, fallback options

### Product Risks

#### High Priority
1. **Feature Complexity Overwhelming Users**
   - *Risk*: Too many options confusing hiring managers
   - *Mitigation*: Clear default paths, optional advanced features

2. **Targeted Resume Quality**
   - *Risk*: Generated resumes feeling impersonal or poorly formatted
   - *Mitigation*: Careful algorithm tuning, professional template design

#### Medium Priority
1. **SEO Impact from Architecture Changes**
   - *Risk*: Losing search rankings during redesign
   - *Mitigation*: Proper redirects, gradual migration, SEO optimization

2. **Maintenance Overhead**
   - *Risk*: Complex system requiring significant ongoing updates
   - *Mitigation*: Modular architecture, comprehensive documentation

---

## Technical Specifications

### Performance Requirements
- **First Contentful Paint**: < 1.5 seconds
- **Largest Contentful Paint**: < 2.5 seconds
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Browser Support
- **Primary**: Chrome 90+, Safari 14+, Firefox 88+
- **Secondary**: Edge 90+, Chrome Mobile 90+, Safari Mobile 14+
- **Progressive Enhancement**: Graceful degradation for older browsers

### Security Requirements
- **HTTPS**: All traffic encrypted
- **Content Security Policy**: Implemented and tested
- **Input Sanitization**: All user inputs validated
- **Data Privacy**: No personal data collection without consent

### Accessibility Requirements
- **WCAG 2.1 AA**: Full compliance
- **Keyboard Navigation**: All features accessible via keyboard
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: Minimum 4.5:1 ratio for normal text

---

## Dependencies & Constraints

### Technical Dependencies
- **React 18+**: Core framework
- **React Router**: Client-side routing
- **Tailwind CSS**: Styling framework
- **PDF Generation Library**: TBD (react-pdf, jsPDF, or puppeteer)
- **Syntax Highlighting**: Prism.js or highlight.js
- **Analytics**: Google Analytics 4 or alternative

### External Constraints
- **Hosting**: Cloudflare Pages (existing)
- **Domain**: salhotra.dev (existing)
- **Budget**: $0 additional monthly costs preferred
- **Timeline**: 12 weeks for full implementation

### Content Constraints
- **Blog Posts**: Minimum 5 technical posts for launch
- **Experience Data**: Complete skill tagging for all roles
- **Project Data**: Detailed bullet points for all projects
- **Resume Variants**: Traditional PDF must remain high-quality

---

## Post-Launch Roadmap

### Short-term Enhancements (3-6 months)
- **Blog Features**: Comments, newsletter signup, RSS feed
- **Resume Analytics**: Track which skill combinations are most popular
- **Content Expansion**: Weekly blog posting schedule
- **SEO Optimization**: Comprehensive technical SEO audit

### Medium-term Features (6-12 months)
- **Multi-language Support**: Internationalization framework
- **Advanced Resume Templates**: Multiple professional formats
- **API Integration**: GitHub stats, contribution graphs
- **Progressive Web App**: Offline functionality, app-like experience

### Long-term Vision (12+ months)
- **AI-Powered Content**: Automated resume optimization suggestions
- **Community Features**: Guest posts, technical interview preparation
- **Course/Tutorial Integration**: Technical education content
- **Enterprise Features**: Recruiter dashboard, candidate matching

---

## Conclusion

This roadmap transforms the existing portfolio from an impressive technical demonstration into a **strategic career tool** that serves multiple audiences while maintaining its innovative character.

The progressive disclosure approach ensures hiring managers get immediate value while preserving the creative engineering showcase for deeper exploration. The targeted resume feature provides unique value that differentiates the candidate in a competitive market.

The 12-week implementation timeline is aggressive but achievable with focused execution and clear priorities. The modular architecture ensures features can be delivered incrementally while maintaining system stability.

**Key Success Factors:**
1. **User-first design**: Every feature serves a clear user need
2. **Technical excellence**: Maintaining high performance and reliability standards
3. **Content quality**: Blog posts demonstrate genuine technical depth
4. **Iterative improvement**: Regular user feedback and feature refinement

This portfolio will position the candidate as a **technical leader who understands both engineering and product** - exactly what FAANG companies seek in Staff Engineer roles.