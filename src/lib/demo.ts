/**
 * Demo Mode Configuration
 *
 * When NEXT_PUBLIC_DEMO_MODE=true (default), pages use hardcoded mock data.
 * When NEXT_PUBLIC_DEMO_MODE=false, pages fetch from real API endpoints.
 *
 * This ensures the prototype/demo is never affected by development.
 */

export const IS_DEMO = process.env.NEXT_PUBLIC_DEMO_MODE !== "false";
