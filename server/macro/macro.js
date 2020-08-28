const CronJob = require('cron').CronJob;
const createSqlTable = require('./sql_create_tables')

// Create MYSQL table every day at 23:00
const genSqlTable = new CronJob('00 00 23 * * 0-6', async () => {
    await createSqlTable()
})
genSqlTable.start();

