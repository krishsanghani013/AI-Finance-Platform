# 🚀 Flowoid - AI Powered Finance Platform

<div align="center">
  <img src="public/logo.png" alt="Flowoid Logo" width="360" />
  <p><strong>Build to Flow</strong> — An intelligent financial management and expense tracking platform powered by AI and event-driven automation.</p>
</div>

---

## 🌟 Key Features

- **📊 Comprehensive Financial Dashboard**: Real-time account balances, monthly expense breakdowns, dynamic category pie charts, and income vs. expense analytics powered by Recharts.
- **🏦 Multi-Account Management**: Create and manage multiple accounts (Savings, Current), switch default accounts seamlessly, and delete accounts with cascading transaction management.
- **🧾 Smart AI Receipt Scanner**: Extract merchant names, transaction dates, amounts, and automatic categorization directly from receipt photos using Google Gemini AI.
- **🔄 Recurring Transactions Automation**: Automatically process scheduled transactions (Daily, Weekly, Monthly, Yearly) via background event queues with Inngest.
- **⚠️ Intelligent Budget Alerts**: Automated budget tracking that proactively sends email alerts when spending crosses 80% of monthly budgets.
- **📈 Monthly Reports & AI Insights**: Automated monthly financial reports with actionable AI financial insights delivered via Resend and React Email.
- **🛡️ Enterprise-Grade Security & Rate Limiting**: Request protection and rate limiting powered by Arcjet.
- **🔐 Modern Authentication**: User authentication and profile management powered by Clerk.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Actions) & [React 19](https://react.dev/)
- **Database & ORM**: [PostgreSQL](https://www.postgresql.org/) (Supabase) & [Prisma ORM](https://www.prisma.io/)
- **AI & Vision**: [Google Generative AI (Gemini)](https://ai.google.dev/)
- **Background Jobs & Event-Driven Engine**: [Inngest](https://www.inngest.com/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Email Delivery & Templates**: [Resend](https://resend.com/) & [React Email](https://react.email/)
- **Rate Limiting & Security**: [Arcjet](https://arcjet.com/)
- **Styling & UI**: [Tailwind CSS v4](https://tailwindcss.com/), Radix UI, [Lucide Icons](https://lucide.dev/), [Sonner](https://sonner.emilkowal.ski/), [Recharts](https://recharts.org/)

---

## 📁 Project Structure

```bash
├── actions/                  # Next.js Server Actions (Accounts, Budget, Dashboard, Transactions, Email)
├── app/                      # Next.js App Router Pages & API Routes
│   ├── (auth)/               # Authentication route group (Sign-in / Sign-up)
│   ├── (main)/               # Authenticated application pages
│   │   ├── account/[id]/     # Account details and transaction history
│   │   ├── dashboard/        # Main financial dashboard & overview charts
│   │   └── transaction/      # Add/edit transactions & AI receipt scanner
│   ├── api/inngest/          # Inngest webhook route handler
│   └── layout.js             # Root application layout
├── components/               # Reusable UI components & Navigation
│   └── ui/                   # Base UI component library (Cards, Buttons, Drawers, etc.)
├── data/                     # Static categories and landing page content
├── hooks/                    # Custom React hooks (e.g. useFetch)
├── lib/                      # Database clients, Arcjet, Prisma, and Inngest setup
│   └── inngest/              # Inngest client and cron / event functions
├── prisma/                   # Prisma schema and database migrations
├── public/                   # Static assets, logos, and banner images
└── react-email-starter/      # React Email templates for alerts and monthly reports
```

---

## ⚡ Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [PostgreSQL Database](https://supabase.com/) (e.g., Supabase)
- Clerk, Arcjet, Resend, and Google Gemini API keys

### 2. Clone the Repository

```bash
git clone https://github.com/your-username/flowoid-ai-finance.git
cd flowoid-ai-finance
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and configure the following:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard

# Database (PostgreSQL / Supabase)
DATABASE_URL="postgresql://user:password@host:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://user:password@host:5432/postgres"

# Arcjet Rate Limiting
ARCJET_KEY=ajkey_...

# Resend Email Service
RESEND_API_KEY=re_...

# Google Gemini AI
GEMINI_API_KEY=AIzaSy...
```

### 5. Initialize the Database

Push the Prisma schema to your PostgreSQL database and generate the Prisma Client:

```bash
npx prisma db push
npx prisma generate
```

*(Optional) Seed initial data:*
```bash
# You can use the built-in seed action or route if needed
```

---

## 🏃 Running the Application

### 1. Start the Next.js Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Start the Inngest Dev Server (for background cron & events)

In a separate terminal, start the Inngest local development environment:

```bash
npm run inngest:dev
```

Open [http://localhost:8288](http://localhost:8288) to inspect, test, and trigger background functions:
- `check-budget-alerts` (Runs every 6 hours)
- `trigger-recurring-transactions` (Runs daily at midnight)
- `process-recurring-transaction` (Triggered on event `transaction.recurring.process`)
- `generate-monthly-reports` (Runs on the 1st of every month)

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Next.js in development mode on port 3000 |
| `npm run inngest:dev` | Starts Inngest CLI connected to your local Next.js API |
| `npm run build` | Compiles the production build |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint to check for code issues |

---

## 📄 License

This project is licensed under the MIT License.
