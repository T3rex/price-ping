# Price Ping 🔔

**Price Ping** is an intelligent, automated price-tracking web application built to monitor products across major e-commerce platforms like Amazon, Flipkart, and Myntra. It leverages advanced AI scraping to ensure you never miss a deal by sending instant email alerts the moment a price drops.

---

## 🚀 Features

- **Real-Time Tracking**: Monitors your favorite items 24/7 and catches flash sales before they expire.

- **AI-Powered Scraping**: Utilizes enterprise-grade technology to extract product names, prices, and images accurately from dynamic websites.

- **Instant Email Alerts**: Automatically calculates price drops and percentages, sending a detailed alert via Resend when a deal is found.

- **Price History Visualization**: Includes interactive charts to track price trends over time, helping you predict the best time to buy.
- **Multi-Store Support**: One unified dashboard to manage shopping lists across multiple retailers.

- **Secure Authentication**: User accounts and data are managed securely via Supabase.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS.

- **Backend/Database**: Supabase (PostgreSQL & Auth).

- **Scraping Engine**: Firecrawl (AI-based web scraping).

- **Email Service**: Resend.

- **Components**: Radix UI, Lucide React, and Recharts for data visualization.

---

## 📦 Getting Started

Prerequisites

- Node.js 18+
- A Supabase project
- A Firecrawl API key
- A Resend API key

---

Price Ping 🔔
Price Ping is an intelligent, automated price-tracking web application built to monitor products across major e-commerce platforms like Amazon, Flipkart, and Myntra. It leverages advanced AI scraping to ensure you never miss a deal by sending instant email alerts the moment a price drops.

🚀 Features
Real-Time Tracking: Monitors your favorite items 24/7 and catches flash sales before they expire.

AI-Powered Scraping: Utilizes enterprise-grade technology to extract product names, prices, and images accurately from dynamic websites.

Instant Email Alerts: Automatically calculates price drops and percentages, sending a detailed alert via Resend when a deal is found.

Price History Visualization: Includes interactive charts to track price trends over time, helping you predict the best time to buy.

Multi-Store Support: One unified dashboard to manage shopping lists across multiple retailers.

Secure Authentication: User accounts and data are managed securely via Supabase.

🛠️ Tech Stack
Frontend: Next.js 15 (App Router), React 19, Tailwind CSS.

Backend/Database: Supabase (PostgreSQL & Auth).

Scraping Engine: Firecrawl (AI-based web scraping).

Email Service: Resend.

Components: Radix UI, Lucide React, and Recharts for data visualization.

📦 Getting Started
Prerequisites
Node.js 18+

A Supabase project

A Firecrawl API key

A Resend API key

---

## 🤖 Installation

1. Clone the repository

```bash
git clone https://github.com/T3rex/price-ping.git
cd price-ping
```

2. Install dependencies

```bash
npm install
```

3. Environment Setup Create a .env.local file in the root directory and add the following:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supaase_publishable_key
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_SECRET=your_google_client_secret
CRON_SECRET=your_cron_secret()
FIRECRAWL_API_KEY=your_firecrawl_key
RESEND_API_KEY=your_resend_key
RESEND_FROM_EMAIL=onboarding@resend.dev
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Run the Development Server

```bash
npm run dev
```

Open http://localhost:3000 to see the application.

---

## 🚦 How It Works

- **Search** : Paste a product URL from a supported store into the dashboard.

- **Scrape** : The app uses Firecrawl to extract the current price and product details.

- **Track** : A cron job periodically checks for price updates.

- **Ping** : If the price decreases, an automated email is sent to you with a direct link to buy.
