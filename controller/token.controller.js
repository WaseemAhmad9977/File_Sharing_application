import jwt from 'jsonwebtoken'
export const verifyToken = async (req, res) => {
    try {
       const token = req.body.token

      
       const user =  jwt.verify(token, process.env.JWT_SECRET);
       
       res.status(200).json({
        user
       });
    } catch (err) {
       res.status(401).json({ message: 'Invalid token' });
    }
 };