project-root/
├── client/                  # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   ├── Dashboard.js
│   │   ├── styles/
│   │   │   ├── home.css
│   │   │   ├── form.css
│   │   │   ├── dashboard.css
│   │   ├── App.js
│   │   ├── index.js
│   └── package.json         # React dependencies and scripts
│
├── server/                  # Node.js backend
│   │─── db.js               # PostgreSQL database connection
│   ├── routes/
│   │   └── auth.js          # Signup & login API routes
│   ├── server.js            # Main Express server
│   └── .env                 # Environment variables (DB connection, JWT secret)
│
├── .gitignore
├── README.md
└── package.json             # Node.js backend dependencies and scripts


Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process


May 23


Checking if the user already exists during signup.

Hashing the password with a salt using bcrypt.genSalt(10).

Storing the hashed password in your PostgreSQL DB.

Comparing the password on login using bcrypt.compare.

Generating a JWT token upon successful login.