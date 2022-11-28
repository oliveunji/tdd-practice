const app = require('./src/app');
const sequelize = require('./src/config/database');
const User = require('./src/user/User');
const bcrypt = require('bcrypt');
const TokenService = require('./src/auth/TokenService');
const addUsers = async (activeUserCount, inactiveUserCount = 0) => {
  const hash = await bcrypt.hash('P4ssword', 10);
  for (let i = 0; i < activeUserCount + inactiveUserCount; i++) {
    await User.create({
      username: `user${i + 1}`,
      email: `user${i + 1}@mail.com`,
      inactive: i >= activeUserCount,
      password: hash,
    });
  }
};

sequelize.sync({ force: true }).then(async () => {
  await addUsers(25);
});
// console.log('env: ' + process.env.NODE_ENV);
TokenService.scheduledCleanup();
app.listen(3000, () => console.log('App is running'));
