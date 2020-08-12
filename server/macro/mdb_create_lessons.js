const mongoConn = require('../database/mongo/mongoConn');
const Lesson = require('../database/mongo/schema/lesson');

const now = new Date();

const lessonsList = [
    { name: 'Month_One', counter: 4, start: now, end: (now + 86400000 * 31), price: 210_000 },
    { name: 'Month_Two', counter: 9, start: now, end: (now +  + 86400000 * 61) , price: 1 },
    { name: 'Month_TwoSub', counter: 5, start: now, end: (now + 86400000 * 61) , price: 1 },
    { name: 'Month_Three', counter: 13, start: now, end: (now + 86400000 * 91) , price: 1 },
    { name: 'Month_Six', counter: 26, start: now, end: (now + 86400000 * 181) , price: 1 },
]

async function createDefaultAdmin() {
    await mongoConn.conn();
    const query = {
        name: 
    };
    const lessonInfo = {

    }
    const options = {
        upsert: true,
        new: true,
        setDefaultOnInsert: true,
        useFindAndModify: false
    };
    await User.findOneAndUpdate(query, lessonInfo, options, (err, res) => {
        if (err) throw err;
        mongoConn.disconn();
    })
}

createDefaultAdmin();