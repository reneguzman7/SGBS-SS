# SGBS-SS

SGBS-SS (Sistema de Gestión de Seguros y Siniestros) is a web application designed to manage insurance policies, clients, payments, and incidents. It provides a user interface for administrators and potentially clients to interact with the system.

The backend is built with Node.js and Express.js, with PostgreSQL as the database. The frontend components are structured within the `public` directory.

## Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd sgbs-ss
    ```

2.  **Install dependencies:**
    Make sure you have Node.js and npm installed.

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project. Use `.env.example` as a reference:

    ```bash
    cp .env.example .env
    ```

    Configure your database variables:

    ```env
    # Database configuration (use either format)
    USER=your_db_user
    HOST=your_db_host
    DATABASE=your_db_name
    PASSWORD=your_db_password

    # Or alternative format
    DB_USER=your_db_user
    DB_HOST=your_db_host
    DB_NAME=your_db_name
    DB_PASSWORD=your_db_password
    DB_PORT=5432

    # Server configuration
    PORT=3000
    NODE_ENV=development
    ```

4.  **Build CSS:**

    ```bash
    npm run build
    ```

5.  **Run the application:**

    **Development:**

    ```bash
    npm run dev
    ```

    **Production:**

    ```bash
    npm start
    ```

## Deployment

### Vercel (Recommended)

1. **Install Vercel CLI:**

   ```bash
   npm i -g vercel
   ```

2. **Deploy:**

   ```bash
   vercel --prod
   ```

3. **Configure environment variables in Vercel dashboard:**
   - Go to your project settings
   - Add the same environment variables from your `.env` file

### Other Platforms

The application is compatible with:

- **Railway**: Connect your GitHub repository
- **Render**: Configure with build and start commands
- **Netlify**: For full-stack applications
- **Heroku**: Using the Node.js buildpack

### Environment Variables for Production

Required environment variables:

- `DB_USER` or `USER` - Database username
- `DB_HOST` or `HOST` - Database host
- `DB_NAME` or `DATABASE` - Database name
- `DB_PASSWORD` or `PASSWORD` - Database password
- `DB_PORT` - Database port (default: 5432)
- `NODE_ENV` - Set to "production"

## Usage

Once the application is installed and running, you can access it by navigating to `http://localhost:3000` in your web browser.

### Features:

- How to navigate different sections (e.g., client management, policy administration, incident reporting).
- Examples of common workflows.

## Configuration

The application is configured using environment variables. These variables should be defined in a `.env` file located in the root of the project. Create this file if it doesn't exist.

**Key environment variables:**

- `DATABASE_URL`: (Required) The connection string for your PostgreSQL database.

  - Format: `postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public`
  - Example: `DATABASE_URL="postgresql://admin:secret@localhost:5432/sgbs_db?schema=public"`

- `PORT`: (Optional) The port on which the application server will listen. If not specified, a default port (e.g., 3000) might be used by Express.

  - Example: `PORT=8080`

- `SECRET_KEY`: (Recommended if using sessions or JWTs) A secret key for signing sessions or tokens.
  - Example: `SECRET_KEY="your-very-secure-and-random-secret-key"`

**Example `.env` file:**

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
PORT=3000
# SECRET_KEY="your_secret_key" # Uncomment and set if session management or JWT is implemented
```

**Important:**

- Remember to add the `.env` file to your `.gitignore` to prevent committing sensitive credentials to your repository.
- The application uses the `dotenv` package to load these variables from the `.env` file into `process.env`.

## License

This project is licensed under the ISC License. See the `LICENSE` file for more details (if one is created, otherwise this statement suffices for now based on `package.json`).

## Credits

This project is maintained by:

- [Your Name/Organization Name Here]

Feel free to add contributors as the project evolves.

## Additional Documentation

For more detailed information on specific aspects of the project, such as API documentation, architectural diagrams, or advanced configuration, please refer to the following resources:

- [Link to Wiki, API Docs, etc. - To be added]

This section will be updated as more documentation becomes available.

## Project Structure

A brief overview of the main directories and their contents:

```
sgbs-ss/
├── .gitignore          # Specifies intentionally untracked files that Git should ignore
├── README.md           # This file: Project overview, setup, and usage instructions
├── assets/             # Source files for frontend assets (e.g., raw CSS, images before processing)
│   └── css/
│       └── main.css    # Main Tailwind CSS source file
├── db.js               # Likely database connection setup (might be legacy or utility)
├── dockerfile          # Instructions for building a Docker image for the application
├── package.json        # Project metadata, dependencies, and scripts
├── postcss.config.js   # Configuration for PostCSS (CSS processor)
├── public/             # Static files served to the client (frontend)
│   ├── css/            # Compiled CSS files
│   ├── html/           # HTML files for different pages/views
│   ├── images/         # Static image assets
│   └── js/             # Frontend JavaScript files
│       ├── routes/     # Frontend route definitions (if using a frontend router) or client-side API interaction modules
├── public/routes/      # Backend Express.js route definitions
├── server.js           # Main entry point for the Express.js application server
└── tailwind.config.js  # Configuration for Tailwind CSS
```

**Key Directories:**

- **`assets/`**: Contains raw, unprocessed frontend assets. For example, `assets/css/main.css` is likely the input for PostCSS and Tailwind processing.
- **`public/`**: This directory holds all the static assets and frontend files that are served directly to users.
  - **`public/css/`**: Compiled CSS files ready for use in the browser.
  - **`public/html/`**: HTML views for the application.
  - **`public/js/`**: Client-side JavaScript files. The `public/js/routes/` might be for client-side routing or API handlers.
- **`public/routes/`**: Contains the backend API route definitions managed by Express.js. (Note: The issue report suggested moving this to a top-level `/routes` or `/src/routes` for better separation, this documentation reflects the current state).
- **`server.js`**: The main file that starts and configures the Express.js server.
- **`prisma/`**: (Implicit, but common with Prisma) If Prisma is fully initialized with migrations, a `prisma` directory containing the schema (`schema.prisma`) and migration files would typically be present. If only `db push` is used, this might be less prominent.

This structure is typical for a Node.js application, with a clear separation of public-facing files and server-side logic.
