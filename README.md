# 🎮 Aramızdaki Oyuncu (ARMOYU Web)

![ARMOYU Logo](https://api.armoyu.com/medya/armoyu_logo.png)

Welcome to the main web platform of the **ARMOYU** ecosystem. This project is built with Next.js 16 (App Router) and utilizes the premium `@armoyu/ui` and `@armoyu/core` libraries.

---

## 🛠️ Prerequisites

Before starting the development server, ensure you have your API credentials ready.

1. **API Key**: Required for proxying requests to the backend.
2. **Environment File**: 
   - Copy `.env.example` to `.env.local`
   - Set your `ARMOYU_API_KEY` and `ARMOYU_API_URL`.

---

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your credentials
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Open Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 🛡️ Security & Proxy

This project implements a **Server-Side Proxy** to protect your sensitive API keys. 
- All requests are routed through `/api/proxy`.
- The API Key is injected on the server and is never exposed to the client's network tab.

---

## 🎨 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4 + ARMOYU Design System
- **SDK**: @armoyu/core (Logic) & @armoyu/ui (Components)
- **Real-time**: Socket.io Client

---

## 📄 License

Copyright © 2026 [ARMOYU](https://armoyu.com). All rights reserved.
