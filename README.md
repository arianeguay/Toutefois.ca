# WordPress + React Monorepo

This is a monorepo setup for a WordPress website with a React frontend.

## Project Structure

```
wordpress-react-monorepo/
├── docker/                 # Docker configuration files
│   └── php.ini            # PHP configuration
├── frontend/              # React frontend application
├── wordpress/             # WordPress installation
└── docker-compose.yml     # Docker Compose configuration
```

## Prerequisites

- Docker and Docker Compose
- Node.js (v16+ recommended)
- npm or yarn

## Getting Started

### 1. Start WordPress

```bash
docker-compose up -d
```

WordPress will be available at: http://localhost:8000

### 2. Set Up WordPress

1. Complete the WordPress installation wizard
2. Log in to the WordPress admin panel
3. Set your preferred permalink structure (Settings > Permalinks)

### 3. Set Up React Frontend

```bash
cd frontend
npm install
npm run dev
```

The React app will be available at: http://localhost:5173

## Development

- WordPress API: http://localhost:8000/wp-json/
- phpMyAdmin: http://localhost:8080
  - Username: root
  - Password: password

## Production Build

To build the React app for production:

```bash
cd frontend
npm run build
```

## WordPress Headless Setup

To use WordPress as a headless CMS with React:

1. Install and activate the following WordPress plugins:
   - JWT Authentication for WP REST API
   - WP REST API

2. Configure your React app to make API requests to the WordPress REST API.

## Environment Variables

Create a `.env` file in the `frontend` directory with the following variables:

```env
VITE_WP_API_URL=http://localhost:8000/wp-json
# Add other environment variables as needed
```
