# SDG 8 Job Opportunities & Growth Tracker

A full-stack web application promoting decent work and economic growth, aligned with UN SDG Goal 8.

## Project Structure

- `backend/` - Spring Boot backend with MySQL
- `frontend/` - React.js frontend

## Prerequisites

- Java 17 (download from https://adoptium.net/)
- Maven (download from https://maven.apache.org/download.cgi and add to PATH)
- Node.js and npm (download from https://nodejs.org/)
- MySQL Server (download from https://dev.mysql.com/downloads/mysql/)

## Setup

### Database

Run the following SQL command in MySQL:

```sql
CREATE DATABASE IF NOT EXISTS sdg8db;
```

Update `backend/src/main/resources/application.properties` with your MySQL credentials if different.

### Backend

1. Navigate to `backend/` directory.
2. Run `mvn spring-boot:run`

The backend will start on http://localhost:8080

### Frontend

1. Navigate to `frontend/` directory.
2. Run `npm install`
3. Run `npm start`

The frontend will start on http://localhost:3000

## Features

- Add new jobs via form
- View list of jobs
- Visualize salary distribution with bar chart

## API Endpoints

- GET /api/jobs - Fetch all jobs
- POST /api/jobs - Add a new job
