
const express = require('express');
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

// Middleware: Basic Authentication with session token
app.use((req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const [type, credentials] = authHeader.split(' ');

  if (type === 'Basic' && credentials) {
    const [login, password] = Buffer.from(credentials, 'base64').toString().split(':');

    if (login === auth.login && password === auth.password) {
      // Check for a session token (query param or cookie)
      if (!req.query.sessionToken) {
        // Generate a unique session token and redirect
        const sessionToken = Date.now().toString();
        return res.redirect(`/?sessionToken=${sessionToken}`);
      }
      return next();
    }
  }

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
