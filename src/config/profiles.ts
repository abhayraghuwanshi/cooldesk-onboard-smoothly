import { ProjectWorkspace, workspaces } from './workspaces';

// Helper to get links from existing workspaces
const getWorkspaceLinks = (ids: string[]): Record<string, string> => {
    const links: Record<string, string> = {};
    ids.forEach(id => {
        const workspace = workspaces.find(w => w.id === id);
        if (workspace) {
            // Use title as key, and prioritize main > demo > docs > github
            const url = workspace.urls.main || workspace.urls.demo || workspace.urls.docs || workspace.urls.github;
            if (url) {
                links[workspace.title] = url;
            }
        }
    });
    return links;
};

export const profiles: ProjectWorkspace[] = [
    {
        id: 'full-stack-engineer',
        title: 'Full Stack Engineer',
        description: 'The ultimate workspace for building end-to-end web applications',
        category: 'fullstack',
        tags: ['React', 'Node.js', 'Database', 'DevOps'],
        urls: {
            // Custom important links
            ...getWorkspaceLinks(['nextjs', 'remix', 'bun', 'supabase', 'clerk', 'vercel', 'tailwindcss', 'shadcn-ui']),
            'GitHub Trending': 'https://github.com/trending',
            'StackOverflow': 'https://stackoverflow.com',
        },
        trending: {
            badge: 'HOT',
            rank: 1,
            reason: 'Most popular role'
        },
        icon: '💻',
        featured: true
    },
    {
        id: 'ai-engineer',
        title: 'AI Engineer',
        description: 'Cutting-edge tools for LLMs, machine learning, and AI application development',
        category: 'ai-ml',
        tags: ['LLM', 'Python', 'Models', 'RAG'],
        urls: {
            ...getWorkspaceLinks(['langchain', 'ollama', 'huggingface', 'deepseek', 'anthropic', 'vercel-ai', 'pytorch', 'tensorflow', 'midjourney', 'stability-ai']),
            'Kaggle': 'https://kaggle.com',
        },
        trending: {
            badge: 'TRENDING',
            rank: 2,
            reason: 'High demand'
        },
        icon: '🤖',
        featured: true
    },
    {
        id: 'data-scientist',
        title: 'Data Scientist',
        description: 'Essential tools for data analysis, ML modeling, and visualization',
        category: 'data-analytics',
        tags: ['Python', 'Jupyter', 'Pandas', 'Analytics'],
        urls: {
            // Some might not be in workspaces yet, so we mix
            ...getWorkspaceLinks(['pytorch', 'tensorflow', 'huggingface']),
            'Jupyter': 'https://jupyter.org',
            'Pandas': 'https://pandas.pydata.org',
            'NumPy': 'https://numpy.org',
            'Colab': 'https://colab.research.google.com',
            'Kaggle': 'https://kaggle.com'
        },
        trending: {
            badge: 'NEW',
            rank: 3,
            reason: 'Growing field'
        },
        icon: '📊',
        featured: true
    },
    {
        id: 'cloud-devops',
        title: 'Cloud & DevOps',
        description: 'Complete toolkit for managing cloud infrastructure and immersive deployments',
        category: 'devops',
        tags: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
        urls: {
            ...getWorkspaceLinks(['railway', 'vercel', 'planetscale', 'supabase', 'docker-workspace', 'turbo']),
            'AWS Console': 'https://aws.amazon.com/console',
            'Docker Hub': 'https://hub.docker.com',
            'Kubernetes': 'https://kubernetes.io',
            'Terraform': 'https://terraform.io'
        },
        trending: {
            badge: 'TRENDING',
            rank: 4,
            reason: 'Essential skills'
        },
        icon: '☁️',
        featured: true
    },
    {
        id: 'ui-ux-designer',
        title: 'UI/UX Designer',
        description: 'Top tier tools for designing beautiful user interfaces and experiences',
        category: 'design-systems',
        tags: ['Figma', 'Design', 'Systems', 'Tailwind'],
        urls: {
            ...getWorkspaceLinks(['figma', 'radix-ui', 'headlessui', 'tailwindui', 'chakra-ui', 'material-ui', 'ant-design', 'shadcn-ui']),
            'Dribbble': 'https://dribbble.com',
            'Behance': 'https://behance.net',
            'Coolors': 'https://coolors.co'
        },
        trending: {
            badge: 'HOT',
            rank: 5,
            reason: 'Visual impact'
        },
        icon: '🎨',
        featured: true
    },
    {
        id: 'web3-developer',
        title: 'Web3 Developer',
        description: 'Resources for building decentralized applications and smart contracts',
        category: 'backend',
        tags: ['Solidity', 'Web3', 'Blockchain', 'Crypto'],
        urls: {
            'Ethereum': 'https://ethereum.org',
            'Solidity': 'https://docs.soliditylang.org',
            'Metamask': 'https://metamask.io',
            'Remix IDE': 'https://remix.ethereum.org',
            'Etherscan': 'https://etherscan.io',
            'Hardhat': 'https://hardhat.org',
            'OpenZeppelin': 'https://openzeppelin.com'
        },
        trending: {
            badge: 'NEW',
            rank: 6,
            reason: 'Emerging Tech'
        },
        icon: '⛓️',
        featured: true
    }
];
