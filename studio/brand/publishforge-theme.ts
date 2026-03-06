/**
 * PublishForge Brand Theme
 * ─────────────────────────────────────────────────────────────
 * Design tokens for the PublishForge landing page, aligned with
 * the WebriQ/StackShift visual identity.
 *
 * Usage in tailwind.config.ts:
 *   import { publishforgeTokens } from './studio/brand/publishforge-theme'
 *
 * Usage in Sanity Studio theme:
 *   import { PublishForgeStudioTheme } from './studio/brand/publishforge-theme'
 */

import { buildLegacyTheme } from "sanity";

// ─── COLOR PALETTE ────────────────────────────────────────────
export const publishforgeColors = {
  // Core brand
  navyDeep:       "#071430",
  navy:           "#0d1f3c",
  navyMid:        "#0a2a5e",
  blue:           "#093fe0",
  blueMid:        "#1a56db",
  cyan:           "#00cfde",
  cyanLight:      "#e0fafd",

  // Accent
  orange:         "#f97316",
  orangeDark:     "#ea580c",

  // Neutrals
  white:          "#ffffff",
  gray50:         "#f8fafc",
  gray100:        "#f1f5f9",
  gray200:        "#e2e8f0",
  gray600:        "#475569",
  gray700:        "#334155",

  // Semantic
  success:        "#10b981",
  warning:        "#f59e0b",
  error:          "#ef4444",
};

// ─── CSS CUSTOM PROPERTIES (inject into :root) ────────────────
export const publishforgeCSSVars = `
  --pf-navy-deep:    ${publishforgeColors.navyDeep};
  --pf-navy:         ${publishforgeColors.navy};
  --pf-navy-mid:     ${publishforgeColors.navyMid};
  --pf-blue:         ${publishforgeColors.blue};
  --pf-blue-mid:     ${publishforgeColors.blueMid};
  --pf-cyan:         ${publishforgeColors.cyan};
  --pf-cyan-light:   ${publishforgeColors.cyanLight};
  --pf-orange:       ${publishforgeColors.orange};
  --pf-orange-dark:  ${publishforgeColors.orangeDark};

  /* Tailwind channel overrides for the PublishForge page */
  --color-primary:            9, 63, 224;     /* #093fe0 blue */
  --color-secondary:          0, 207, 222;    /* #00cfde cyan */
  --color-background:         248, 250, 252;  /* #f8fafc */
  --color-primary-foreground: 255, 255, 255;
`;

// ─── TAILWIND EXTENSION ───────────────────────────────────────
export const publishforgeTailwindExtension = {
  colors: {
    "pf-navy":       publishforgeColors.navy,
    "pf-navy-deep":  publishforgeColors.navyDeep,
    "pf-blue":       publishforgeColors.blue,
    "pf-blue-mid":   publishforgeColors.blueMid,
    "pf-cyan":       publishforgeColors.cyan,
    "pf-cyan-light": publishforgeColors.cyanLight,
    "pf-orange":     publishforgeColors.orange,
  },
  backgroundImage: {
    "pf-hero":    `linear-gradient(135deg, ${publishforgeColors.navyDeep} 0%, ${publishforgeColors.navy} 40%, ${publishforgeColors.navyMid} 70%, ${publishforgeColors.navyDeep} 100%)`,
    "pf-section": `linear-gradient(135deg, ${publishforgeColors.navyDeep}, ${publishforgeColors.navyMid})`,
    "pf-stats":   `linear-gradient(135deg, ${publishforgeColors.blue}, ${publishforgeColors.blueMid})`,
    "pf-brand":   `linear-gradient(135deg, ${publishforgeColors.blue}, ${publishforgeColors.cyan})`,
    "pf-cta":     `linear-gradient(135deg, ${publishforgeColors.navyDeep}, ${publishforgeColors.navyMid}, ${publishforgeColors.navyDeep})`,
  },
  fontFamily: {
    sans: ["Inter", "system-ui", "sans-serif"],
  },
  boxShadow: {
    "pf-btn-primary":  "0 4px 20px rgba(249, 115, 22, 0.35)",
    "pf-btn-blue":     "0 4px 20px rgba(9, 63, 224, 0.30)",
    "pf-card":         "0 8px 30px rgba(9, 63, 224, 0.08)",
    "pf-glow-cyan":    "0 0 24px rgba(0, 207, 222, 0.40)",
  },
  keyframes: {
    gradientShift: {
      "0%, 100%": { backgroundPosition: "0% 50%" },
      "50%":       { backgroundPosition: "100% 50%" },
    },
    pulseGlow: {
      "0%, 100%": { boxShadow: "0 0 0 0 rgba(0, 207, 222, 0.3)" },
      "50%":      { boxShadow: "0 0 0 12px rgba(0, 207, 222, 0)" },
    },
    fadeUp: {
      from: { opacity: "0", transform: "translateY(28px)" },
      to:   { opacity: "1", transform: "translateY(0)" },
    },
  },
  animation: {
    "gradient-shift": "gradientShift 12s ease infinite",
    "pulse-glow":     "pulseGlow 2s ease-in-out infinite",
    "fade-up":        "fadeUp 0.7s ease both",
  },
};

// ─── SANITY STUDIO THEME ──────────────────────────────────────
export const PublishForgeStudioTheme = buildLegacyTheme({
  "--gray":       "#666",
  "--gray-base":  "#666",

  "--component-bg":         "#ffffff",
  "--component-text-color": publishforgeColors.navy,

  /** Brand blue as primary */
  "--primary":                      publishforgeColors.blue,
  "--default-button-color":         "#666",
  "--default-button-primary-color": publishforgeColors.blue,
  "--default-button-success-color": publishforgeColors.blue,
  "--default-button-warning-color": publishforgeColors.orange,
  "--default-button-danger-color":  "#ef4444",

  "--state-info-color":    publishforgeColors.blue,
  "--state-success-color": publishforgeColors.success,
  "--state-warning-color": publishforgeColors.warning,
  "--state-danger-color":  publishforgeColors.error,

  /** Dark navy nav bar — matches the landing page header */
  "--main-navigation-color":          publishforgeColors.navy,
  "--main-navigation-color--inverted": publishforgeColors.white,

  "--focus-color": publishforgeColors.cyan,
});

export default PublishForgeStudioTheme;
