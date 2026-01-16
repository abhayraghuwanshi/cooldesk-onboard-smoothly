/**
 * WORKSPACES CONFIGURATION
 *
 * This file contains all workspace data for the trending projects section.
 * The system is designed to handle 1000+ workspaces elegantly with:
 * - Pagination (12 items per page)
 * - Category filtering
 * - Search functionality
 * - Automatic sorting by trending rank
 *
 * HOW TO ADD NEW WORKSPACES:
 *
 * 1. Choose the correct category:
 *    - 'ai-ml': AI & ML Projects
 *    - 'dev-tools': Development Tools & Frameworks
 *    - 'design-systems': Design Systems & UI Kits
 *    - 'startup-product': Startup & Product Collections
 *
 * 2. Add your workspace object to the array following this template:
 *
 *    {
 *        id: 'unique-id',                    // lowercase, hyphenated
 *        title: 'Project Name',              // Display name
 *        description: 'Brief description',   // 1-2 sentences
 *        category: 'category-name',          // One of the 4 categories above
 *        tags: ['Tag1', 'Tag2', 'Tag3'],    // Relevant keywords (3-5 recommended)
 *        urls: {
 *            main: 'https://...',            // Primary website (recommended)
 *            docs: 'https://...',            // Documentation (optional)
 *            github: 'https://...',          // GitHub repo (optional)
 *            demo: 'https://...',            // Live demo (optional)
 *            playground: 'https://...',      // Interactive playground (optional)
 *            npm: 'https://...',             // NPM package (optional)
 *            discord: 'https://...'          // Discord community (optional)
 *        },
 *        trending: {
 *            badge: 'HOT' | 'NEW' | 'TRENDING',  // Pick one (optional)
 *            rank: 1,                             // Lower number = higher priority
 *            reason: 'Why it\'s trending'         // Short text (optional)
 *        },
 *        icon: '🚀',                         // Single emoji
 *        featured: true,                      // Optional: Show in featured section
 *        addedDate: '2025-01-16'             // Optional: When added (YYYY-MM-DD)
 *    }
 *
 * 3. TIPS FOR SCALABILITY:
 *    - Use consistent formatting for easy maintenance
 *    - Add comments to group related projects
 *    - Keep descriptions concise (under 100 characters)
 *    - Verify all URLs before adding
 *    - Use appropriate trending badges sparingly
 *    - Set rank within category (1-20 is good range)
 *
 * Current count: 90+ workspaces across 38 categories
 * Target: 200-500 high-quality workspaces
 * Max capacity: 1000+ workspaces (with pagination)
 */

export interface ProjectWorkspace {
    id: string;
    title: string;
    description: string;
    category: WorkspaceCategory;
    tags: string[];

    // URLs - multiple links per project
    urls: {
        main?: string;
        docs?: string;
        github?: string;
        demo?: string;
        playground?: string;
        npm?: string;
        discord?: string;
    };

    // Trending indicators
    trending: {
        badge?: 'NEW' | 'HOT' | 'TRENDING';
        rank?: number;
        reason?: string;
    };

    // Visual elements
    icon?: string;

    // Metadata for better sorting/filtering
    featured?: boolean;
    addedDate?: string;
}

export type WorkspaceCategory =
    // Development
    | 'frontend'
    | 'backend'
    | 'fullstack'
    | 'mobile'
    | 'database'
    | 'devops'

    // AI & Data
    | 'ai-ml'
    | 'data-analytics'
    | 'llm-tools'

    // Design & Creative
    | 'design-systems'
    | 'design-tools'
    | 'animation'
    | 'video-editing'
    | 'image-generation'

    // Audio & Music
    | 'music-production'
    | 'audio-editing'
    | 'voice-ai'
    | 'podcasting'

    // Infrastructure & Deployment
    | 'deployment'
    | 'hosting'
    | 'cloud-services'
    | 'monitoring'

    // Productivity & Business
    | 'collaboration'
    | 'project-management'
    | 'automation'
    | 'crm'
    | 'analytics'

    // Content & Marketing
    | 'cms'
    | 'ecommerce'
    | 'marketing'
    | 'seo'
    | 'email'

    // Security & Auth
    | 'authentication'
    | 'security'
    | 'testing'

    // Miscellaneous
    | 'apis'
    | 'payments'
    | 'storage'
    | 'other';

export const workspaces: ProjectWorkspace[] = [
    // AI/ML Projects
    // === LLM & AI TOOLS ===
    {
        id: 'langchain',
        title: 'LangChain',
        description: 'Framework for developing applications powered by language models with composable components',
        category: 'llm-tools',
        tags: ['LLM', 'AI', 'Python', 'JavaScript', 'Framework'],
        urls: {
            main: 'https://langchain.com',
            docs: 'https://python.langchain.com/docs',
            github: 'https://github.com/langchain-ai/langchain',
            npm: 'https://www.npmjs.com/package/langchain'
        },
        trending: {
            badge: 'HOT',
            rank: 1,
            reason: '80k+ GitHub stars'
        },
        icon: '🦜'
    },
    {
        id: 'ollama',
        title: 'Ollama',
        description: 'Get up and running with large language models locally on your machine',
        category: 'ai-ml',
        tags: ['LLM', 'Local', 'Docker', 'AI', 'Open Source'],
        urls: {
            main: 'https://ollama.ai',
            docs: 'https://github.com/ollama/ollama/tree/main/docs',
            github: 'https://github.com/ollama/ollama'
        },
        trending: {
            badge: 'HOT',
            rank: 2,
            reason: '60k+ stars, trending'
        },
        icon: '🦙'
    },
    {
        id: 'huggingface',
        title: 'Hugging Face',
        description: 'The AI community platform with models, datasets, and applications',
        category: 'ai-ml',
        tags: ['AI', 'Models', 'Datasets', 'Transformers', 'Community'],
        urls: {
            main: 'https://huggingface.co',
            docs: 'https://huggingface.co/docs',
            github: 'https://github.com/huggingface',
            demo: 'https://huggingface.co/spaces'
        },
        trending: {
            badge: 'TRENDING',
            rank: 3,
            reason: 'Industry standard'
        },
        icon: '🤗'
    },
    {
        id: 'deepseek',
        title: 'DeepSeek',
        description: 'Advanced AI models with exceptional reasoning capabilities and performance',
        category: 'ai-ml',
        tags: ['AI', 'LLM', 'Reasoning', 'New'],
        urls: {
            main: 'https://www.deepseek.com',
            docs: 'https://api-docs.deepseek.com',
            github: 'https://github.com/deepseek-ai',
            playground: 'https://chat.deepseek.com'
        },
        trending: {
            badge: 'NEW',
            rank: 4,
            reason: 'Revolutionary AI model'
        },
        icon: '🔮'
    },
    {
        id: 'anthropic',
        title: 'Anthropic Claude',
        description: 'Advanced AI assistant with extended context and powerful reasoning',
        category: 'ai-ml',
        tags: ['AI', 'Claude', 'API', 'Chat'],
        urls: {
            main: 'https://www.anthropic.com',
            docs: 'https://docs.anthropic.com',
            playground: 'https://claude.ai'
        },
        trending: {
            badge: 'HOT',
            rank: 5,
            reason: 'Leading AI assistant'
        },
        icon: '🧠'
    },
    {
        id: 'vercel-ai',
        title: 'Vercel AI SDK',
        description: 'Open-source library to build AI-powered streaming text and chat UIs',
        category: 'ai-ml',
        tags: ['AI', 'SDK', 'React', 'TypeScript', 'Streaming'],
        urls: {
            main: 'https://sdk.vercel.ai',
            docs: 'https://sdk.vercel.ai/docs',
            github: 'https://github.com/vercel/ai',
            npm: 'https://www.npmjs.com/package/ai'
        },
        trending: {
            badge: 'TRENDING',
            rank: 6,
            reason: '15k+ stars'
        },
        icon: '⚡'
    },

    // === FRONTEND DEVELOPMENT ===
    {
        id: 'shadcn-ui',
        title: 'shadcn/ui',
        description: 'Beautifully designed components built with Radix UI and Tailwind CSS',
        category: 'frontend',
        tags: ['React', 'Tailwind', 'Components', 'UI', 'TypeScript'],
        urls: {
            main: 'https://ui.shadcn.com',
            docs: 'https://ui.shadcn.com/docs',
            github: 'https://github.com/shadcn-ui/ui'
        },
        trending: {
            badge: 'HOT',
            rank: 1,
            reason: '50k+ GitHub stars'
        },
        icon: '🎨'
    },
    {
        id: 'vite',
        title: 'Vite',
        description: 'Next generation frontend tooling with lightning-fast HMR and build times',
        category: 'frontend',
        tags: ['Build Tool', 'Frontend', 'Fast', 'ESM'],
        urls: {
            main: 'https://vitejs.dev',
            docs: 'https://vitejs.dev/guide',
            github: 'https://github.com/vitejs/vite',
            npm: 'https://www.npmjs.com/package/vite'
        },
        trending: {
            badge: 'TRENDING',
            rank: 2,
            reason: 'Modern standard'
        },
        icon: '⚡'
    },
    {
        id: 'bun',
        title: 'Bun',
        description: 'All-in-one toolkit for JavaScript and TypeScript apps - runtime, bundler, test runner',
        category: 'backend',
        tags: ['Runtime', 'Fast', 'JavaScript', 'TypeScript', 'Bundler'],
        urls: {
            main: 'https://bun.sh',
            docs: 'https://bun.sh/docs',
            github: 'https://github.com/oven-sh/bun'
        },
        trending: {
            badge: 'HOT',
            rank: 3,
            reason: '75k+ stars'
        },
        icon: '🥟'
    },
    {
        id: 'turbo',
        title: 'Turbo',
        description: 'Incremental bundler and build system optimized for JavaScript and TypeScript',
        category: 'devops',
        tags: ['Monorepo', 'Build', 'Performance', 'Vercel'],
        urls: {
            main: 'https://turbo.build',
            docs: 'https://turbo.build/repo/docs',
            github: 'https://github.com/vercel/turbo',
            npm: 'https://www.npmjs.com/package/turbo'
        },
        trending: {
            badge: 'TRENDING',
            rank: 4,
            reason: 'Monorepo revolution'
        },
        icon: '🏎️'
    },
    {
        id: 'vitest',
        title: 'Vitest',
        description: 'Blazing fast unit test framework powered by Vite with Jest-compatible API',
        category: 'testing',
        tags: ['Testing', 'Vite', 'Fast', 'TypeScript'],
        urls: {
            main: 'https://vitest.dev',
            docs: 'https://vitest.dev/guide',
            github: 'https://github.com/vitest-dev/vitest',
            npm: 'https://www.npmjs.com/package/vitest'
        },
        trending: {
            badge: 'TRENDING',
            rank: 5,
            reason: '12k+ stars'
        },
        icon: '🧪'
    },
    {
        id: 'playwright',
        title: 'Playwright',
        description: 'Reliable end-to-end testing for modern web apps across all browsers',
        category: 'testing',
        tags: ['Testing', 'E2E', 'Automation', 'Browsers'],
        urls: {
            main: 'https://playwright.dev',
            docs: 'https://playwright.dev/docs/intro',
            github: 'https://github.com/microsoft/playwright',
            npm: 'https://www.npmjs.com/package/@playwright/test'
        },
        trending: {
            badge: 'HOT',
            rank: 6,
            reason: '60k+ stars'
        },
        icon: '🎭'
    },
    {
        id: 'astro',
        title: 'Astro',
        description: 'Web framework for content-driven websites with zero JS by default',
        category: 'fullstack',
        tags: ['Framework', 'Static', 'Fast', 'Islands'],
        urls: {
            main: 'https://astro.build',
            docs: 'https://docs.astro.build',
            github: 'https://github.com/withastro/astro',
            npm: 'https://www.npmjs.com/package/astro'
        },
        trending: {
            badge: 'TRENDING',
            rank: 7,
            reason: '40k+ stars'
        },
        icon: '🚀'
    },

    // Design Systems
    {
        id: 'radix-ui',
        title: 'Radix UI',
        description: 'Unstyled, accessible components for building high-quality design systems',
        category: 'design-systems',
        tags: ['React', 'Accessibility', 'Components', 'Headless', 'Primitives'],
        urls: {
            main: 'https://www.radix-ui.com',
            docs: 'https://www.radix-ui.com/docs/primitives',
            github: 'https://github.com/radix-ui/primitives',
            npm: 'https://www.npmjs.com/package/@radix-ui/react-dialog'
        },
        trending: {
            badge: 'TRENDING',
            rank: 1,
            reason: 'Industry standard'
        },
        icon: '⚡'
    },
    {
        id: 'headlessui',
        title: 'Headless UI',
        description: 'Completely unstyled, fully accessible UI components for React and Vue',
        category: 'design-systems',
        tags: ['React', 'Vue', 'Accessibility', 'Headless', 'Tailwind'],
        urls: {
            main: 'https://headlessui.com',
            docs: 'https://headlessui.com/react/dialog',
            github: 'https://github.com/tailwindlabs/headlessui',
            npm: 'https://www.npmjs.com/package/@headlessui/react'
        },
        trending: {
            badge: 'HOT',
            rank: 2,
            reason: '24k+ stars'
        },
        icon: '🎯'
    },
    {
        id: 'tailwindui',
        title: 'Tailwind UI',
        description: 'Beautiful UI components and templates built with Tailwind CSS',
        category: 'design-systems',
        tags: ['Tailwind', 'Templates', 'Components', 'Premium'],
        urls: {
            main: 'https://tailwindui.com',
            docs: 'https://tailwindui.com/documentation'
        },
        trending: {
            badge: 'NEW',
            rank: 3,
            reason: 'Premium templates'
        },
        icon: '🎨'
    },
    {
        id: 'chakra-ui',
        title: 'Chakra UI',
        description: 'Simple, modular and accessible component library for React applications',
        category: 'design-systems',
        tags: ['React', 'Components', 'Accessible', 'Themeable'],
        urls: {
            main: 'https://chakra-ui.com',
            docs: 'https://chakra-ui.com/docs',
            github: 'https://github.com/chakra-ui/chakra-ui',
            npm: 'https://www.npmjs.com/package/@chakra-ui/react'
        },
        trending: {
            badge: 'TRENDING',
            rank: 4,
            reason: '36k+ stars'
        },
        icon: '⚡'
    },
    {
        id: 'material-ui',
        title: 'Material UI',
        description: 'Comprehensive React component library implementing Google\'s Material Design',
        category: 'design-systems',
        tags: ['React', 'Material Design', 'Components', 'Google'],
        urls: {
            main: 'https://mui.com',
            docs: 'https://mui.com/material-ui/getting-started',
            github: 'https://github.com/mui/material-ui',
            npm: 'https://www.npmjs.com/package/@mui/material'
        },
        trending: {
            badge: 'TRENDING',
            rank: 5,
            reason: '90k+ stars'
        },
        icon: '🎨'
    },
    {
        id: 'ant-design',
        title: 'Ant Design',
        description: 'Enterprise-class UI design language and React UI library',
        category: 'design-systems',
        tags: ['React', 'Enterprise', 'Components', 'Design System'],
        urls: {
            main: 'https://ant.design',
            docs: 'https://ant.design/docs/react/introduce',
            github: 'https://github.com/ant-design/ant-design',
            npm: 'https://www.npmjs.com/package/antd'
        },
        trending: {
            badge: 'TRENDING',
            rank: 6,
            reason: '90k+ stars'
        },
        icon: '🐜'
    },

    // === DATABASE ===
    {
        id: 'supabase',
        title: 'Supabase',
        description: 'Open source Firebase alternative with Postgres database, auth, and real-time subscriptions',
        category: 'database',
        tags: ['Database', 'Backend', 'Auth', 'Storage', 'PostgreSQL'],
        urls: {
            main: 'https://supabase.com',
            docs: 'https://supabase.com/docs',
            github: 'https://github.com/supabase/supabase',
            demo: 'https://app.supabase.com'
        },
        trending: {
            badge: 'HOT',
            rank: 1,
            reason: 'Series C funded, 65k+ stars'
        },
        icon: '🔥'
    },
    {
        id: 'planetscale',
        title: 'PlanetScale',
        description: 'Serverless MySQL platform with branching and instant scaling',
        category: 'database',
        tags: ['Database', 'MySQL', 'Serverless', 'Scaling'],
        urls: {
            main: 'https://planetscale.com',
            docs: 'https://planetscale.com/docs',
            github: 'https://github.com/planetscale'
        },
        trending: {
            badge: 'TRENDING',
            rank: 7,
            reason: 'Database innovation'
        },
        icon: '🌍'
    },

    // === DEPLOYMENT & HOSTING ===
    {
        id: 'vercel',
        title: 'Vercel',
        description: 'Platform for frontend developers with instant deployments and automatic scaling',
        category: 'deployment',
        tags: ['Deployment', 'Hosting', 'Next.js', 'Edge'],
        urls: {
            main: 'https://vercel.com',
            docs: 'https://vercel.com/docs',
            github: 'https://github.com/vercel',
            demo: 'https://vercel.com/new'
        },
        trending: {
            badge: 'HOT',
            rank: 2,
            reason: 'Industry leader'
        },
        icon: '▲'
    },
    {
        id: 'railway',
        title: 'Railway',
        description: 'Deploy your code with zero configuration. Built for developers who want simplicity',
        category: 'deployment',
        tags: ['Deployment', 'Infrastructure', 'Simple', 'Fast'],
        urls: {
            main: 'https://railway.app',
            docs: 'https://docs.railway.app',
            github: 'https://github.com/railwayapp',
            demo: 'https://railway.app/new'
        },
        trending: {
            badge: 'NEW',
            rank: 3,
            reason: 'Developer favorite'
        },
        icon: '🚂'
    },

    // === AUTHENTICATION ===
    {
        id: 'clerk',
        title: 'Clerk',
        description: 'Complete user management and authentication with beautiful pre-built components',
        category: 'authentication',
        tags: ['Auth', 'User Management', 'React', 'Next.js'],
        urls: {
            main: 'https://clerk.com',
            docs: 'https://clerk.com/docs',
            github: 'https://github.com/clerk/javascript',
            demo: 'https://dashboard.clerk.com'
        },
        trending: {
            badge: 'HOT',
            rank: 4,
            reason: 'Series B funded'
        },
        icon: '🔐'
    },

    // === EMAIL ===
    {
        id: 'resend',
        title: 'Resend',
        description: 'Email API for developers with simple integration and beautiful UI',
        category: 'email',
        tags: ['Email', 'API', 'Transactional', 'Developer Tools'],
        urls: {
            main: 'https://resend.com',
            docs: 'https://resend.com/docs',
            github: 'https://github.com/resend',
            demo: 'https://resend.com/emails'
        },
        trending: {
            badge: 'NEW',
            rank: 5,
            reason: 'Modern email API'
        },
        icon: '✉️'
    },

    // === PAYMENTS ===
    {
        id: 'stripe',
        title: 'Stripe',
        description: 'Payment infrastructure for the internet with complete commerce solutions',
        category: 'payments',
        tags: ['Payments', 'API', 'Commerce', 'Finance'],
        urls: {
            main: 'https://stripe.com',
            docs: 'https://stripe.com/docs',
            github: 'https://github.com/stripe',
            demo: 'https://dashboard.stripe.com'
        },
        trending: {
            badge: 'TRENDING',
            rank: 6,
            reason: '$50B valuation'
        },
        icon: '💳'
    },

    // === IMAGE GENERATION ===
    {
        id: 'stable-diffusion',
        title: 'Stable Diffusion',
        description: 'Open-source AI model for generating images from text descriptions',
        category: 'image-generation',
        tags: ['AI', 'Image Generation', 'Diffusion', 'Open Source'],
        urls: {
            main: 'https://stability.ai',
            github: 'https://github.com/Stability-AI/stablediffusion',
            demo: 'https://huggingface.co/spaces/stabilityai/stable-diffusion'
        },
        trending: { badge: 'HOT', rank: 7, reason: 'Revolutionary image AI' },
        icon: '🎨'
    },
    {
        id: 'transformers',
        title: 'Transformers',
        description: 'State-of-the-art machine learning library for PyTorch, TensorFlow, and JAX',
        category: 'ai-ml',
        tags: ['ML', 'NLP', 'PyTorch', 'TensorFlow'],
        urls: {
            main: 'https://huggingface.co/transformers',
            docs: 'https://huggingface.co/docs/transformers',
            github: 'https://github.com/huggingface/transformers'
        },
        trending: { badge: 'TRENDING', rank: 8, reason: '120k+ stars' },
        icon: '🤖'
    },
    {
        id: 'llama',
        title: 'Llama',
        description: 'Meta\'s large language model family for research and commercial use',
        category: 'ai-ml',
        tags: ['LLM', 'Meta', 'Open Source', 'AI'],
        urls: {
            main: 'https://llama.meta.com',
            docs: 'https://llama.meta.com/docs',
            github: 'https://github.com/meta-llama'
        },
        trending: { badge: 'HOT', rank: 9, reason: 'Open LLM leader' },
        icon: '🦙'
    },
    {
        id: 'pytorch',
        title: 'PyTorch',
        description: 'Open source machine learning framework for Python with GPU acceleration',
        category: 'ai-ml',
        tags: ['ML', 'Deep Learning', 'Python', 'GPU'],
        urls: {
            main: 'https://pytorch.org',
            docs: 'https://pytorch.org/docs',
            github: 'https://github.com/pytorch/pytorch'
        },
        trending: { badge: 'TRENDING', rank: 10, reason: '70k+ stars' },
        icon: '🔥'
    },
    {
        id: 'tensorflow',
        title: 'TensorFlow',
        description: 'End-to-end open source platform for machine learning by Google',
        category: 'ai-ml',
        tags: ['ML', 'Google', 'Python', 'Deep Learning'],
        urls: {
            main: 'https://tensorflow.org',
            docs: 'https://tensorflow.org/api_docs',
            github: 'https://github.com/tensorflow/tensorflow'
        },
        trending: { badge: 'TRENDING', rank: 11, reason: '180k+ stars' },
        icon: '🧮'
    },
    {
        id: 'autogpt',
        title: 'AutoGPT',
        description: 'Autonomous GPT-4 agent that can complete tasks independently',
        category: 'ai-ml',
        tags: ['AI', 'Autonomous', 'GPT-4', 'Agent'],
        urls: {
            main: 'https://agpt.co',
            github: 'https://github.com/Significant-Gravitas/AutoGPT',
            docs: 'https://docs.agpt.co'
        },
        trending: { badge: 'NEW', rank: 12, reason: '160k+ stars' },
        icon: '🤖'
    },
    {
        id: 'replicate',
        title: 'Replicate',
        description: 'Run and deploy AI models with a simple API and no infrastructure',
        category: 'ai-ml',
        tags: ['AI', 'API', 'Models', 'Deployment'],
        urls: {
            main: 'https://replicate.com',
            docs: 'https://replicate.com/docs',
            github: 'https://github.com/replicate'
        },
        trending: { badge: 'TRENDING', rank: 13, reason: 'Easy AI deployment' },
        icon: '♻️'
    },
    {
        id: 'midjourney',
        title: 'Midjourney',
        description: 'AI-powered art generation platform creating stunning images from text',
        category: 'ai-ml',
        tags: ['AI', 'Art', 'Image Generation', 'Creative'],
        urls: {
            main: 'https://midjourney.com',
            docs: 'https://docs.midjourney.com',
            discord: 'https://discord.gg/midjourney'
        },
        trending: { badge: 'HOT', rank: 14, reason: 'Top AI art tool' },
        icon: '🎨'
    },

    // MORE DEV TOOLS
    {
        id: 'nextjs',
        title: 'Next.js',
        description: 'React framework with hybrid static & server rendering, TypeScript support, and more',
        category: 'dev-tools',
        tags: ['React', 'Framework', 'SSR', 'TypeScript'],
        urls: {
            main: 'https://nextjs.org',
            docs: 'https://nextjs.org/docs',
            github: 'https://github.com/vercel/next.js',
            npm: 'https://www.npmjs.com/package/next'
        },
        trending: { badge: 'HOT', rank: 8, reason: '120k+ stars' },
        icon: '⚡'
    },
    {
        id: 'remix',
        title: 'Remix',
        description: 'Full stack web framework focused on web standards and modern UX',
        category: 'dev-tools',
        tags: ['React', 'Framework', 'Full Stack', 'Web Standards'],
        urls: {
            main: 'https://remix.run',
            docs: 'https://remix.run/docs',
            github: 'https://github.com/remix-run/remix'
        },
        trending: { badge: 'TRENDING', rank: 9, reason: '27k+ stars' },
        icon: '💿'
    },
    {
        id: 'tailwindcss',
        title: 'Tailwind CSS',
        description: 'Utility-first CSS framework for rapidly building custom user interfaces',
        category: 'dev-tools',
        tags: ['CSS', 'Utility', 'Design', 'Framework'],
        urls: {
            main: 'https://tailwindcss.com',
            docs: 'https://tailwindcss.com/docs',
            github: 'https://github.com/tailwindlabs/tailwindcss',
            playground: 'https://play.tailwindcss.com'
        },
        trending: { badge: 'HOT', rank: 10, reason: '78k+ stars' },
        icon: '🎨'
    },
    {
        id: 'pnpm',
        title: 'pnpm',
        description: 'Fast, disk space efficient package manager with strict node_modules structure',
        category: 'dev-tools',
        tags: ['Package Manager', 'Node', 'Fast', 'Efficient'],
        urls: {
            main: 'https://pnpm.io',
            docs: 'https://pnpm.io/motivation',
            github: 'https://github.com/pnpm/pnpm'
        },
        trending: { badge: 'TRENDING', rank: 11, reason: '27k+ stars' },
        icon: '📦'
    },
    {
        id: 'deno',
        title: 'Deno',
        description: 'Secure runtime for JavaScript and TypeScript with modern features built-in',
        category: 'dev-tools',
        tags: ['Runtime', 'TypeScript', 'JavaScript', 'Secure'],
        urls: {
            main: 'https://deno.com',
            docs: 'https://deno.land/manual',
            github: 'https://github.com/denoland/deno'
        },
        trending: { badge: 'TRENDING', rank: 12, reason: '93k+ stars' },
        icon: '🦕'
    },
    {
        id: 'esbuild',
        title: 'esbuild',
        description: 'Extremely fast JavaScript bundler and minifier written in Go',
        category: 'dev-tools',
        tags: ['Bundler', 'Fast', 'JavaScript', 'Build Tool'],
        urls: {
            main: 'https://esbuild.github.io',
            docs: 'https://esbuild.github.io/api',
            github: 'https://github.com/evanw/esbuild'
        },
        trending: { badge: 'HOT', rank: 13, reason: '37k+ stars' },
        icon: '⚡'
    },
    {
        id: 'svelte',
        title: 'Svelte',
        description: 'Cybernetically enhanced web apps with truly reactive framework',
        category: 'dev-tools',
        tags: ['Framework', 'Reactive', 'Compiler', 'Modern'],
        urls: {
            main: 'https://svelte.dev',
            docs: 'https://svelte.dev/docs',
            github: 'https://github.com/sveltejs/svelte',
            playground: 'https://svelte.dev/repl'
        },
        trending: { badge: 'HOT', rank: 14, reason: '75k+ stars' },
        icon: '🔥'
    },
    {
        id: 'prisma',
        title: 'Prisma',
        description: 'Next-generation ORM for Node.js and TypeScript with type-safe database access',
        category: 'dev-tools',
        tags: ['ORM', 'Database', 'TypeScript', 'SQL'],
        urls: {
            main: 'https://prisma.io',
            docs: 'https://prisma.io/docs',
            github: 'https://github.com/prisma/prisma'
        },
        trending: { badge: 'TRENDING', rank: 15, reason: '36k+ stars' },
        icon: '🔺'
    },
    {
        id: 'docker',
        title: 'Docker',
        description: 'Platform for developing, shipping, and running applications in containers',
        category: 'dev-tools',
        tags: ['Containers', 'DevOps', 'Infrastructure', 'Deployment'],
        urls: {
            main: 'https://docker.com',
            docs: 'https://docs.docker.com',
            github: 'https://github.com/docker'
        },
        trending: { badge: 'TRENDING', rank: 16, reason: 'Container standard' },
        icon: '🐳'
    },
    {
        id: 'typescript',
        title: 'TypeScript',
        description: 'Typed superset of JavaScript that compiles to plain JavaScript',
        category: 'dev-tools',
        tags: ['Language', 'TypeScript', 'JavaScript', 'Microsoft'],
        urls: {
            main: 'https://typescriptlang.org',
            docs: 'https://typescriptlang.org/docs',
            github: 'https://github.com/microsoft/TypeScript',
            playground: 'https://typescriptlang.org/play'
        },
        trending: { badge: 'HOT', rank: 17, reason: '97k+ stars' },
        icon: '📘'
    },

    // MORE DESIGN SYSTEMS
    {
        id: 'framer-motion',
        title: 'Framer Motion',
        description: 'Production-ready motion library for React with powerful animations',
        category: 'design-systems',
        tags: ['Animation', 'React', 'Motion', 'UI'],
        urls: {
            main: 'https://framer.com/motion',
            docs: 'https://framer.com/motion/introduction',
            github: 'https://github.com/framer/motion',
            npm: 'https://www.npmjs.com/package/framer-motion'
        },
        trending: { badge: 'HOT', rank: 7, reason: '22k+ stars' },
        icon: '🎬'
    },
    {
        id: 'daisyui',
        title: 'daisyUI',
        description: 'The most popular component library for Tailwind CSS',
        category: 'design-systems',
        tags: ['Tailwind', 'Components', 'UI', 'CSS'],
        urls: {
            main: 'https://daisyui.com',
            docs: 'https://daisyui.com/docs',
            github: 'https://github.com/saadeghi/daisyui'
        },
        trending: { badge: 'TRENDING', rank: 8, reason: '30k+ stars' },
        icon: '🌼'
    },
    {
        id: 'mantine',
        title: 'Mantine',
        description: 'Fully featured React component library with 100+ customizable components',
        category: 'design-systems',
        tags: ['React', 'Components', 'TypeScript', 'Hooks'],
        urls: {
            main: 'https://mantine.dev',
            docs: 'https://mantine.dev/pages/basics',
            github: 'https://github.com/mantinedev/mantine'
        },
        trending: { badge: 'TRENDING', rank: 9, reason: '24k+ stars' },
        icon: '🎨'
    },
    {
        id: 'styled-components',
        title: 'styled-components',
        description: 'Visual primitives for the component age using tagged template literals',
        category: 'design-systems',
        tags: ['CSS-in-JS', 'React', 'Styling', 'Components'],
        urls: {
            main: 'https://styled-components.com',
            docs: 'https://styled-components.com/docs',
            github: 'https://github.com/styled-components/styled-components'
        },
        trending: { badge: 'TRENDING', rank: 10, reason: '40k+ stars' },
        icon: '💅'
    },
    {
        id: 'tailwind-ui',
        title: 'Flowbite',
        description: 'Open-source component library built with Tailwind CSS',
        category: 'design-systems',
        tags: ['Tailwind', 'Components', 'UI Kit', 'Open Source'],
        urls: {
            main: 'https://flowbite.com',
            docs: 'https://flowbite.com/docs',
            github: 'https://github.com/themesberg/flowbite'
        },
        trending: { badge: 'NEW', rank: 11, reason: '6k+ stars' },
        icon: '🌊'
    },
    {
        id: 'storybook',
        title: 'Storybook',
        description: 'Frontend workshop for building UI components and pages in isolation',
        category: 'design-systems',
        tags: ['UI', 'Development', 'Components', 'Testing'],
        urls: {
            main: 'https://storybook.js.org',
            docs: 'https://storybook.js.org/docs',
            github: 'https://github.com/storybookjs/storybook'
        },
        trending: { badge: 'HOT', rank: 12, reason: '82k+ stars' },
        icon: '📚'
    },

    // MORE STARTUP/PRODUCT
    {
        id: 'netlify',
        title: 'Netlify',
        description: 'Platform to build, deploy, and scale modern web projects with Git-based workflow',
        category: 'startup-product',
        tags: ['Hosting', 'Deployment', 'JAMstack', 'CI/CD'],
        urls: {
            main: 'https://netlify.com',
            docs: 'https://docs.netlify.com',
            github: 'https://github.com/netlify'
        },
        trending: { badge: 'TRENDING', rank: 8, reason: 'JAMstack leader' },
        icon: '🌐'
    },
    {
        id: 'cloudflare',
        title: 'Cloudflare Workers',
        description: 'Serverless execution environment for running code at the edge',
        category: 'startup-product',
        tags: ['Edge', 'Serverless', 'CDN', 'Workers'],
        urls: {
            main: 'https://workers.cloudflare.com',
            docs: 'https://developers.cloudflare.com/workers',
            github: 'https://github.com/cloudflare'
        },
        trending: { badge: 'HOT', rank: 9, reason: 'Edge computing leader' },
        icon: '⚡'
    },
    {
        id: 'sanity',
        title: 'Sanity',
        description: 'Platform for structured content with real-time collaboration',
        category: 'startup-product',
        tags: ['CMS', 'Content', 'Headless', 'Real-time'],
        urls: {
            main: 'https://sanity.io',
            docs: 'https://sanity.io/docs',
            github: 'https://github.com/sanity-io'
        },
        trending: { badge: 'TRENDING', rank: 10, reason: 'Modern CMS' },
        icon: '📝'
    },
    {
        id: 'convex',
        title: 'Convex',
        description: 'Backend application platform with real-time database and serverless functions',
        category: 'startup-product',
        tags: ['Backend', 'Real-time', 'Database', 'Serverless'],
        urls: {
            main: 'https://convex.dev',
            docs: 'https://docs.convex.dev',
            github: 'https://github.com/get-convex'
        },
        trending: { badge: 'NEW', rank: 11, reason: 'YC backed' },
        icon: '🔄'
    },
    {
        id: 'upstash',
        title: 'Upstash',
        description: 'Serverless data platform with Redis and Kafka for modern applications',
        category: 'startup-product',
        tags: ['Database', 'Redis', 'Kafka', 'Serverless'],
        urls: {
            main: 'https://upstash.com',
            docs: 'https://docs.upstash.com',
            github: 'https://github.com/upstash'
        },
        trending: { badge: 'NEW', rank: 12, reason: 'Serverless Redis' },
        icon: '⚡'
    },
    {
        id: 'auth0',
        title: 'Auth0',
        description: 'Authentication and authorization platform for web, mobile, and legacy apps',
        category: 'startup-product',
        tags: ['Auth', 'Security', 'Identity', 'Enterprise'],
        urls: {
            main: 'https://auth0.com',
            docs: 'https://auth0.com/docs',
            github: 'https://github.com/auth0'
        },
        trending: { badge: 'TRENDING', rank: 13, reason: 'Auth leader' },
        icon: '🔒'
    },
    {
        id: 'sentry',
        title: 'Sentry',
        description: 'Application monitoring platform with error tracking and performance monitoring',
        category: 'startup-product',
        tags: ['Monitoring', 'Error Tracking', 'Performance', 'DevOps'],
        urls: {
            main: 'https://sentry.io',
            docs: 'https://docs.sentry.io',
            github: 'https://github.com/getsentry/sentry'
        },
        trending: { badge: 'HOT', rank: 14, reason: '$3B valuation' },
        icon: '🔍'
    },
    {
        id: 'fly-io',
        title: 'Fly.io',
        description: 'Deploy app servers close to your users with global application distribution',
        category: 'deployment',
        tags: ['Deployment', 'Infrastructure', 'Edge', 'Global'],
        urls: {
            main: 'https://fly.io',
            docs: 'https://fly.io/docs',
            github: 'https://github.com/superfly'
        },
        trending: { badge: 'TRENDING', rank: 15, reason: 'Developer favorite' },
        icon: '🪰'
    },

    // === MUSIC PRODUCTION ===
    {
        id: 'ableton-live',
        title: 'Ableton Live',
        description: 'Professional music production software for recording, composing, and performing',
        category: 'music-production',
        tags: ['DAW', 'Music', 'Production', 'Recording'],
        urls: {
            main: 'https://ableton.com',
            docs: 'https://ableton.com/en/manual/welcome-to-live'
        },
        trending: { badge: 'HOT', rank: 1, reason: 'Industry standard' },
        icon: '🎹'
    },
    {
        id: 'splice',
        title: 'Splice',
        description: 'Platform for music creation with millions of sounds, loops, and samples',
        category: 'music-production',
        tags: ['Samples', 'Sounds', 'Music', 'Collaboration'],
        urls: {
            main: 'https://splice.com',
            demo: 'https://splice.com/sounds'
        },
        trending: { badge: 'TRENDING', rank: 2, reason: '4M+ creators' },
        icon: '🎵'
    },
    {
        id: 'soundtrap',
        title: 'Soundtrap',
        description: 'Online collaborative music and podcast recording studio',
        category: 'music-production',
        tags: ['Music', 'Recording', 'Collaboration', 'Online'],
        urls: {
            main: 'https://soundtrap.com',
            demo: 'https://soundtrap.com/musicmakers'
        },
        trending: { badge: 'NEW', rank: 3, reason: 'Spotify backed' },
        icon: '🎼'
    },

    // === VOICE & SPEECH AI ===
    {
        id: 'elevenlabs',
        title: 'ElevenLabs',
        description: 'AI voice generation platform creating natural-sounding speech from text',
        category: 'voice-ai',
        tags: ['AI', 'Voice', 'TTS', 'Speech'],
        urls: {
            main: 'https://elevenlabs.io',
            docs: 'https://elevenlabs.io/docs',
            demo: 'https://elevenlabs.io/speech-synthesis'
        },
        trending: { badge: 'HOT', rank: 1, reason: '$80M funding' },
        icon: '🎤'
    },
    {
        id: 'murf-ai',
        title: 'Murf.AI',
        description: 'AI-powered voice generator for professional voiceovers and narration',
        category: 'voice-ai',
        tags: ['AI', 'Voice', 'Voiceover', 'TTS'],
        urls: {
            main: 'https://murf.ai',
            demo: 'https://murf.ai/text-to-speech'
        },
        trending: { badge: 'TRENDING', rank: 2, reason: '120+ voices' },
        icon: '🗣️'
    },
    {
        id: 'descript',
        title: 'Descript',
        description: 'All-in-one audio & video editing with AI-powered transcription and voice cloning',
        category: 'voice-ai',
        tags: ['Audio', 'Video', 'AI', 'Editing'],
        urls: {
            main: 'https://descript.com',
            docs: 'https://help.descript.com'
        },
        trending: { badge: 'HOT', rank: 3, reason: '$100M+ funding' },
        icon: '🎙️'
    },

    // === AUDIO EDITING ===
    {
        id: 'audacity',
        title: 'Audacity',
        description: 'Free, open-source, cross-platform audio software for recording and editing',
        category: 'audio-editing',
        tags: ['Audio', 'Editing', 'Open Source', 'Free'],
        urls: {
            main: 'https://audacityteam.org',
            docs: 'https://manual.audacityteam.org',
            github: 'https://github.com/audacity/audacity'
        },
        trending: { badge: 'TRENDING', rank: 1, reason: '30+ years strong' },
        icon: '🎧'
    },
    {
        id: 'adobe-audition',
        title: 'Adobe Audition',
        description: 'Professional audio workstation for mixing, finishing, and precision editing',
        category: 'audio-editing',
        tags: ['Audio', 'Professional', 'Adobe', 'Editing'],
        urls: {
            main: 'https://adobe.com/products/audition',
            docs: 'https://helpx.adobe.com/audition'
        },
        trending: { badge: 'HOT', rank: 2, reason: 'Industry leader' },
        icon: '🎚️'
    },

    // === PODCASTING ===
    {
        id: 'riverside',
        title: 'Riverside.fm',
        description: 'Professional podcast and video recording platform with studio-quality sound',
        category: 'podcasting',
        tags: ['Podcast', 'Video', 'Recording', 'Remote'],
        urls: {
            main: 'https://riverside.fm',
            demo: 'https://riverside.fm/studio'
        },
        trending: { badge: 'HOT', rank: 1, reason: '100k+ podcasters' },
        icon: '🎙️'
    },
    {
        id: 'anchor',
        title: 'Anchor by Spotify',
        description: 'Free podcast creation platform with hosting, distribution, and monetization',
        category: 'podcasting',
        tags: ['Podcast', 'Free', 'Hosting', 'Distribution'],
        urls: {
            main: 'https://anchor.fm',
            docs: 'https://help.anchor.fm'
        },
        trending: { badge: 'TRENDING', rank: 2, reason: 'Spotify powered' },
        icon: '⚓'
    },

    // === VIDEO EDITING ===
    {
        id: 'davinci-resolve',
        title: 'DaVinci Resolve',
        description: 'Professional video editing, color correction, and audio post-production software',
        category: 'video-editing',
        tags: ['Video', 'Editing', 'Professional', 'Free'],
        urls: {
            main: 'https://blackmagicdesign.com/products/davinciresolve'
        },
        trending: { badge: 'HOT', rank: 1, reason: 'Hollywood standard' },
        icon: '🎬'
    },
    {
        id: 'capcut',
        title: 'CapCut',
        description: 'Free all-in-one video editing tool for social media content creators',
        category: 'video-editing',
        tags: ['Video', 'Editing', 'Social', 'Free'],
        urls: {
            main: 'https://capcut.com',
            demo: 'https://capcut.com/editor'
        },
        trending: { badge: 'HOT', rank: 2, reason: 'TikTok\'s choice' },
        icon: '✂️'
    },
    {
        id: 'runway-ml',
        title: 'Runway',
        description: 'AI-powered creative tools for video editing, generation, and manipulation',
        category: 'video-editing',
        tags: ['AI', 'Video', 'Creative', 'Generation'],
        urls: {
            main: 'https://runwayml.com',
            demo: 'https://app.runwayml.com'
        },
        trending: { badge: 'NEW', rank: 3, reason: 'AI video revolution' },
        icon: '🎥'
    },

    // === DEPLOYMENT PLATFORMS ===
    {
        id: 'render',
        title: 'Render',
        description: 'Cloud platform for deploying websites, APIs, and databases with zero DevOps',
        category: 'deployment',
        tags: ['Deployment', 'Hosting', 'Cloud', 'Simple'],
        urls: {
            main: 'https://render.com',
            docs: 'https://render.com/docs'
        },
        trending: { badge: 'TRENDING', rank: 1, reason: 'Developer love' },
        icon: '🚀'
    },
    {
        id: 'cyclic',
        title: 'Cyclic',
        description: 'Serverless deployment platform for full-stack apps with instant scaling',
        category: 'deployment',
        tags: ['Serverless', 'Deployment', 'Full Stack'],
        urls: {
            main: 'https://cyclic.sh',
            docs: 'https://docs.cyclic.sh'
        },
        trending: { badge: 'NEW', rank: 2, reason: 'Zero config' },
        icon: '♻️'
    },

    // === FRONTEND FRAMEWORKS ===
    {
        id: 'react',
        title: 'React',
        description: 'JavaScript library for building user interfaces with component-based architecture',
        category: 'frontend',
        tags: ['JavaScript', 'UI', 'Library', 'Meta'],
        urls: {
            main: 'https://react.dev',
            docs: 'https://react.dev/learn',
            github: 'https://github.com/facebook/react'
        },
        trending: { badge: 'HOT', rank: 1, reason: '220k+ stars' },
        icon: '⚛️'
    },
    {
        id: 'vue',
        title: 'Vue.js',
        description: 'Progressive JavaScript framework for building user interfaces',
        category: 'frontend',
        tags: ['JavaScript', 'Framework', 'Progressive', 'UI'],
        urls: {
            main: 'https://vuejs.org',
            docs: 'https://vuejs.org/guide',
            github: 'https://github.com/vuejs/core'
        },
        trending: { badge: 'TRENDING', rank: 2, reason: '45k+ stars' },
        icon: '💚'
    },
    {
        id: 'angular',
        title: 'Angular',
        description: 'Platform for building web applications with TypeScript and powerful tooling',
        category: 'frontend',
        tags: ['TypeScript', 'Framework', 'Google', 'Enterprise'],
        urls: {
            main: 'https://angular.io',
            docs: 'https://angular.io/docs',
            github: 'https://github.com/angular/angular'
        },
        trending: { badge: 'TRENDING', rank: 3, reason: '94k+ stars' },
        icon: '🅰️'
    },

    // === MOBILE DEVELOPMENT ===
    {
        id: 'react-native',
        title: 'React Native',
        description: 'Build native mobile apps using React and JavaScript',
        category: 'mobile',
        tags: ['Mobile', 'React', 'iOS', 'Android'],
        urls: {
            main: 'https://reactnative.dev',
            docs: 'https://reactnative.dev/docs',
            github: 'https://github.com/facebook/react-native'
        },
        trending: { badge: 'HOT', rank: 1, reason: '115k+ stars' },
        icon: '📱'
    },
    {
        id: 'flutter',
        title: 'Flutter',
        description: 'Google\'s UI toolkit for building natively compiled multiplatform applications',
        category: 'mobile',
        tags: ['Mobile', 'Dart', 'Google', 'Cross-platform'],
        urls: {
            main: 'https://flutter.dev',
            docs: 'https://docs.flutter.dev',
            github: 'https://github.com/flutter/flutter'
        },
        trending: { badge: 'HOT', rank: 2, reason: '162k+ stars' },
        icon: '🦋'
    },
    {
        id: 'expo',
        title: 'Expo',
        description: 'Platform for making React Native apps with powerful tools and services',
        category: 'mobile',
        tags: ['React Native', 'Mobile', 'Development', 'Tools'],
        urls: {
            main: 'https://expo.dev',
            docs: 'https://docs.expo.dev',
            github: 'https://github.com/expo/expo'
        },
        trending: { badge: 'TRENDING', rank: 3, reason: '27k+ stars' },
        icon: '📲'
    },

    // === E-COMMERCE ===
    {
        id: 'shopify',
        title: 'Shopify',
        description: 'Complete commerce platform for starting, scaling, and managing a business',
        category: 'ecommerce',
        tags: ['E-commerce', 'Store', 'Platform', 'Sales'],
        urls: {
            main: 'https://shopify.com',
            docs: 'https://shopify.dev',
            demo: 'https://shopify.com/free-trial'
        },
        trending: { badge: 'HOT', rank: 1, reason: '$200B+ GMV' },
        icon: '🛒'
    },
    {
        id: 'woocommerce',
        title: 'WooCommerce',
        description: 'Open-source e-commerce plugin for WordPress powering millions of stores',
        category: 'ecommerce',
        tags: ['WordPress', 'E-commerce', 'Open Source', 'Store'],
        urls: {
            main: 'https://woocommerce.com',
            docs: 'https://woocommerce.com/documentation',
            github: 'https://github.com/woocommerce/woocommerce'
        },
        trending: { badge: 'TRENDING', rank: 2, reason: '5M+ active stores' },
        icon: '🛍️'
    },

    // === MONITORING ===
    {
        id: 'datadog',
        title: 'Datadog',
        description: 'Monitoring and security platform for cloud applications',
        category: 'monitoring',
        tags: ['Monitoring', 'Observability', 'Cloud', 'APM'],
        urls: {
            main: 'https://datadoghq.com',
            docs: 'https://docs.datadoghq.com',
            demo: 'https://app.datadoghq.com'
        },
        trending: { badge: 'HOT', rank: 1, reason: '$35B valuation' },
        icon: '📊'
    },
    {
        id: 'grafana',
        title: 'Grafana',
        description: 'Open-source platform for monitoring and observability with beautiful dashboards',
        category: 'monitoring',
        tags: ['Monitoring', 'Dashboards', 'Open Source', 'Metrics'],
        urls: {
            main: 'https://grafana.com',
            docs: 'https://grafana.com/docs',
            github: 'https://github.com/grafana/grafana',
            demo: 'https://play.grafana.org'
        },
        trending: { badge: 'TRENDING', rank: 2, reason: '60k+ stars' },
        icon: '📈'
    },

    // === COLLABORATION ===
    {
        id: 'linear',
        title: 'Linear',
        description: 'Issue tracking tool designed for high-performance software teams',
        category: 'collaboration',
        tags: ['Project Management', 'Issues', 'Agile', 'Teams'],
        urls: {
            main: 'https://linear.app',
            docs: 'https://linear.app/docs'
        },
        trending: { badge: 'HOT', rank: 1, reason: '$275M valuation' },
        icon: '📐'
    },
    {
        id: 'notion',
        title: 'Notion',
        description: 'All-in-one workspace for notes, docs, wikis, and project management',
        category: 'collaboration',
        tags: ['Productivity', 'Notes', 'Wiki', 'Workspace'],
        urls: {
            main: 'https://notion.so',
            docs: 'https://notion.so/help'
        },
        trending: { badge: 'HOT', rank: 2, reason: '$10B valuation' },
        icon: '📝'
    },

    // === MORE BACKEND ===
    {
        id: 'nodejs',
        title: 'Node.js',
        description: 'JavaScript runtime built on Chrome\'s V8 engine for building fast server applications',
        category: 'backend',
        tags: ['JavaScript', 'Runtime', 'Server', 'NPM'],
        urls: {
            main: 'https://nodejs.org',
            docs: 'https://nodejs.org/docs',
            github: 'https://github.com/nodejs/node'
        },
        trending: { badge: 'TRENDING', rank: 1, reason: 'Industry standard' },
        icon: '💚'
    },
    {
        id: 'deno',
        title: 'Deno',
        description: 'Secure runtime for JavaScript and TypeScript with modern features built-in',
        category: 'backend',
        tags: ['JavaScript', 'TypeScript', 'Runtime', 'Secure'],
        urls: {
            main: 'https://deno.com',
            docs: 'https://docs.deno.com',
            github: 'https://github.com/denoland/deno'
        },
        trending: { badge: 'TRENDING', rank: 2, reason: '90k+ stars' },
        icon: '🦕'
    },
    {
        id: 'express',
        title: 'Express.js',
        description: 'Fast, unopinionated, minimalist web framework for Node.js',
        category: 'backend',
        tags: ['Node.js', 'Framework', 'REST', 'API'],
        urls: {
            main: 'https://expressjs.com',
            docs: 'https://expressjs.com/en/guide/routing.html',
            github: 'https://github.com/expressjs/express',
            npm: 'https://www.npmjs.com/package/express'
        },
        trending: { badge: 'TRENDING', rank: 3, reason: '60k+ stars' },
        icon: '🚂'
    },
    {
        id: 'fastify',
        title: 'Fastify',
        description: 'Fast and low overhead web framework for Node.js with powerful plugin architecture',
        category: 'backend',
        tags: ['Node.js', 'Fast', 'Framework', 'Plugins'],
        urls: {
            main: 'https://fastify.dev',
            docs: 'https://fastify.dev/docs/latest',
            github: 'https://github.com/fastify/fastify',
            npm: 'https://www.npmjs.com/package/fastify'
        },
        trending: { badge: 'HOT', rank: 4, reason: '30k+ stars' },
        icon: '⚡'
    },

    // === MORE FULLSTACK ===
    {
        id: 'nextjs',
        title: 'Next.js',
        description: 'React framework for production with hybrid static & server rendering',
        category: 'fullstack',
        tags: ['React', 'SSR', 'Framework', 'Vercel'],
        urls: {
            main: 'https://nextjs.org',
            docs: 'https://nextjs.org/docs',
            github: 'https://github.com/vercel/next.js',
            npm: 'https://www.npmjs.com/package/next'
        },
        trending: { badge: 'HOT', rank: 1, reason: '120k+ stars' },
        icon: '▲'
    },
    {
        id: 'remix',
        title: 'Remix',
        description: 'Full stack web framework focused on web standards and modern web app UX',
        category: 'fullstack',
        tags: ['React', 'Framework', 'SSR', 'Progressive'],
        urls: {
            main: 'https://remix.run',
            docs: 'https://remix.run/docs',
            github: 'https://github.com/remix-run/remix',
            npm: 'https://www.npmjs.com/package/@remix-run/react'
        },
        trending: { badge: 'HOT', rank: 2, reason: 'Shopify acquired' },
        icon: '💿'
    },
    {
        id: 'sveltekit',
        title: 'SvelteKit',
        description: 'The fastest way to build Svelte apps with file-based routing and SSR',
        category: 'fullstack',
        tags: ['Svelte', 'Framework', 'SSR', 'Fast'],
        urls: {
            main: 'https://kit.svelte.dev',
            docs: 'https://kit.svelte.dev/docs',
            github: 'https://github.com/sveltejs/kit',
            npm: 'https://www.npmjs.com/package/@sveltejs/kit'
        },
        trending: { badge: 'TRENDING', rank: 3, reason: '18k+ stars' },
        icon: '🔥'
    },
    {
        id: 'nuxt',
        title: 'Nuxt',
        description: 'Intuitive Vue framework for building performant web applications',
        category: 'fullstack',
        tags: ['Vue', 'Framework', 'SSR', 'Universal'],
        urls: {
            main: 'https://nuxt.com',
            docs: 'https://nuxt.com/docs',
            github: 'https://github.com/nuxt/nuxt',
            npm: 'https://www.npmjs.com/package/nuxt'
        },
        trending: { badge: 'TRENDING', rank: 4, reason: '50k+ stars' },
        icon: '💚'
    },

    // === MORE DATABASE ===
    {
        id: 'prisma',
        title: 'Prisma',
        description: 'Next-generation ORM for Node.js and TypeScript with type safety',
        category: 'database',
        tags: ['ORM', 'TypeScript', 'Database', 'Type-Safe'],
        urls: {
            main: 'https://www.prisma.io',
            docs: 'https://www.prisma.io/docs',
            github: 'https://github.com/prisma/prisma',
            npm: 'https://www.npmjs.com/package/@prisma/client'
        },
        trending: { badge: 'HOT', rank: 1, reason: '37k+ stars' },
        icon: '🔷'
    },
    {
        id: 'drizzle',
        title: 'Drizzle ORM',
        description: 'TypeScript ORM that is SQL-like and type-safe with minimal overhead',
        category: 'database',
        tags: ['ORM', 'TypeScript', 'SQL', 'Performance'],
        urls: {
            main: 'https://orm.drizzle.team',
            docs: 'https://orm.drizzle.team/docs/overview',
            github: 'https://github.com/drizzle-team/drizzle-orm',
            npm: 'https://www.npmjs.com/package/drizzle-orm'
        },
        trending: { badge: 'HOT', rank: 2, reason: '20k+ stars' },
        icon: '🌧️'
    },
    {
        id: 'mongodb',
        title: 'MongoDB',
        description: 'Most popular NoSQL database for modern applications',
        category: 'database',
        tags: ['NoSQL', 'Document', 'Database', 'Scalable'],
        urls: {
            main: 'https://www.mongodb.com',
            docs: 'https://www.mongodb.com/docs',
            github: 'https://github.com/mongodb/mongo'
        },
        trending: { badge: 'TRENDING', rank: 3, reason: 'Industry leader' },
        icon: '🍃'
    },
    {
        id: 'redis',
        title: 'Redis',
        description: 'In-memory data structure store used as database, cache, and message broker',
        category: 'database',
        tags: ['Cache', 'In-Memory', 'Database', 'Fast'],
        urls: {
            main: 'https://redis.io',
            docs: 'https://redis.io/docs',
            github: 'https://github.com/redis/redis'
        },
        trending: { badge: 'TRENDING', rank: 4, reason: '60k+ stars' },
        icon: '🔴'
    },

    // === MORE DEVOPS ===
    {
        id: 'docker',
        title: 'Docker',
        description: 'Platform for developing, shipping, and running applications in containers',
        category: 'devops',
        tags: ['Containers', 'DevOps', 'Infrastructure', 'Deployment'],
        urls: {
            main: 'https://www.docker.com',
            docs: 'https://docs.docker.com',
            github: 'https://github.com/docker'
        },
        trending: { badge: 'TRENDING', rank: 1, reason: 'Industry standard' },
        icon: '🐳'
    },
    {
        id: 'kubernetes',
        title: 'Kubernetes',
        description: 'Production-grade container orchestration for automating deployment and scaling',
        category: 'devops',
        tags: ['Containers', 'Orchestration', 'Cloud', 'K8s'],
        urls: {
            main: 'https://kubernetes.io',
            docs: 'https://kubernetes.io/docs',
            github: 'https://github.com/kubernetes/kubernetes'
        },
        trending: { badge: 'TRENDING', rank: 2, reason: '106k+ stars' },
        icon: '☸️'
    },
    {
        id: 'github-actions',
        title: 'GitHub Actions',
        description: 'Automate your workflow from idea to production with CI/CD',
        category: 'devops',
        tags: ['CI/CD', 'Automation', 'GitHub', 'Workflows'],
        urls: {
            main: 'https://github.com/features/actions',
            docs: 'https://docs.github.com/en/actions'
        },
        trending: { badge: 'HOT', rank: 3, reason: 'Most used CI/CD' },
        icon: '⚡'
    },

    // === MORE HOSTING ===
    {
        id: 'netlify',
        title: 'Netlify',
        description: 'All-in-one platform for automating modern web projects',
        category: 'hosting',
        tags: ['Hosting', 'JAMstack', 'Serverless', 'CDN'],
        urls: {
            main: 'https://www.netlify.com',
            docs: 'https://docs.netlify.com',
            demo: 'https://app.netlify.com'
        },
        trending: { badge: 'TRENDING', rank: 1, reason: 'JAMstack leader' },
        icon: '🌐'
    },
    {
        id: 'cloudflare-pages',
        title: 'Cloudflare Pages',
        description: 'JAMstack platform with instant deployments and edge network',
        category: 'hosting',
        tags: ['Hosting', 'Edge', 'Fast', 'Global'],
        urls: {
            main: 'https://pages.cloudflare.com',
            docs: 'https://developers.cloudflare.com/pages'
        },
        trending: { badge: 'HOT', rank: 2, reason: 'Edge computing' },
        icon: '🌥️'
    },

    // === CLOUD SERVICES ===
    {
        id: 'aws',
        title: 'AWS',
        description: 'Amazon Web Services - comprehensive cloud computing platform',
        category: 'cloud-services',
        tags: ['Cloud', 'Infrastructure', 'IaaS', 'PaaS'],
        urls: {
            main: 'https://aws.amazon.com',
            docs: 'https://docs.aws.amazon.com'
        },
        trending: { badge: 'TRENDING', rank: 1, reason: 'Market leader' },
        icon: '☁️'
    },
    {
        id: 'gcp',
        title: 'Google Cloud',
        description: 'Google Cloud Platform for scalable infrastructure and ML services',
        category: 'cloud-services',
        tags: ['Cloud', 'AI', 'Infrastructure', 'Google'],
        urls: {
            main: 'https://cloud.google.com',
            docs: 'https://cloud.google.com/docs'
        },
        trending: { badge: 'TRENDING', rank: 2, reason: 'AI/ML leader' },
        icon: '🌐'
    },

    // === MORE CMS ===
    {
        id: 'contentful',
        title: 'Contentful',
        description: 'Composable content platform for digital experiences at scale',
        category: 'cms',
        tags: ['Headless CMS', 'API', 'Content', 'Enterprise'],
        urls: {
            main: 'https://www.contentful.com',
            docs: 'https://www.contentful.com/developers/docs'
        },
        trending: { badge: 'HOT', rank: 1, reason: 'Enterprise favorite' },
        icon: '📦'
    },
    {
        id: 'sanity',
        title: 'Sanity',
        description: 'Platform for structured content with real-time collaboration',
        category: 'cms',
        tags: ['Headless CMS', 'Real-time', 'Collaborative', 'Structured'],
        urls: {
            main: 'https://www.sanity.io',
            docs: 'https://www.sanity.io/docs',
            github: 'https://github.com/sanity-io/sanity'
        },
        trending: { badge: 'HOT', rank: 2, reason: '$105M funded' },
        icon: '🎨'
    },
    {
        id: 'strapi',
        title: 'Strapi',
        description: 'Open-source headless CMS with customizable API',
        category: 'cms',
        tags: ['Headless CMS', 'Open Source', 'Node.js', 'API'],
        urls: {
            main: 'https://strapi.io',
            docs: 'https://docs.strapi.io',
            github: 'https://github.com/strapi/strapi'
        },
        trending: { badge: 'TRENDING', rank: 3, reason: '60k+ stars' },
        icon: '🚀'
    },

    // === MORE PROJECT MANAGEMENT ===
    {
        id: 'jira',
        title: 'Jira',
        description: 'Project management tool for agile teams from Atlassian',
        category: 'project-management',
        tags: ['Agile', 'Scrum', 'Project Management', 'Tracking'],
        urls: {
            main: 'https://www.atlassian.com/software/jira',
            docs: 'https://support.atlassian.com/jira'
        },
        trending: { badge: 'TRENDING', rank: 1, reason: 'Enterprise standard' },
        icon: '📋'
    },
    {
        id: 'asana',
        title: 'Asana',
        description: 'Work management platform for team collaboration and project tracking',
        category: 'project-management',
        tags: ['Project Management', 'Tasks', 'Collaboration', 'Workflow'],
        urls: {
            main: 'https://asana.com',
            docs: 'https://asana.com/guide'
        },
        trending: { badge: 'TRENDING', rank: 2, reason: 'Public company' },
        icon: '✅'
    },

    // === MORE AUTOMATION ===
    {
        id: 'zapier',
        title: 'Zapier',
        description: 'Automation platform connecting 5000+ apps to automate workflows',
        category: 'automation',
        tags: ['Automation', 'Integration', 'No-Code', 'Workflows'],
        urls: {
            main: 'https://zapier.com',
            docs: 'https://zapier.com/help'
        },
        trending: { badge: 'HOT', rank: 1, reason: '$5B valuation' },
        icon: '⚡'
    },
    {
        id: 'n8n',
        title: 'n8n',
        description: 'Free and open workflow automation tool with 200+ integrations',
        category: 'automation',
        tags: ['Automation', 'Open Source', 'Workflows', 'Self-Hosted'],
        urls: {
            main: 'https://n8n.io',
            docs: 'https://docs.n8n.io',
            github: 'https://github.com/n8n-io/n8n'
        },
        trending: { badge: 'HOT', rank: 2, reason: '40k+ stars' },
        icon: '🔗'
    },

    // === MORE MARKETING ===
    {
        id: 'mailchimp',
        title: 'Mailchimp',
        description: 'All-in-one marketing platform for growing businesses',
        category: 'marketing',
        tags: ['Email', 'Marketing', 'Automation', 'Campaigns'],
        urls: {
            main: 'https://mailchimp.com',
            docs: 'https://mailchimp.com/help'
        },
        trending: { badge: 'TRENDING', rank: 1, reason: '$12B acquisition' },
        icon: '💌'
    },
    {
        id: 'hubspot',
        title: 'HubSpot',
        description: 'Complete CRM platform with marketing, sales, and service hub',
        category: 'crm',
        tags: ['CRM', 'Marketing', 'Sales', 'Automation'],
        urls: {
            main: 'https://www.hubspot.com',
            docs: 'https://developers.hubspot.com/docs'
        },
        trending: { badge: 'HOT', rank: 1, reason: 'Industry leader' },
        icon: '🎯'
    },

    // === MORE SEO ===
    {
        id: 'ahrefs',
        title: 'Ahrefs',
        description: 'SEO tools and resources to grow search traffic',
        category: 'seo',
        tags: ['SEO', 'Backlinks', 'Keywords', 'Analytics'],
        urls: {
            main: 'https://ahrefs.com',
            docs: 'https://help.ahrefs.com'
        },
        trending: { badge: 'HOT', rank: 1, reason: 'SEO industry standard' },
        icon: '🔍'
    },
    {
        id: 'semrush',
        title: 'Semrush',
        description: 'All-in-one marketing toolkit for digital marketing professionals',
        category: 'seo',
        tags: ['SEO', 'Marketing', 'Competitive Analysis', 'Keywords'],
        urls: {
            main: 'https://www.semrush.com',
            docs: 'https://www.semrush.com/kb'
        },
        trending: { badge: 'TRENDING', rank: 2, reason: 'Public company' },
        icon: '📊'
    },

    // === MORE STORAGE ===
    {
        id: 'aws-s3',
        title: 'AWS S3',
        description: 'Scalable object storage service built to retrieve any amount of data',
        category: 'storage',
        tags: ['Cloud Storage', 'Object Storage', 'AWS', 'Scalable'],
        urls: {
            main: 'https://aws.amazon.com/s3',
            docs: 'https://docs.aws.amazon.com/s3'
        },
        trending: { badge: 'TRENDING', rank: 1, reason: 'Industry standard' },
        icon: '☁️'
    },
    {
        id: 'cloudinary',
        title: 'Cloudinary',
        description: 'Media management platform for images and videos at scale',
        category: 'storage',
        tags: ['Media', 'CDN', 'Images', 'Videos'],
        urls: {
            main: 'https://cloudinary.com',
            docs: 'https://cloudinary.com/documentation'
        },
        trending: { badge: 'HOT', rank: 2, reason: 'Media optimization leader' },
        icon: '🖼️'
    },

    // === MORE DESIGN TOOLS ===
    {
        id: 'sketch',
        title: 'Sketch',
        description: 'Design toolkit for creating beautiful interfaces and prototypes',
        category: 'design-tools',
        tags: ['Design', 'UI/UX', 'Mac', 'Prototyping'],
        urls: {
            main: 'https://www.sketch.com',
            docs: 'https://www.sketch.com/docs'
        },
        trending: { badge: 'TRENDING', rank: 1, reason: 'Design standard' },
        icon: '💎'
    },
    {
        id: 'framer',
        title: 'Framer',
        description: 'Interactive design tool for creating stunning websites',
        category: 'design-tools',
        tags: ['Design', 'Interactive', 'Web Design', 'No-Code'],
        urls: {
            main: 'https://www.framer.com',
            docs: 'https://www.framer.com/developers'
        },
        trending: { badge: 'HOT', rank: 2, reason: '$70M funded' },
        icon: '🎨'
    },

    // === ANIMATION ===
    {
        id: 'lottie',
        title: 'Lottie',
        description: 'Library for rendering After Effects animations natively on mobile and web',
        category: 'animation',
        tags: ['Animation', 'After Effects', 'JSON', 'Cross-Platform'],
        urls: {
            main: 'https://airbnb.design/lottie',
            docs: 'https://airbnb.io/lottie/#/',
            github: 'https://github.com/airbnb/lottie-web'
        },
        trending: { badge: 'HOT', rank: 1, reason: '30k+ stars' },
        icon: '✨'
    },
    {
        id: 'greensock',
        title: 'GreenSock (GSAP)',
        description: 'Professional-grade JavaScript animation library for the modern web',
        category: 'animation',
        tags: ['Animation', 'JavaScript', 'Web', 'Performance'],
        urls: {
            main: 'https://greensock.com',
            docs: 'https://greensock.com/docs',
            github: 'https://github.com/greensock/GSAP',
            npm: 'https://www.npmjs.com/package/gsap'
        },
        trending: { badge: 'HOT', rank: 2, reason: 'Animation standard' },
        icon: '🌟'
    },

    // === MORE SECURITY ===
    {
        id: 'auth0',
        title: 'Auth0',
        description: 'Authentication and authorization platform for web and mobile apps',
        category: 'security',
        tags: ['Auth', 'Security', 'SSO', 'Identity'],
        urls: {
            main: 'https://auth0.com',
            docs: 'https://auth0.com/docs'
        },
        trending: { badge: 'TRENDING', rank: 1, reason: '$6.5B acquisition' },
        icon: '🔒'
    },
    {
        id: 'snyk',
        title: 'Snyk',
        description: 'Developer security platform to find and fix vulnerabilities',
        category: 'security',
        tags: ['Security', 'Vulnerabilities', 'DevSecOps', 'Open Source'],
        urls: {
            main: 'https://snyk.io',
            docs: 'https://docs.snyk.io'
        },
        trending: { badge: 'HOT', rank: 2, reason: '$8.5B valuation' },
        icon: '🛡️'
    },

    // === MORE DATA ANALYTICS ===
    {
        id: 'tableau',
        title: 'Tableau',
        description: 'Visual analytics platform transforming data into actionable insights',
        category: 'data-analytics',
        tags: ['Analytics', 'BI', 'Visualization', 'Enterprise'],
        urls: {
            main: 'https://www.tableau.com',
            docs: 'https://help.tableau.com'
        },
        trending: { badge: 'TRENDING', rank: 1, reason: '$15.7B acquisition' },
        icon: '📊'
    },
    {
        id: 'looker',
        title: 'Looker',
        description: 'Business intelligence platform for exploring and sharing real-time insights',
        category: 'data-analytics',
        tags: ['BI', 'Analytics', 'Data', 'Google'],
        urls: {
            main: 'https://cloud.google.com/looker',
            docs: 'https://cloud.google.com/looker/docs'
        },
        trending: { badge: 'TRENDING', rank: 2, reason: 'Google acquisition' },
        icon: '🔍'
    },

    // === MORE APIS ===
    {
        id: 'twilio',
        title: 'Twilio',
        description: 'Customer engagement platform with APIs for SMS, voice, and video',
        category: 'apis',
        tags: ['API', 'SMS', 'Voice', 'Communications'],
        urls: {
            main: 'https://www.twilio.com',
            docs: 'https://www.twilio.com/docs'
        },
        trending: { badge: 'TRENDING', rank: 1, reason: 'Communications leader' },
        icon: '📞'
    },
    {
        id: 'postman',
        title: 'Postman',
        description: 'API platform for building and using APIs',
        category: 'apis',
        tags: ['API', 'Testing', 'Development', 'Collaboration'],
        urls: {
            main: 'https://www.postman.com',
            docs: 'https://learning.postman.com/docs'
        },
        trending: { badge: 'HOT', rank: 2, reason: '$5.6B valuation' },
        icon: '📮'
    },
];

// Helper functions
export const getWorkspacesByCategory = (category: WorkspaceCategory): ProjectWorkspace[] => {
    return workspaces
        .filter(ws => ws.category === category)
        .sort((a, b) => (a.trending.rank || 999) - (b.trending.rank || 999));
};

export const getWorkspaceById = (id: string): ProjectWorkspace | undefined => {
    return workspaces.find(ws => ws.id === id);
};

export const getTrendingWorkspaces = (limit: number = 10): ProjectWorkspace[] => {
    return [...workspaces]
        .sort((a, b) => (a.trending.rank || 999) - (b.trending.rank || 999))
        .slice(0, limit);
};

export const searchWorkspaces = (query: string): ProjectWorkspace[] => {
    const lowerQuery = query.toLowerCase();
    return workspaces.filter(ws =>
        ws.title.toLowerCase().includes(lowerQuery) ||
        ws.description.toLowerCase().includes(lowerQuery) ||
        ws.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
};

// Category labels for UI
export const categoryLabels: Record<WorkspaceCategory, string> = {
    // Development
    'frontend': '🎨 Frontend Development',
    'backend': '⚙️ Backend Development',
    'fullstack': '🔄 Full Stack Frameworks',
    'mobile': '📱 Mobile Development',
    'database': '🗄️ Databases & ORMs',
    'devops': '🚀 DevOps & CI/CD',

    // AI & Data
    'ai-ml': '🤖 AI & Machine Learning',
    'data-analytics': '📊 Data Analytics',
    'llm-tools': '🧠 LLM & AI Tools',

    // Design & Creative
    'design-systems': '🎨 Design Systems',
    'design-tools': '🖌️ Design Tools',
    'animation': '🎬 Animation & Motion',
    'video-editing': '🎥 Video Editing',
    'image-generation': '🖼️ AI Image Generation',

    // Audio & Music
    'music-production': '🎵 Music Production',
    'audio-editing': '🎧 Audio Editing',
    'voice-ai': '🎤 Voice & Speech AI',
    'podcasting': '🎙️ Podcasting Tools',

    // Infrastructure & Deployment
    'deployment': '🚢 Deployment Platforms',
    'hosting': '🌐 Web Hosting',
    'cloud-services': '☁️ Cloud Services',
    'monitoring': '📈 Monitoring & Observability',

    // Productivity & Business
    'collaboration': '👥 Collaboration Tools',
    'project-management': '📋 Project Management',
    'automation': '⚡ Automation & Workflow',
    'crm': '💼 CRM & Sales',
    'analytics': '📊 Business Analytics',

    // Content & Marketing
    'cms': '📝 Content Management',
    'ecommerce': '🛒 E-commerce Platforms',
    'marketing': '📢 Marketing Tools',
    'seo': '🔍 SEO & Search',
    'email': '✉️ Email Marketing',

    // Security & Auth
    'authentication': '🔐 Authentication & Auth',
    'security': '🛡️ Security Tools',
    'testing': '🧪 Testing & QA',

    // Miscellaneous
    'apis': '🔌 APIs & Integrations',
    'payments': '💳 Payment Processing',
    'storage': '💾 Cloud Storage',
    'other': '🔧 Other Tools'
};

// Badge colors
export const badgeStyles = {
    'NEW': 'bg-green-500/20 text-green-300 border-green-500/30',
    'HOT': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    'TRENDING': 'bg-blue-500/20 text-blue-300 border-blue-500/30'
};
