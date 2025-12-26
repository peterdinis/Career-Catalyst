# CareerCatalyst 🚀

An AI-powered career preparation platform built with Next.js and Google Gemini AI.

## Features

### 🎯 Resume Optimizer

- Upload resume (PDF, DOCX, TXT)
- ATS compatibility scoring
- Keyword analysis and optimization
- Impact statement rewrites
- Formatting recommendations
- **Cached results** for faster repeated analyses

### ✨ Cover Letter Generator

- Personalized cover letter creation
- Multiple tone options (Professional, Innovative, Creative, Conservative)
- Company-specific customization
- Copy to clipboard functionality
- **Cached generation** to save API calls

### 💬 Interview Coach

- Interactive interview simulation
- Real-time feedback on answers
- Customizable interview settings (role, company type, seniority, difficulty)
- STAR method guidance
- Confidence scoring

### 🎨 Design Features

- **Dark/Light Mode Toggle** - Seamless theme switching with localStorage persistence
- Premium glassmorphism UI
- Smooth animations with Framer Motion
- Fully responsive design
- Accessible components

### ⚡ Performance

- **Client-side caching** with configurable TTL
- Optimized API calls
- Fast page loads with Next.js 16 Turbopack

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **AI**: Google Gemini 2.0 Flash
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **File Upload**: React Dropzone

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone <repo-url>
   cd career-catalyst
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables:
   \`\`\`bash

# Create .env.local file

echo "GEMINI_API_KEY=your_api_key_here" > .env.local
\`\`\`

Get your Gemini API key from: https://aistudio.google.com/app/apikey

4. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Features in Detail

### Caching System

The application implements an intelligent caching system to:

- Reduce API calls and costs
- Improve response times for repeated queries
- Provide instant results for identical requests

**Cache TTL:**

- Resume Analysis: 10 minutes
- Cover Letter Generation: 15 minutes

**Cache Key Generation:**
Automatically generates unique cache keys based on endpoint and parameters.

### Theme System

- **Dark Mode** (default): Premium dark theme with vibrant accents
- **Light Mode**: Clean, professional light theme
- **Persistence**: Theme preference saved to localStorage
- **Smooth Transitions**: Animated theme switching

### AI Integration

All three modules use Google Gemini AI with:

- Structured prompts for consistent output
- JSON response parsing
- Fallback to mock data when API key not configured
- Error handling and graceful degradation

## Project Structure

\`\`\`
src/
├── app/
│ ├── api/ # API routes
│ ├── resume-optimizer/ # Resume module
│ ├── cover-letter/ # Cover letter module
│ ├── interview-coach/ # Interview module
│ └── page.tsx # Landing page
├── components/
│ ├── layout/ # Navbar, ThemeProvider
│ ├── resume/ # Resume components
│ ├── cover-letter/ # Cover letter components
│ └── interview/ # Interview components
├── lib/
│ ├── gemini.ts # Gemini AI utility
│ ├── cache.ts # Caching utility
│ └── utils.ts # Helper functions
└── types/
└── resume.ts # TypeScript types
\`\`\`

## Environment Variables

| Variable           | Description           | Required              |
| ------------------ | --------------------- | --------------------- |
| \`GEMINI_API_KEY\` | Google Gemini API key | Yes (for AI features) |

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project to Vercel
3. Add \`GEMINI_API_KEY\` environment variable
4. Deploy

### Other Platforms

The app can be deployed to any platform supporting Next.js:

- Netlify
- AWS Amplify
- Railway
- Render

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
