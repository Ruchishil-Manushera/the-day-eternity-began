const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Password protection middleware
app.use((req, res, next) => {
  const auth = { login: process.env.AUTH_USERNAME, password: process.env.AUTH_PASSWORD };
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

  // Disable cache
  res.setHeader('Cache-Control', 'no-store');

  if (login && password && login === auth.login && password === auth.password) {
    return next();
  }
  res.set('WWW-Authenticate', 'Basic realm="Protected Area"');
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
