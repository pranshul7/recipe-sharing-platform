# recipe-sharing-platform

This is a MERN stack project with following details: \
**Title:** Recipe Sharing Platform \
**Objective**: Develop a platform where users can share and browse recipes. \
**Details**: Use MongoDB to store recipes, Express.js for backend services, React.js for the user interface, and Node.js for server-side logic. Include features like recipe creation, editing, and browsing by category.

The source code implements the following features:
- CRUD operations for recipes
- Search/filter recipes based on title/description/ingredients
- User authentication

The source code is structured as:
- Backend: root directory (`/`)
- Frontend: client directory (`/client/`)

To setup the platform locally, follow below steps:
- Make sure you have latest versions (as of, 2024-08-31) of MongoDB, Express.js, React.js, and Node.js installed on your system gloabally.
- Launch a local instance of MongoDB, connect to a local database.
- Update the database connection string in `/server.js` file
- To launch the backend, execute the following in the root (`/`) directory:
    - `npm install`
    - `npm start`
- To launch the frontend, execute the following in the client directory (`/client/`):
    - `npm install`
    - `npm start`
- Navigate to the frontend URL (will be available in the terminal)
- The platform will be up-and-running, you can test it.

Cheers!