const {User} = require('../../database/models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { get, set, remove,redisClient} = require('../redsConnection');

const register = async({email,password}) => {
   const hashPassowrd =  await bcrypt.hash(password, 10);;
   const newUser = await User.create({
    email: email,
    password:hashPassowrd
   })
   return newUser;
}

const login = async({email,password}) => {

   const user=await User.findOne({where :{email:email}});
   if(!user) {
    throw new Error('User Not Found');
  }
  else{
   const matchPassword = await bcrypt.compare(password, user.password);
   if(!matchPassword)
     throw new Error('Wrong Paasword');
  
  else
  {
   const token = await jwt.sign({id: user.id, email: user.email},'SYIJ123ADIYES');
   await set(token);
   return {token: `Bearer ${token}`};
  }
}
}

const logoutUser = async(token) => {
  await remove(token);
  return { message: 'Logged out successfully'};
};

const validateUser = async(token) =>{
  const userData = await jwt.verify(token, 'SYIJ123ADIYES');
  if(!userData) {
    throw new CustomError(400, 'Unauthorized User(token error)');
  }   const redisToken = await get(token);
  if(!redisToken) {
    throw new CustomError(400, 'Unauthorized User(token invalid)');
  }
  return userData;
};

module.exports = {register,login,logoutUser,validateUser}