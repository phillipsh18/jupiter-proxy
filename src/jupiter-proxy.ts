import http from 'http';
import axios from 'axios';
import https from 'https';

const server = http.createServer(async (req, res) => {
  if (req.url === '/price') {
    try {
      const response = await axios.get('https://quote-api.jup.ag/v6/quote', {
params: {
  inputMint: 'So11111111111111111111111111111111111111112', // SOL
  outputMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC
  amount: 100000000, // 0.1 SOL in lamports
  slippageBps: 50,
},
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0',
          'Accept': 'application/json, text/plain, */*',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9',
          'Referer': 'https://jup.ag/',
          'Origin': 'https://jup.ag',
          'Connection': 'keep-alive',
          'Host': 'quote-api.jup.ag',
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        timeout: 5000,
      });

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(response.data));
    } catch (err: any) {
      const errorMessage = err.response?.status
        ? `HTTP ${err.response.status} - ${err.response.statusText}`
        : err.message;

      console.error('[Jupiter Proxy Error]', errorMessage);
      res.writeHead(502);
      res.end(JSON.stringify({ error: errorMessage }));
    }
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(3000, () => {
  console.log('🔁 Jupiter proxy running on http://localhost:3000/price');
});

