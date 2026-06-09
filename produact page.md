---
name: Precision Engineering System
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3e4850'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6e7881'
  outline-variant: '#bdc8d1'
  surface-tint: '#00658d'
  primary: '#00658d'
  on-primary: '#ffffff'
  primary-container: '#00aeef'
  on-primary-container: '#003e58'
  inverse-primary: '#82cfff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#006c49'
  on-tertiary: '#ffffff'
  tertiary-container: '#10b981'
  on-tertiary-container: '#00422b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c6e7ff'
  primary-fixed-dim: '#82cfff'
  on-primary-fixed: '#001e2d'
  on-primary-fixed-variant: '#004c6b'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  technical-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.5'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The design system is engineered for a premium industrial manufacturing context, projecting an image of structural integrity, technological sophistication, and corporate reliability. The aesthetic blends **Corporate Modern** professionalism with **Minimalist** precision, utilizing high-density layouts and technical details to evoke the feeling of a high-end engineering firm.

The UI should feel "constructed" rather than "drawn." This is achieved through rigid alignment, subtle technical patterns (such as micro-grids and blueprint-inspired line work), and a disciplined use of whitespace. The emotional response should be one of absolute trust and industrial capability, catering to B2B stakeholders and large-scale procurement officers who value accuracy and legacy.

## Colors

The palette is anchored by a high-contrast relationship between **Engineering Blue** (Primary) and **Deep Navy** (Secondary), representing the sky-high ambition and the grounded, industrial strength of the enterprise.

- **Primary (#00AEEF):** Used for primary calls-to-action, focus states, and key data points. It provides a vibrant, technology-forward energy.
- **Secondary (#0F172A):** Used for heavy structural elements, headers, and navigation to provide a sense of authority and permanence.
- **Tertiary/Success (#10B981):** Specifically reserved for trust indicators, such as GST Verified badges and positive growth metrics.
- **Surface & Background (#FFFFFF / #F8FAFC):** Pure white for core content areas with light gray alternates for section differentiation and industrial "sheet metal" containers.
- **Neutral/Slate (#64748B):** A professional range of grays for secondary text and technical labels, ensuring high legibility without the harshness of pure black.

## Typography

This design system utilizes **Inter** for all primary communications due to its exceptional legibility and systematic construction. 

- **Structural Hierarchy:** Headlines utilize bold and extra-bold weights to mimic the weight of industrial beams and machinery.
- **Technical Accents:** For specific data points, coordinates, or part numbers, a secondary monospaced font (JetBrains Mono) is introduced to provide a "spec-sheet" aesthetic.
- **Caps for Labels:** Small labels and "Trust" badges use uppercase styling with increased letter spacing to create a sense of professional labeling and categorization.

## Layout & Spacing

The layout is built on a **12-column fixed grid** for desktop, ensuring content remains centered and readable on high-resolution displays common in corporate environments. 

- **Grid Geometry:** Use a strict 8px base unit for all padding and margins. Gutters are kept wide at 24px to provide "breathing room" between complex industrial data sets.
- **Fluid Adaptation:** On tablet (768px - 1024px), transition to an 8-column grid. On mobile, use a single-column layout with 16px side margins.
- **Technical Overlays:** Backgrounds should occasionally feature a "grid-paper" pattern (1px strokes at 32px intervals) to reinforce the engineering theme.

## Elevation & Depth

Depth in the design system is communicated through **Low-contrast outlines** and **Glassmorphism**, avoiding heavy, organic shadows in favor of crisp, technical layering.

- **Tonal Layers:** Use `#F8FAFC` for background cards to separate them from the pure white `#FFFFFF` page surface. 
- **Industrial Precision Borders:** Elements should be defined by 1px borders in `#E2E8F0`.
- **Engineering Glass:** Modals and navigation overlays use a backdrop blur (12px to 20px) with a semi-transparent white tint (80% opacity) to create a clean, modern "control room" feel.
- **Interaction Depth:** On hover, primary cards should not lift via shadow, but rather transition their border color to the Primary Sky Blue.

## Shapes

The shape language is "Soft" (0.25rem radius), striking a balance between the harshness of raw industrial steel and the approachability of modern software. This slight rounding suggests precision manufacturing—where edges are chamfered or finished—rather than raw, unrefined material.

Full-pill rounding (3) is reserved exclusively for small status indicators like "GST Verified" or "Active State" chips.

## Components

- **High-Contrast Buttons:** Primary buttons use a solid Sky Blue fill with white text. They are rectangular with a 4px corner radius. No gradients.
- **Industrial Cards:** Cards feature a 1px slate-200 border. For the "Legacy & Evolution" section, cards are connected by a vertical or horizontal 2px primary blue line to form a timeline.
- **Trust Badges:** Verified badges for GST or certifications must feature the Tertiary Emerald color, a small checkmark icon, and be styled as "Pill" shapes.
- **Technical Input Fields:** Form fields use a light gray background (#F1F5F9) and a 1px bottom-border by default, transitioning to a full primary blue border on focus.
- **Experience Counters:** Large numerical displays (e.g., "25+ Years") should use the Display-LG typography weight in Secondary Navy, accompanied by a small Sky Blue technical icon.
- **Supply Network Icons:** Use thin-stroke (1.5pt) SVG icons with geometric shapes, avoiding overly rounded or "bubbly" illustrations.