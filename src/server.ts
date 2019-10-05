import { User } from './db/models/User';
import { Collab } from './db/models/Collab';

require('dotenv').config();
/* eslint-disable import/first */
import { sequelize } from './db/sequalize';
import { app } from './app';
/* eslint-enable import/first */

const PORT = 5003;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Connected to postgres');

    Collab.findAll({
      raw: true,
      where: {
        ownerId: '08f39050-6393-42b5-9f9b-eb4a0f46a095',
      },
    })
      .then(console.log)
      .catch(console.log);

    app.listen(PORT, () => console.info(`Server running on port ${PORT}`));
  })
  .catch(console.log);
