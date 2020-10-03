function errorRoute(err, req, resp, next) {
    return resp.status(500).send('Internal Sever Error!')
}

module.exports = errorRoute;