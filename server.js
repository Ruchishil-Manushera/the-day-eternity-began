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

// Middleware for Basic Authentication (force login every time)
app.use((req, res, next) => {
  const auth = { login: process.env.AUTH_USERNAME || 'admin', password: process.env.AUTH_PASSWORD || 'password' };

  // Parse the Authorization header
  const authHeader = req.headers.authorization || '';
  const [type, credentials] = authHeader.split(' ');

  if (type === 'Basic' && credentials) {
    const [login, password] = Buffer.from(credentials, 'base64').toString().split(':');

    // Validate credentials
    if (login === auth.login && password === auth.password) {
      return next();
    }
  }

  // Prompt login if authentication fails
  res.setHeader('WWW-Authenticate', 'Basic realm="Protected Area", charset="UTF-8"');
  res.status(401).send('Authentication required.');
});

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, etc.)
app.use(express.static('public'));

// Default route for index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
