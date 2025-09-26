import jwt from 'jwt-simple';
import moment from 'moment';
const secret = 'help';

const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.decode(token, 'help');
    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json({ message: 'Token expired' });
    }
    req.employer = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export default authenticate;
