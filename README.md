# Zorvyn - Financial Dashboard (Assignment Submission)

Zorvyn is a modern, responsive financial dashboard built for tracking income, expenses, and transaction history. This project was developed as part of a technical assignment to demonstrate Proficiency in **Next.js 16**, **TypeScript**, and **Modern UI/UX** development.

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Key Features](#key-features)
4. [Approach & Rationale](#approach--rationale)
5. [Setup Instructions](#setup-instructions)
6. [Future Enhancements](#future-enhancements)

## 🎯 Project Overview

The goal of this assignment was to create a functional and aesthetically pleasing financial dashboard that allows users to:

- Monitor their current balance, total income, and expenditures.
- Visualize financial trends through interactive charts.
- Manage transaction records (CRUD operations) with advanced filtering.
- Experience a seamless, responsive UI with dark/light mode support.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **State Management**: Zustand (Minimalistic, high performance)
- **Forms & Validation**: React Hook Form with Zod (Type-safe schemas)
- **Styling**: Tailwind CSS 4 & CSS Variables
- **Animations**: Motion (framer-motion) for smooth transitions
- **Charts**: Recharts (Customized Area and Pie charts)
- **Icons**: Lucide React
- **Date Handling**: date-fns

## ✨ Key Features

- **📊 Interactive Dashboard**: Real-time summary cards and charts.
- **💸 Transaction Engine**:
  - **CRUD Operations**: Add, Edit, Delete, and View transactions.
  - **Search & Filter**: Debounced search with status (Paid, Pending, Overdue) and time filters.
  - **Sorting**: Multi-column sorting (Date, Amount, Status).
  - **Pagination**: Efficiently handles lists of transactions.
- **🌑 Global Theme Engine**: Persistent Dark and Light modes.
- **👤 Account Switcher**: Simulated Admin vs. User roles to show role-specific UI elements (e.g., Delete/Edit permissions).
- **📱 Mobile-First Design**: Custom mobile views for transaction lists and layouts.

## 🧠 Approach & Rationale

### 1. Feature-Based Architecture (FBA)

The project structure is organized by feature (`dashboard`, `transactions`) rather than by technical layer (components, hooks). This ensures that logic remains modular and encapsulated, making the application easier to scale and debug.

### 2. State Management with Zustand

I chose **Zustand** over Redux or Context API because:

- **Simplicity**: Reduced boilerplate while maintaining a global state.
- **Performance**: High-precision selectors prevent unnecessary re-renders.
- **Persistence**: Easily integrates with `localStorage` for theme and user settings.

### 3. Separation of Concerns

- **Shared Layer**: Common UI components (buttons, inputs), generic hooks, and utility functions are abstracted into the `shared` directory.
- **Feature Layer**: Business logic, feature-specific components, and specialized hooks are kept within their respective feature folders.

### 4. Visual Excellence (UX)

While this is a technical assignment, special care was taken for the UI:

- **Glassmorphism**: Subtle backdrops and borders for a premium feel.
- **Micro-animations**: Smooth transitions for the sidebar, modals, and charts to enhance user engagement.
- **Responsive Layouts**: Using a mix of Flexbox and Grid to ensure a perfect experience across all screen sizes.

## 🚀 Setup Instructions

1. **Clone the project:**

   ```bash
   git clone https://github.com/LoKii0007/zorvyn.git
   cd zorvyn
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Access the application:**
   Visit [http://localhost:3000](http://localhost:3000)
