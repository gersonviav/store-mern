const jwt = require('jsonwebtoken')
// ==============
// verificar token
// ======
let verificaToken= (req,res,next)=>{
    let token=req.get('token');
    jwt.verify(token,'este es el seed desarrollo ',(err,decoded)=>{
        if (err) {
            return res.status(401).json({
                ok :false ,
                err:{
                    message: 'token no valido'
                }
            })
        }
        req.usuario = decoded.usuario;
        next();

    })
    console.log(token)
};
//verifica adminrol
let verificaAdmin_Role= (req,res,next)=>{
    let usuario=req.usuario;
     if (usuario.role==='ADMIN_ROLE'){
         next();

     }else {
        res.json({
            ok : false,
            err: {
                message:'el usuario no es administador'
            }
        })
     }
            

}
module.exports={
    verificaToken,
    verificaAdmin_Role
}