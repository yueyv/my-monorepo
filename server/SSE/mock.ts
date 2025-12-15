const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.get('/analysis/connect', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  res.flushHeaders();

  setInterval(() => {
    const data = {
      message: `Current time is ${new Date().toLocaleTimeString()}`,
    };

    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 10 * 1000);
  res.write('event: line_warning_update\n');
  res.write('data: {"message": "Line warning updated"}\n\n');
});
