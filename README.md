# Eventize

A web application for event management built with Angular and Node.js.

## Description

Eventize is a full-stack web application that allows users to create, manage, and track events. Users can register, log in, create events, manage guest lists, and categorize events.

## Features

- User authentication (register/login)
- Event management (create, edit, delete)
- Guest list management
- Event categorization
- Responsive design

## Tech Stack

- **Frontend**: 
  - Angular 
  - TypeScript
  - RxJS
  - Angular Router

- **Backend**:
  - Node.js
  - Express.js
  - PostgreSQL
  - CORS

## Project Structure

```
src/
├── app/
│   ├── backend/        # Node.js server
│   ├── layout/         # Layout components
│   ├── pages/          # Page components
│   └── data.service.ts # API service
```

## API Endpoints

| Endpoint              | Method | Description                  |
|-----------------------|--------|------------------------------|
| `/api/registrar`      | POST   | Register new user            |
| `/api/verificar`      | POST   | User authentication          |
| `/api/eventos`        | GET    | Fetch all events             |
| `/api/categorias`     | GET    | Fetch event categories       |
| `/api/agregarevento`  | POST   | Create new event             |
| `/api/eliminarevento` | POST   | Delete event                 |
| `/api/invitar`        | POST   | Add guest to event           |

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/eventize.git
   ```

2. Install dependencies:
   ```bash
   cd eventize
   npm install
   ```

3. Set up the database:
   - Create a PostgreSQL database
   - Update database credentials in `src/app/backend/server.js`

4. Start the backend server:
   ```bash
   cd src/app/backend
   node server.js
   ```

5. Start the Angular development server:
   ```bash
   ng serve
   ```

6. Open `http://localhost:4200` in your browser.

## Environment Variables

Create a `.env` file in the root directory:

```env
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=5432
DB_NAME=your_db_name
```

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

