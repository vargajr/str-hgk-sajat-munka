const server = require('./server');

const port = 3000;

// eslint-disable-next-line no-console
server.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
