const {userService} = require('../services');
const register = async(req,res) => {
     try {
            const newUser = await userService.register({...req.body});
            res.status(201).json({
                data: newUser
            })
     }
     catch(error) {
          res.status(500).json({
            message: error.message
          })
     }
}
const login = async(req,res)=>{
    try{
        const loginUser = await userService.login({...req.body});
            res.status(201).json({
                data: loginUser
            })
    }
    catch(error) {
          res.status(404).json({
            message: error.message

     })
}}
const logoutUser = async(req,res)=>{
    try{
         const token =  req.headers.authorization.split(' ')[1];
        const logout = await userService.logoutUser(token);
        res.status(201).json({
            result:"user logged out successfully"
        })
    }
    catch(error){
        res.status(401).json({
            message: error.message
        })
    }
} 

const validateUser = async(req,res) => {
  try {
    
    const token = req.headers.authorization.split(' ')[1];
    const userData = await userService.validateUser(token);
    res.status(200).json({
      data: userData
    });
  }
  catch(error){
    res.status(500).json({
      error: error.message
    });
  }
};
module.exports = {register,login, logoutUser,validateUser};