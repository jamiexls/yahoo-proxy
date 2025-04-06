const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/yahoo', async (req, res) => {
  const symbol = req.query.symbol;

  if (!symbol) {
    return res.status(400).json({ error: 'Missing symbol parameter' });
  }

  try {
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      'Accept': 'application/json',
      'Referer': `https://finance.yahoo.com/quote/${symbol}`,
    };

    const url = `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${symbol}?modules=defaultKeyStatistics`;

    const response = await axios.get(url, { headers });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
