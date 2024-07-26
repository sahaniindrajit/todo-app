import jwt from 'jsonwebtoken'

export default function auth(req, res, next) {
    const token = req.cookies.access_token
    if (!token) {
        return res.json({
            msg: "No token available"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_PASSWORD);
        if (decoded) {
            req.user = decoded
            next()
        }
        else {
            res.status(403).json({
                msg: "You are not authenticated"
            })
        }
    }
    catch (e) {
        console.log(e)
        res.json({
            msg: "Incorrect inputs"
        })
    }

}