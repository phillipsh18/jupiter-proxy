import http from 'http';
import axios from 'axios';

const server = http.createServer(async (req, res) => {
  if (req.url === '/price') {
    try {
      const { data } = await axios.get('https://price.jup.ag/v4/price');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    } catch (err) {
      res.writeHead(500);
      res.end('Failed to fetch price');
    }
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(3000, () => {
  console.log('🔁 Jupiter proxy running on http://localhost:3000/price');
});

