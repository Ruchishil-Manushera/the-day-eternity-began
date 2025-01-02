const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const auth = { login: process.env.AUTH_USERNAME || 'ruchi_madam-04', password: process.env.AUTH_PASSWORD || '04Nv2@@6ankita' };

// Middleware: Disable caching
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// Middleware: Basic Authentication with session token in query params
app.use((req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const [type, credentials] = authHeader.split(' ');

  if (type === 'Basic' && credentials) {
    const [login, password] = Buffer.from(credentials, 'base64').toString().split(':');

    // Check if login and password match
    if (login === auth.login && password === auth.password) {
      // Check for session token in query params
      if (!req.query.sessionToken) {
        // Generate a unique session token and append it to the URL
        const sessionToken = Date.now().toString();
        return res.redirect(`/?sessionToken=${sessionToken}`); // Redirect to set the session token in the query parameter
      }
      return next(); // Proceed to the requested route if authenticated
    }
  }

  // If authentication fails, ask for credentials
  res.setHeader('WWW-Authenticate', 'Basic realm="Protected Area", charset="UTF-8"');
  res.status(401).send('Authentication required.');
});

// Serve static files
app.use(express.static('public'));

// Default route
app.get('/', (req, res) => {
  const sessionToken = req.query.sessionToken;
  res.sendFile(__dirname + '/public/index.html');
});

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
