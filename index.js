import express from 'express';
import axios from 'axios';

const app = express();
const port = process.env.PORT || 3000;

app.get('/price', async (req, res) => {
  const ids = req.query.ids;
  const base = 'https://price.jup.ag/v4/price';
  const target = ids ? `${base}?ids=${ids}` : base;

  try {
    const response = await axios.get(target);
    res.json(response.data);
  } catch (err) {
    console.error('[Jupiter Proxy Error]', err.message);
    res.status(err.response?.status || 500).json({ error: err.message || 'Proxy error' });
  }
});

app.listen(port, () => {
  console.log(`✅ Jupiter proxy running on http://localhost:${port}/price`);
});

