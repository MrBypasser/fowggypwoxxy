const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve a simple HTML UI for the proxy
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Froggy Proxy</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f0f4f8;
          padding: 20px;
          text-align: center;
        }
        h1 {
          color: #4CAF50;
        }
        .btn {
          margin: 10px;
          padding: 15px 25px;
          font-size: 16px;
          background-color: #4CAF50;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 5px;
        }
        .btn:hover {
          background-color: #45a049;
        }
      </style>
    </head>
    <body>
      <h1>Welcome to Froggy Proxy</h1>
      <p>Select a website to visit:</p>
      <button class="btn" onclick="location.href='/proxy?url=https://www.google.com'">Google</button>
      <button class="btn" onclick="location.href='/proxy?url=https://www.wikipedia.org'">Wikipedia</button>
      <button class="btn" onclick="location.href='/proxy?url=https://www.github.com'">GitHub</button>
    </body>
    </html>
  `);
});

// Proxy endpoint to handle the URL requests
app.use('/proxy', (req, res, next) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send('No URL provided');
  }

  // Create a proxy middleware for the requested URL
  createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    selfHandleResponse: false,
  })(req, res, next);
});

// Start the server
app.listen(port, () => {
  console.log(`Froggy Proxy listening at http://localhost:${port}`);
});
