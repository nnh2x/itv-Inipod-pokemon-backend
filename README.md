# Pokémon Explorer App

## Project Overview
This is a full-stack Pokémon application developed as part of the Inipod Technical Assessment for a Full-stack Engineer position. The application allows users to explore, search, and manage their favorite Pokémon.

## Features
### Frontend (Angular)
- User Authentication
  - Signup and login with JWT
  - Secure authentication system
- Responsive Layout
  - Header, Navigation, Footer, and main content area
- Home Page
  - Pokémon YouTube video carousel
  - Initial Pokémon showcase (10 Pokémon)
- Pokémon List Page
  - CSV file import functionality
  - Advanced search and filtering
    - Name search with 300ms debounce
    - Filters for type, legendary status, speed
  - Pagination with configurable page size
  - Query parameter support for filtering

- Pokémon Details
  - Detailed modal with comprehensive information
  - Favorite Pokémon management

### Backend (Node.js/Nest.js)
- Database Design
  - Stores Pokémon data, user information, and favorite lists
- RESTful API Endpoints
  - User Authentication (Signup/Login/Logout)
  - Pokémon Import from CSV
  - Pokémon List Retrieval with Filtering
  - Individual Pokémon Details
  - Favorite Pokémon Management

## Prerequisites
- Node.js (v14+ recommended)
- Angular CLI
- MongoDB/PostgreSQL
- npm or yarn

## Installation

### Clone the Repository
```bash

```

create file .env

### Backend Setup
```bash
cd backend
npm install
# or
yarn install

# Copy and modify environment variables
cp .env.example .env

# Run database migrations (if applicable)
npm run migrate

# Start the server
npm run start:dev
``

## Running the Application
- Backend: `npm run start:dev` (typically runs on http://localhost:3000)
- Frontend: `ng serve` (typically runs on http://localhost:4200)

## Environment Variables
Create a `.env` file in the backend directory with:
```
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret
POKEMON_CSV_PATH=path/to/pokemon/csv
```

## Testing
```bash
# Backend tests
npm run test

# Frontend tests
ng test
```

## Deployment

## Technologies Used
- Frontend
  - Angular
  - Tailwind CSS / ng-zorro
  - RxJS
- Backend
  - Node.js / Nest.js
  - TypeORM / Mongoose
  - JWT for authentication
- Database
  - MongoDB or PostgreSQL

## Design Decisions
- Chose JWT for stateless authentication
- Implemented 300ms debounce for search to improve performance
- Used pagination to handle large Pokémon datasets
- Implemented comprehensive filtering options

## Known Limitations
- Initial import of Pokémon requires CSV file
- Performance may vary with large datasets
- Limited to specific Pokémon attributes in filtering

## Contributing
1. Fork the repository
5. Open a Pull Request

## License
Distributed under the MIT License. See `LICENSE` for more information.

## Contact
Your Name - your.email@example.com

Project Link: [https://github.com/your-username/pokemon-explorer](https://github.com/your-username/pokemon-explorer)
