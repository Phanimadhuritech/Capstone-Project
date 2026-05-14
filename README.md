# Capstone Project - MERN Blog Platform
A full-stack blogging app for reading, writing, editing, and commenting on articles.
The project has a React frontend and an Express/MongoDB backend.
It supports USER, AUTHOR, and ADMIN roles in the data model.
Users can read articles and add comments after login.
Authors can create, edit, view, soft-delete, and restore their own articles.
JWT authentication is stored in an HTTP-only browser cookie.
Profile images are uploaded with Multer and stored on Cloudinary.
AI assistance used: Codex generated this README from the project files.
## Technologies Used
Frontend: React 19, Vite, React Router, React Router DOM.
State and API: Zustand, Axios, React Hook Form, React Hot Toast.
Styling: Tailwind CSS with shared frontend style helpers.
Backend: Node.js, Express.js, MongoDB, and Mongoose.
Security: bcryptjs for password hashing and jsonwebtoken for JWT.
Cookies and CORS: cookie-parser and cors.
Uploads: multer memory storage and Cloudinary SDK.
Developer tools: npm, ESLint, Vite, and REST request files.
Main models: UserModel and ArticleModel.
## Folder Structure
`ProFrontend/` contains the Vite React client.
`ProBackend/` contains the Express API server.
`ProBackend/APIs/` contains auth, user, author, and admin routers.
`ProBackend/models/` contains Mongoose schemas.
`ProBackend/middlewares/VerifyToken.js` checks JWT and roles.
`ProBackend/config/` contains Multer and Cloudinary setup.
`ProFrontend/src/components/` contains pages and reusable UI.
`ProFrontend/src/store/authStore.js` manages auth with Zustand.
## Backend Run
Open a terminal in the project root.
Run `cd ProBackend`.
Install backend dependencies with `npm install`.
Create a `.env` file inside `ProBackend`.
Add `PORT=4000`.
Add `DB_URL=your_mongodb_connection_string`.
Add `SECRET_KEY=your_jwt_secret`.
Add `CLOUDINARY_CLOUD_NAME=your_cloud_name`.
Add `CLOUDINARY_API_KEY=your_api_key`.
Add `CLOUDINARY_API_SECRET=your_api_secret`.
Start the backend with `npm start`.
The backend runs at `http://localhost:4000`.
The server connects to MongoDB before listening for requests.
CORS allows requests from `http://localhost:5173`.
## Frontend Run
Open a second terminal in the project root.
Run `cd ProFrontend`.
Install frontend dependencies with `npm install`.
Start the React app with `npm run dev`.
The frontend runs at `http://localhost:5173`.
Keep the backend running for auth, articles, uploads, and comments.
Frontend API calls use `http://localhost:4000` so the login cookie is sent correctly.
Build production files with `npm run build`.
Preview the production build with `npm run preview`.
Run linting with `npm run lint`.
## How It Works
Registration sends user details and optional profile image as form data.
The backend accepts only USER and AUTHOR during registration.
Multer reads the uploaded image using memory storage.
Cloudinary stores the image and returns a secure profile URL.
bcryptjs hashes the password before MongoDB storage.
Mongoose saves users and articles using strict schemas.
Login sends email and password to `/auth/login`.
The backend validates credentials and creates a JWT.
The JWT contains user id, email, role, name, and profile image.
The JWT is returned as an HTTP-only cookie.
Zustand stores current user, loading, error, and auth status.
`/auth/check-auth` restores sessions after page refresh.
`/auth/logout` clears the cookie and resets frontend auth state.
The home page checks login status before sending users to read or write articles.
Toast messages guide users to login or register when needed.
## Home Page Actions
`Start Reading` opens an article only after the visitor is logged in.
If the visitor is not logged in, it shows a message asking them to register or login.
If no articles are available, it shows a no-articles message.
`Write Article` opens the author write page only for logged-in AUTHOR accounts.
If the visitor is not logged in, it asks them to login as an author.
If a logged-in USER presses `Write Article`, it shows that only authors can write articles.
## User Features
USER can view active articles from `/user-api/articles`.
USER can open one article from `/user-api/article/:id`.
USER can comment on articles through `PUT /user-api/articles`.
Comments are stored inside articles with a user reference.
Article details populate comment user information.
After a successful comment, the article updates immediately and the input clears.
## Author Features
AUTHOR can publish articles through `POST /author-api/article`.
AUTHOR can view own articles through `GET /author-api/articles`.
AUTHOR can edit title, category, and content with `PUT /author-api/articles`.
AUTHOR can soft-delete or restore articles with `PATCH /author-api/articles`.
The backend checks article ownership before author updates.
## Routes And Notes
Public frontend routes: home, register, login, article details, unauthorized.
Protected frontend routes: `/user-profile` and `/author-profile`.
Backend protection uses `verifyToken(...allowedRoles)`.