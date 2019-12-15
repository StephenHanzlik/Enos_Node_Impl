const config = require('./knexfile.js');  
const env = 'development';  
const knex = require('./Node_Impl/node_modules/knex')(config[env]);

module.exports = knex;

knex.migrate.latest([config]); 