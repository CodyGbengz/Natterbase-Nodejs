import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token =
  req.headers['x-access-token'] || req.body.token || req.query.token;
  if (!token) {
    return res.status(401).json({
      status: 'Fail',
      message: 'No token provided.'
    });
  }
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(500).json({
        status: 'Fail',
        message: err.message
      });
    }
    req.decoded = decoded;
    next();
  });
};

export default auth;