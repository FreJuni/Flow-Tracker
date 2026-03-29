# Flow-Tracker

Flow-Tracker is a comprehensive modern web application designed for managing inventory, order flow, and warehouse operations. Built with a robust full-stack architecture, it streamlines complex workflows like stock picking, truck allocation, and dynamic pricing management.

## Core Features
- **Secure Authentication**: Robust role-based access control.

## Tech Stack

This project is built using modern, type-safe web technologies:

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Database & ORM**: [Prisma](https://www.prisma.io/) with PostgreSQL
- **API Engine**: [tRPC](https://trpc.io/) for end-to-end typesafe APIs
- **State Management**: [TanStack Query](https://tanstack.com/query/latest) (React Query)
- **Authentication**: [Better Auth](https://better-auth.com/)
- **Styling & Components**: [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Yarn, npm, or pnpm
- A running PostgreSQL database instance

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd flowtrack
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and configure your credentials:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/flowtrack"
   BETTER_AUTH_SECRET="your-secret-key-here"
   ```

4. **Initialize the database:**
   Run Prisma migrations to build the database schema.
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server:**
   ```bash
   yarn dev
   ```

The application will be available at `http://localhost:3000`.

## Architecture & Code Quality

The repository adopts a modular architecture separating presentation components from business logic:
- Type safety enforced uniformly from backend to frontend components via tRPC.
- Modern React hooks and declarative data fetching abstractions.
- Custom automated PDF layout generation for precise logistical reporting.

## License

This project is proprietary and confidential. All rights reserved.
