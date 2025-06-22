import http from 'http';
import axios from 'axios';

const server = http.createServer(async (req, res) => {
  if (req.url === '/price') {
    try {
      const { data } = await axios.get('https://price.jup.ag/v4/price');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data.data));
    } catch (err) {
      console.error('[Jupiter Proxy Error]', err.message);
      res.writeHead(502);
      res.end(JSON.stringify({ error: err.message }));
    }
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

app.listen(3000, () => {
  console.log('🔁 Jupiter proxy running on http://localhost:3000/price');
});


