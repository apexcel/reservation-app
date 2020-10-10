const now = new Date();
const yes = new Date(now);

yes.setDate(yes.getDate() - 1)
yes.toDateString()