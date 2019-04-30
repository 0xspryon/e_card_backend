const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'e_card',
    'user',
    'password',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 4000
    },
    {
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// //properly hydrate models and export them.
// var models = [
//     'user',
// ];

module.exports = {
    Sequelize,
    sequelize,
}

// models.forEach(function (model) {
//     module.exports[model] = sequelize.import(`${__dirname}/${model}`);
// });
