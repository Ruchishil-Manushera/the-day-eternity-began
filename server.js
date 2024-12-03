const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to disable caching for all requests
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
});

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Middleware for Basic Authentication (prompt login every time)
app.use((req, res, next) => {
  const auth = { login: process.env.AUTH_USERNAME, password: process.env.AUTH_PASSWORD };

  // Parse credentials from Authorization header
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

  // Verify login and password
  if (login && password && login === auth.login && password === auth.password) {
    return next(); // User authenticated
  }

  // Prompt login if credentials are missing or incorrect
  res.setHeader('WWW-Authenticate', 'Basic realm="Protected Area"');
  res.status(401).send('Authentication required.');
});

// Serve static files (HTML, CSS, etc.)
app.use(express.static('public'));

// Default route for index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
