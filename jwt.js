import jwt from "jsonwebtoken"

const jwtAuthMiddleware = (req,res,next) => {

    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({error: "Token not found"})
    //Extract the token from the request header
    const token = req.headers.authorization.splite(' ')[1];

    if(!token) return res.status(401).json({error: "Unauthorized"});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user information to the request object
        req.user = decoded
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({error: "Invalid Token"})
    }

}

// Function to Generate JWT token
const generateToke = (userData) => {
    // Generate a JWT token using userData
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: 30000})
}

export {jwtAuthMiddleware,generateToke}