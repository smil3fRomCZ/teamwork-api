const app = require('./src/app');
const { SERVER_PORT } = require('./src/utilities/ServerConfig');

const PORT = SERVER_PORT;

app.listen(PORT, () => console.log(`Server listen on port: ${PORT}`));
