import jwt from 'jsonwebtoken';
import user from '../models/user.js';

export const Auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(' ')[0]; //when using browser this line
    // let token = req.headers.authorization.split(' ')[1]; //when using postman this line
      const verifiedUser = jwt.verify(token, process.env.SECRET||'nevergonnagiveyouupnevergonnaletyoudown');
      const rootUser = await user
        .findOne({ _id: verifiedUser.id })
        .select('-password');
      req.token = token;
      req.rootUser = rootUser;
      req.rootUserId = rootUser._id;

    next();
  } catch (error) {
    // console.log(error);
    res.json({ error: 'Invalid Token' });
  }
};
