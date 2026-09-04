# ProductPilot - Product Catalog

A full-stack product catalog application built for Meadow Vale Foods.

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, TypeScript
- **Backend**: Node.js, Express, MySQL
- **Features**: Search, Filtering, Pagination, Sorting, Dynamic Filter Counts

## Features

- 🔍 **Search**: Case-insensitive search by product code or description
- 🎯 **Filters**: Packaging, brand, stock, and printed status with dynamic counts
- 📄 **Pagination**: 20 items per page
- 🔄 **Reset**: One-click reset for all filters
- ⌨️ **Keyboard Shortcuts**: Escape key to clear search or reset all
- 🎨 **UI**: Meadow Vale Foods brand colors
- 📱 **Responsive**: Works on all screen sizes

## Setup

### Prerequisites

- Node.js (v18 or later)
- MySQL (v8 or later)

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run dev