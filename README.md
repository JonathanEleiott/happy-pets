# Happy Pets

# Recommended Order of Project

- Database
  - Create client.cjs (don't forget to use process.env.DATABASE_URL for when you deploy and localhost:5432 for dev)
  - Create seed.cjs
  - Create necessary db table files
- Server
  - Create server.cjs (don't forget to use process.env.PORT for deployment and 3000 for dev)
  - Create basic server with a GET / route
  - Create any other routes you plan on needing for your Front End
- Front End
  - Create React App with Vite
  - Clean up files
  - Delete all node_modules and package-lock.json files
  - Compare duplicate files and move all information into one of them
  - Move all Front End and Back End folders/files into one project folder
  - Write the rest of the Front End code for your project
- Deployment
  - Push up your project to GitHub
  - Go to Render and create a deployed PostgreSQL Database
  - Create a deployed web service in Render
    - Set an environment variable for the DATABASE_URL to point to the deployed Database
