<div class="hero-icon" align="center">
    <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>

<h1 align="center">
    Fitness Tracker App
</h1>
<h4 align="center">Track your fitness goals with ease, set, achieve and share with friends.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
    <img src="https://img.shields.io/badge/Framework-React-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React">
    <img src="https://img.shields.io/badge/Frontend-JavaScript,_HTML,_CSS-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="Frontend">
    <img src="https://img.shields.io/badge/Backend-Node.js-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js">
    <img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB">
</div>
<div class="badges" align="center">
    <img src="https://img.shields.io/github/last-commit/coslynx/fitness-tracker-app?style=flat-square&color=5D6D7E" alt="git-last-commit" />
    <img src="https://img.shields.io/github/commit-activity/m/coslynx/fitness-tracker-app?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
    <img src="https://img.shields.io/github/languages/top/coslynx/fitness-tracker-app?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
The **Fitness Tracker App** is a web application designed to help fitness enthusiasts easily track their goals. This MVP is built using React for the frontend and Node.js for the backend, utilizing MongoDB for data storage, it enables users to set fitness goals, monitor their progress, and share achievements with their friends.

## 📦 Features
|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| 🔒 | **User Authentication** | Secure user authentication using JWT (JSON Web Tokens) for protected routes and user data management.             |
| 🎯 | **Goal Setting**    | Users can create and manage their fitness goals, including setting titles, descriptions, and target dates.          |
| 📈 | **Progress Tracking**| Users can log and track their progress towards their fitness goals, with features to view progress over time.       |
| 📱 | **Social Sharing**  | Users can share their achievements and progress with friends via social media.                                    |
| ⚙️ | **Architecture**   | The app is built with a modular architecture, separating frontend and backend functionalities for easier maintenance and scalability. |
| 🔗 | **Dependencies**   | Utilizes libraries like `axios` for API requests, `react-router-dom` for routing, `mongoose` for MongoDB interactions, and `bcrypt` for password hashing. |
| 🛡️ | **Security** | Implements robust security practices, including password hashing and JWT-based authentication. |
| 🗄️ | **Database** | Leverages MongoDB Atlas for cloud-based database management, ensuring scalable and reliable data storage. |
| ⚡️  | **Performance**    | Optimizes data fetching and API calls using caching and efficient database queries.           |
| 🧩 | **Modularity**     | The codebase is structured in a modular way to maintain clean and reusable code and enhance maintainability.         |
 
## 📂 Structure
```text
    ├── README.md
    ├── .gitignore
    ├── package.json
    ├── public
    │   ├── index.html
    │   └── favicon.ico
    ├── src
    │   ├── components
    │   │   ├── Button.jsx
    │   │   ├── Input.jsx
    │   │   ├── Modal.jsx
    │   │   ├── AuthForm.jsx
    │   │   ├── GoalCard.jsx
    │   │   ├── Header.jsx
    │   │   └── Footer.jsx
    │   ├── pages
    │   │   ├── Home.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── Goals.jsx
    │   ├── hooks
    │   │   ├── useAuth.js
    │   │   └── useFetch.js
    │   ├── context
    │   │   └── AuthContext.js
    │   ├── services
    │   │   ├── api.js
    │   │   └── auth.js
    │   ├── utils
    │   │   └── helpers.js
    │   └── styles
    │       └── global.css
    └── api
        ├── controllers
        │   ├── authController.js
        │   └── goalController.js
        ├── models
        │   ├── User.js
        │   └── Goal.js
        ├── services
        │   ├── authService.js
        │   └── goalService.js
        ├── middlewares
        │   └── authMiddleware.js
        ├── config
        │   └── db.js
        └── routes
            ├── authRoutes.js
            └── goalRoutes.js
    ├── .env
    └── startup.sh
```

## 💻 Installation
> [!WARNING]
> ### 🔧 Prerequisites
> - Node.js v18.16.0 or higher
> - npm v9.5.1 or higher
> - MongoDB Atlas account
 
### 🚀 Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/coslynx/fitness-tracker-app.git
   cd fitness-tracker-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
    - Fill in the `.env` file with your MongoDB connection URI, JWT secret, and other necessary configurations.
      ```bash
        # Port for the server to listen on
        PORT=3001

        # MongoDB connection URI
        MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority

        # Secret key for JWT token generation
        JWT_SECRET=thisisasecretkeyforjwt

        # JWT token expiration time
        JWT_EXPIRES_IN=1d
     ```
## 🏗️ Usage
### 🏃‍♂️ Running the MVP
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Access the application:
    - Web interface: [http://localhost:3000](http://localhost:3000)
    - API endpoint: [http://localhost:3001/api](http://localhost:3001/api)

> [!TIP]
> ### ⚙️ Configuration
> - The app uses environment variables for configuration, mainly set in `.env` file.
> - API base URL is configured in `/src/services/api.js` file.
> - Default port is set to 3001 and UI is served from port 3000, make sure that ports are not conflicting with other services.

### 📚 Examples
Provide specific examples relevant to the MVP's core features. For instance:

- 📝 **User Registration**: 
    ```bash
    curl -X POST http://localhost:3001/api/auth/register  -H "Content-Type: application/json"  -d '{"username": "newuser", "email": "user@example.com", "password": "securepass123"}'
    ```

- 📝 **User Login**: 
    ```bash
    curl -X POST http://localhost:3001/api/auth/login -H "Content-Type: application/json" -d '{"email": "user@example.com", "password": "securepass123"}'
    ```

- 📝 **Create a Goal**: 
    ```bash
    curl -X POST http://localhost:3001/api/goals -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_JWT_TOKEN" -d '{"title": "Run a Marathon", "description": "Complete a full marathon in under 4 hours.", "targetDate": "2024-12-31", "progress": 0}'
    ```

## 🌐 Hosting
### 🚀 Deployment Instructions
Provide detailed, step-by-step instructions for deploying to the most suitable platform for this MVP. For example:

#### Deploying to Render
1. Create a new Web Service on Render.
2. Connect your GitHub repository.
3. Configure the build command: `npm install && npm run build --prefix src`
4. Set the start command: `node server.js`
5. Configure environment variables:
    - Add all variables defined in `.env` file.
6. Deploy the app.

### 🔑 Environment Variables
Provide a comprehensive list of all required environment variables, their purposes, and example values:

- `PORT`: Port for the server to listen on. Example: `3001`
- `MONGODB_URI`: Connection string for the MongoDB database. Example: `mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority`
- `JWT_SECRET`: Secret key for JWT token generation. Example: `thisisasecretkeyforjwt`
- `JWT_EXPIRES_IN`: JWT token expiration time. Example: `1d`

## 📜 API Documentation
### 🔍 Endpoints
Provide a comprehensive list of all API endpoints, their methods, required parameters, and expected responses. For example:

- **POST /api/auth/register**
  - Description: Register a new user.
  - Body: `{ "username": string, "email": string, "password": string }`
  - Response: `{ "username": string, "email": string, "id": string, "createdAt": string, "updatedAt": string }`
- **POST /api/auth/login**
   - Description: Logs in a user and returns a JWT token
   - Body: `{"email": string, "password": string}`
   - Response: `{ "message": string, "token": string, "user": { "username": string, "email": string, "id": string, "createdAt": string, "updatedAt": string }} `
- **POST /api/goals**
    - Description: Create a new fitness goal
    - Headers: `Authorization: Bearer TOKEN`
    - Body: `{ "title": string, "description": string, "targetDate": date, "progress": number }`
    - Response: `{ "_id": string, "userId": string, "title": string, "description": string, "targetDate": date, "progress": number, "createdAt": string, "updatedAt": string }`
- **GET /api/goals/:goalId**
    - Description: Get a goal by its ID
    - Headers: `Authorization: Bearer TOKEN`
    - Response: `{ "_id": string, "userId": string, "title": string, "description": string, "targetDate": date, "progress": number, "createdAt": string, "updatedAt": string }`
- **PUT /api/goals/:goalId**
    - Description: Updates a goal by its ID
    - Headers: `Authorization: Bearer TOKEN`
    - Body: `{ "title": string, "description": string, "targetDate": date, "progress": number }`
    - Response: `{ "_id": string, "userId": string, "title": string, "description": string, "targetDate": date, "progress": number, "createdAt": string, "updatedAt": string }`
- **DELETE /api/goals/:goalId**
    - Description: Deletes a goal by its ID
    - Headers: `Authorization: Bearer TOKEN`
    - Response: `{ "message": string }`

### 🔒 Authentication
Explain the authentication process in detail:
1. Register a new user or login to receive a JWT token.
2. Include the token in the `Authorization` header for all protected routes:
   ```
   Authorization: Bearer YOUR_JWT_TOKEN
   ```
3. The token expires based on the `JWT_EXPIRES_IN` setting, which is 1 day by default.

### 📝 Examples
Provide comprehensive examples of API usage, including request and response bodies:

```bash
# Register a new user
curl -X POST http://localhost:3001/api/auth/register  -H "Content-Type: application/json"  -d '{"username": "fitnessuser", "email": "user@example.com", "password": "securepass123"}'
# Response
{
  "username": "fitnessuser",
  "email": "user@example.com",
  "id": "666e4a5989977f4298765d3c",
  "createdAt": "2024-06-17T14:07:05.127Z",
  "updatedAt": "2024-06-17T14:07:05.127Z"
}

# Login a user
curl -X POST http://localhost:3001/api/auth/login  -H "Content-Type: application/json"  -d '{"email": "user@example.com", "password": "securepass123"}'
# Response
{
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjZlND...",
    "user": {
        "username": "fitnessuser",
        "email": "user@example.com",
        "id": "666e4a5989977f4298765d3c",
        "createdAt": "2024-06-17T14:07:05.127Z",
        "updatedAt": "2024-06-17T14:07:05.127Z"
    }
}

# Create a new goal
curl -X POST http://localhost:3001/api/goals -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_JWT_TOKEN" -d '{"title": "Run a Marathon", "description": "Complete a full marathon in under 4 hours.", "targetDate": "2024-12-31", "progress": 0}'
# Response
{
  "_id": "666e4a7889977f4298765d3d",
  "userId": "666e4a5989977f4298765d3c",
  "title": "Run a Marathon",
  "description": "Complete a full marathon in under 4 hours.",
  "targetDate": "2024-12-31T00:00:00.000Z",
  "progress": 0,
  "createdAt": "2024-06-17T14:07:36.231Z",
  "updatedAt": "2024-06-17T14:07:36.231Z"
}
```

> [!NOTE]
> ## 📜 License & Attribution
> 
> ### 📄 License
> This Minimum Viable Product (MVP) is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) license.
> 
> ### 🤖 AI-Generated MVP
> This MVP was entirely generated using artificial intelligence through [CosLynx.com](https://coslynx.com).
> 
> No human was directly involved in the coding process of the repository: `fitness-tracker-app`
> 
> ### 📞 Contact
> For any questions or concerns regarding this AI-generated MVP, please contact CosLynx at:
> - Website: [CosLynx.com](https://coslynx.com)
> - Twitter: [@CosLynxAI](https://x.com/CosLynxAI)

<p align="center">
  <h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
  <em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Developers-Drix10,_Kais_Radwan-red" alt="">
  <img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="">
  <img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
    <img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4,_v6-black" alt="">
</div>