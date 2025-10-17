## 🧠 Copilot Context (Developer Setup)

This project uses a **custom Copilot configuration** to guide AI-generated code toward the DFRNT e-commerce stack conventions.

**Copilot understands the following architecture:**

- **Framework:** Next.js 13+ (App Router) + TypeScript  
- **Styling:** TailwindCSS + CVA variants  
- **Animations:** GSAP (custom hooks via `useGsap*`)  
- **State:** zustand (UI) + React Query (server data)  
- **CMS:** Strapi (products, content)  
- **Database/Auth:** Supabase (Postgres + Auth)  
- **Deployment:** Vercel  
- **Validation:** Zod  
- **Analytics:** PostHog / Plausible  
- **Monitoring:** Sentry  

**Copilot guidelines:**
- Organize by **domain** (`/src/domains/cart`, `/src/domains/catalog`, etc.)  
- Use **typed API clients** (`/src/lib/strapi/client.ts`, `/src/lib/supabase/client.ts`)  
- Keep **server components** for static content and **client components** for interactivity  
- Favor **React Query** for data fetching, **zustand** for local UI state  
- Use **Tailwind utility-first classes** and **variants** for design consistency  
- Write clear, documented, modular, and production-grade code  

💡 **Copilot config:** stored in `/.copilot/config.json`  
It ensures AI suggestions follow DFRNT’s conventions, architecture, and naming style.
