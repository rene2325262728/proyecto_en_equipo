const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
app.get('/map', async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat ||!lng) {
    return res.status(400).json({ error: 'Missing required parameters: lat, lng' });
  }

  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=600x600&maptype=roadmap&markers=color:red%7Clabel:C%7C${lat},${lng}`);
    const mapImageUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    const html = `
      <html>
        <body>
          <img src="${response.data}" alt="Google Map">
          <p><a href="${mapImageUrl}" target="_blank">Open in Google Maps</a></p>
        </body>
      </html>
    `;
    res.set('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the map image' });
  }
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});