const CronJob = require('cron').CronJob;
const mongoConn = require('../database/mongo/mongoConn');
const KakaoMsg = require('../database/mongo/schema/kakaomsg');
const axios = require('axios')

function formattedDateString(date) {
    let yy = date.getFullYear();
    let mm = '' + (date.getMonth() + 1);
    let dd = '' + date.getDate();

    if (mm.length < 2) mm = '0' + mm;
    if (dd.length < 2) dd = '0' + dd;

    return [yy, mm, dd].join('-');
}
const job = new CronJob('*/5 * * * * *', async () => {
    console.log('START CRON JOB')
    console.log('Now:', new Date())
    const now = formattedDateString(new Date())
    mongoConn.conn()

    const list = await KakaoMsg.find({date: now}, (err, res) => {
        if (err) throw err;
    })
    console.log(list)
    
    mongoConn.disconn()
    job.stop()
}, null)

job.start();