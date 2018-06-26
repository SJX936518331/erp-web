// let debug = process.env.NODE_ENV !== 'production'

let domain
if (process.env.NODE_ENV === 'production') {
    domain = {
        api: 'http://192.168.3.60:9998/index.php/home'
    }
} else {
    domain = {
        // api: 'http://192.168.3.60:9998/index.php/home'
        api: 'http://localhost.com:9998/index.php/home'
    }
}
module.exports = {
    // host: '0.0.0.0', // can be overwritten by process.env.HOST
    // port:8080,
    domain
}
