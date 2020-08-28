const CronJob = require('cron').CronJob;
const mongoConn = require('../database/mongo/mongoConn');
const KakaoMsg = require('../database/mongo/schema/kakaomsg');
const KakaoToken = require('../database/mongo/schema/kakaotoken');
const qs = require('qs')
const axios = require('axios')

function formattedDateString(date) {
    let yy = date.getFullYear();
    let mm = '' + (date.getMonth() + 1);
    let dd = '' + date.getDate();

    if (mm.length < 2) mm = '0' + mm;
    if (dd.length < 2) dd = '0' + dd;

    return [yy, mm, dd].join('-');
}

const cronJob = new CronJob('* * * * * *', () => {
    console.log('START CRON JOB')
    console.log('Now:', new Date())
    sendMessage()
    cronJob.stop();
});
cronJob.start()

async function sendMessage() {
    const now = formattedDateString(new Date())
    try {
        mongoConn.conn()
        let [list, token] = await Promise.all([KakaoMsg.find({ date: now }), KakaoToken.find({})])
        const url = 'https://kapi.kakao.com/v1/api/talk/friends/message/default/send'
        const headers = {
            'Authorization': `Bearer ${token[0].access_token}`,
        };
        sendMessageToKakaoFriends(url, headers, list)
        mongoConn.disconn()
    }
    catch (err) {
        console.error(err)
    }
}

async function sendMessageToKakaoFriends(url, headers, list) {
    try {
        for (let i = 0; i < list.length; i += 1) {
            const dataString = `receiver_uuids=["${list[i].app_uuid}"]&template_object={ "object_type": "text", "text": "${list[0].message}", "link": { "web_url": "https://developers.kakao.com", "mobile_web_url": "https://developers.kakao.com" }, "button_title": "바로 확인" }`
            await axios.post(url, dataString, { headers: headers }).then(res => console.log(res))
        }
    }
    catch (err) {
        console.error(err)
    }
}