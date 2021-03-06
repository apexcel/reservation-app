const mongoConn = require('../database/mongoConn');
const Lesson = require('../database/schema/lesson');

const now = new Date();

const lessonsList = [
    { name: 'Month_One', counter: 4, start: now, end: (now + 86400000 * 31), price: 210_000 },
    { name: 'Month_Two', counter: 9, start: now, end: (now + + 86400000 * 61), price: 1 },
    { name: 'Month_TwoSub', counter: 5, start: now, end: (now + 86400000 * 61), price: 1 },
    { name: 'Month_Three', counter: 13, start: now, end: (now + 86400000 * 91), price: 1 },
    { name: 'Month_Six', counter: 26, start: now, end: (now + 86400000 * 181), price: 1 },
]

async function createDafaultLessons() {
    await mongoConn.conn();

    const queries = lessonsList.map(el => el.name);
    const options = {
        upsert: true,
        new: true,
        setDefaultOnInsert: true,
        useFindAndModify: false
    };

    for (let i = 0; i < lessonsList.length; i += 1) {
        const lessonInfo = {
            name: lessonsList[i].name,
            counter: lessonsList[i]
        }
        await Lesson.findOneAndUpdate(queries[i], lessonInfo, options, (err, res) => {
            if (err) throw err;
        })
    }
    mongoConn.disconn();
}

createDefaultAdmin();