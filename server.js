const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true })); // To parse form data
app.use(express.static('public')); // Serve static files (HTML, CSS, etc.)

// Password middleware
app.use((req, res, next) => {
  const auth = { 
  login: process.env.AUTH_USERNAME, 
  password: process.env.AUTH_PASSWORD 
};
 // Change these values
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

  if (login && password && login === auth.login && password === auth.password) {
    return next(); // Access granted
  }
  res.set('WWW-Authenticate', 'Basic realm="Protected Area"');
  res.status(401).send('Authentication required.');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); // Load your homepage
});

app.listen(port, () => console.log(`Server running on port ${port}`));
