# Role-Based Access Control System (RBACS)

A secure backend API featuring authentication, role-based access control, and email verification.

## Prerequisites

Ensure you have the following installed on your local machine:
* **Node.js** (v18 or higher recommended)
* **npm** or **yarn**
* **MongoDB** (running locally or a cloud instance)

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd <project-directory-name>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory of the project. Copy and paste the following template, filling in your own private credentials:

```env
# Server Configuration
PORT=your_port_number
NODE_ENV="development"

# Database Configuration
MONGO_URI=your_mongodb_connection_string

# Security
JWT_SECRET=your_jwt_secret_key

# Email Configuration (SMTP)
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
SENDER_EMAIL=your_sender_email_address

# Brevo transactional API (welcome emails)
BREVO_API_KEY=your_brevo_api_key
```

> ⚠️ **Security Notice:** Never commit your actual `.env` file containing live credentials to version control repositories like GitHub.

### 4. Database Setup
Make sure your local MongoDB service is active. If you are using Docker, you can start MongoDB using:
```bash
docker run -d -p 27017:27017 --name rbac-mongo mongo
```

### 5. Running the Application

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm run start
```

The server will start running at the port specified in your configuration (e.g., `http://localhost:8000`).

## API Testing

You can use **Postman** or **cURL** to test the endpoints. Since this project handles Role-Based Access Control, make sure to pass the JWT token in the headers for protected routes:

```http
Authorization: Bearer <your_jwt_token>
```
