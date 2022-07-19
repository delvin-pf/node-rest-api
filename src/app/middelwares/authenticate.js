import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret = JSON.parse(process.env.SECRET);

function auth(req, res, next) {
  console.log('auth')
  const [_, token] = req.headers.authorization.split(' ')

  if (!token) {
    return res.status(404).json({ 
      error: 'UnauthorizedError',
      message: 'to access login is required'
    })
  }

  jwt.verify(token, secret.key, ['HS256'], (error) => {
    if (error) {
      console.log(error)
      return res.status(404).json({ 
        error: error.name,
        message: error.message
      })
    }
    next();
});

}

export default auth;