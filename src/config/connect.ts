
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'bp1w1maakq49iwrlbt0f-mysql.services.clever-cloud.com',
    port : 3306,
    user : 'u6iopny7inmwyeih',
    password : 'jeLMgycMa2vMTWj4OP0e',
    database : 'bp1w1maakq49iwrlbt0f'
  },
  pool: {
      min: 2,
      max: 10
    }
});



module.exports = knex
