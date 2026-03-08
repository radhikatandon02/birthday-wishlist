# 🎂 Birthday Wishlist

A beautiful, personalized birthday wishlist app where users can create and share gift wishlists with friends and family.

## ✨ Features

- **User Authentication** — Secure email/password signup and login
- **Create Wishlists** — Add gift items with names, links, prices, and notes
- **Shareable Links** — Share your wishlist via a unique public URL
- **Personalized Dashboard** — Each user sees only their own wishlists
- **Confetti Celebrations** — Fun animations when viewing wishlists
- **Responsive Design** — Works seamlessly on desktop and mobile

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 18 + TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Animations** | Framer Motion |
| **Routing** | React Router v6 |
| **Data Fetching** | TanStack React Query |
| **Backend** | Supabase (Auth, Database, RLS) |
| **Forms** | React Hook Form + Zod |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:8080`.

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   └── ui/           # shadcn/ui primitives
├── hooks/            # Custom React hooks (auth, toast, etc.)
├── integrations/     # Supabase client & types
├── lib/              # Utilities and business logic
├── pages/            # Route-level page components
│   ├── Index.tsx     # Dashboard — list user's wishlists
│   ├── Auth.tsx      # Login / Signup
│   ├── CreateWishlist.tsx
│   └── ViewWishlist.tsx
└── index.css         # Design tokens & global styles
```

## 🔒 Security

- Row Level Security (RLS) ensures users can only access their own wishlists
- Public read access is available for shared wishlist links
- Authentication is required for creating and managing wishlists

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run test` | Run tests |
| `npm run lint` | Lint with ESLint |

## 📄 License

This project is private.
