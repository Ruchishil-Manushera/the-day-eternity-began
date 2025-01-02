const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3000;

const auth = { login: process.env.AUTH_USERNAME || 'admin', password: process.env.AUTH_PASSWORD || 'password' };

// Middleware: Disable caching
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// Middleware: Parse cookies
app.use(cookieParser());

// Middleware: Basic Authentication with session token
app.use((req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const [type, credentials] = authHeader.split(' ');

  if (type === 'Basic' && credentials) {
    const [login, password] = Buffer.from(credentials, 'base64').toString().split(':');

    // Check if login and password match
    if (login === auth.login && password === auth.password) {
      // Generate a unique session token and set it as a cookie
      const sessionToken = Date.now().toString();
      res.cookie('sessionToken', sessionToken, { httpOnly: true });
      return next(); // Proceed to the requested route if authenticated
    }
  }

  // If authentication fails, ask for credentials
  res.setHeader('WWW-Authenticate', 'Basic realm="Protected Area", charset="UTF-8"');
  res.status(401).send('Authentication required.');
});

// Middleware: Check session token
app.use((req, res, next) => {
  const sessionToken = req.cookies.sessionToken;
  if (sessionToken) {
    return next(); // Proceed if session token is present
  }

  // If no session token, ask for authentication
  res.setHeader('WWW-Authenticate', 'Basic realm="Protected Area", charset="UTF-8"');
  res.status(401).send('Authentication required.');
});

// Serve static files
app.use(express.static('public'));

// Default route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));