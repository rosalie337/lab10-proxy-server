require('dotenv').config();
//require('./lib/client').connect();

const cors = require('cors');
const app = require('./lib/app');
const PORT = process.env.PORT || 7890;

app.use(cors());

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on ${PORT}`);
});
