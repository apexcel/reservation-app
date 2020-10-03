module.exports = async (err, req, resp, next) => {
    // Access Token 있는 경우
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ');
        console.log('token:', token[1]);
        next();
    }
    // 없을 때 (로그인)
    else {
        next();
    }
    return;
}