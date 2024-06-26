import jwt from 'jsonwebtoken'

export function authenticate(req, res, next) {
    try {
        const token = req.headers.cookie.split('=')[1]
        // const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, 'TOKEN')
        req.user = {
            _id: decodedToken._id,
            isAdmin: decodedToken.isAdmin
        }
        next()
    } catch (error) {
        res.status(401).json("Veuillez vous connecter pour faire cette action");
    }
}
export function authenticateAdmin(req, res, next) {
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401).json({message: "Vous n'avez pas le droit. Veuillez vous connecter en tant qu'Administrateur"});
    }
}
