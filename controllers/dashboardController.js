const prisma = require('../prsima')
exports.getDashboard = async(req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        console.log("Token is missing");
    }

    if (!token){
        return res.status(401).json({ error: "No token provided" });
    }

    res.json({
        user: req.user
    }) 

    // console.log('Cookies received:', req.cookies);
    // res.json({ cookiesReceived: req.cookies.token, cookieValue: req.cookies.token ? 'exists' : 'none' });
}



