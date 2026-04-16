# Country Explorer App

A simple Express.js application that fetches random country information from the REST Countries API using Axios and displays it in a beautiful web interface.

## Features

- Displays random country data including name, flag, capital, region, population, and currencies
- Built with Express.js and EJS templating
- Makes API requests using Axios to fetch real-time country data
- Error handling for API failures

## Prerequisites

- Node.js and npm installed on your system

## Installation

1. Navigate to the project directory:
   ```bash
   cd "Country Explorer App"
   ```

2. Install all dependencies:
   ```bash
   npm i
   ```

   This installs the following packages:
   - **express** - Web framework
   - **axios** - HTTP client for API requests
   - **ejs** - Templating engine
   - **body-parser** - Middleware for parsing request bodies
   - **morgan** - HTTP request logger

## Running the Server

### Using npm start
```bash
npm start
```
This will start the server on `http://localhost:3000`

### Using node directly
```bash
node index.js
```

### Using nodemon (for development)
If you prefer automatic restart on file changes, you can use nodemon:

1. Install nodemon globally or as a dev dependency:
   ```bash
   npm install -D nodemon
   ```

2. Run the server with nodemon:
   ```bash
   npx nodemon index.js
   ```
   Or add a script to `package.json`:
   ```json
   "dev": "nodemon index.js"
   ```
   Then run:
   ```bash
   npm run dev
   ```

## Accessing the Application

Once the server is running, open your web browser and navigate to:
```
http://localhost:3000
```

The app will display information about a random country each time you refresh the page.

## API Used

This application uses the [REST Countries API](https://restcountries.com/) to fetch country data.

## Project Structure

```
Country Explorer App/
├── index.js          # Main server file
├── package.json      # Project dependencies and scripts
├── public/           # Static files
│   ├── images/       # Image assets
│   └── styles/
│       └── main.css  # Styling
└── views/
    └── index.ejs     # Main template
```

## Troubleshooting

- **Port already in use**: If port 3000 is already in use, you can specify a different port:
  ```bash
  PORT=3001 npm start
  ```

- **API errors**: Ensure you have a working internet connection, as the app fetches data from an external API.
