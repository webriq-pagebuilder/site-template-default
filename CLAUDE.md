# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`site-template-default` is a Next.js site template with Sanity Studio integration. It serves as the base template for StackShift-powered sites, containing reusable section components with multiple variants per component.

## Development Commands

```bash
yarn dev        # Start dev server
yarn build      # Build for production
yarn studio     # Start Sanity Studio
```

## Architecture

### Directory Structure

- `components/` - React section components
  - `list.tsx` - Component registry (register new components here)
  - `sections/` - One folder per section component, each with variant files
- `schemas/` - Sanity schema definitions
  - `schema.ts` - Main schema entry (uncomment custom schema lines here)
  - `custom/` - Custom schema plugins
- `pages/` - Next.js pages
- `studio/` - Sanity Studio configuration
- `hooks/` - Custom React hooks
- `utils/` - Helper utilities

### Component Variant Pattern

Each section component follows this structure:

```
components/sections/{componentName}/
├── index.tsx        ← Variant router (switch on variant key)
├── variant_a.tsx
├── variant_b.tsx
└── variant_z.tsx    ← Custom variants added here
```

## Custom Variants

See [`CUSTOM_VARIANT_WORKFLOW.md`](./CUSTOM_VARIANT_WORKFLOW.md) for the full guide on adding new component variants and registering them in Sanity Studio (file structure, schema registration, initialValues, and both Scenario A/B workflows).
