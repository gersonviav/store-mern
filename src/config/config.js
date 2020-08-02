// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;
//entorno
process.env.NODE_ENV=process.env.NODE_ENV || 'dev'
//base de datos
// ============================
//  Vencimiento del token
// ============================
 
//60 segundi
//60 minutos 
// 24 horas 
//30 dias 
process.env.CADUCIDAD_TOKEN= '48h';
//process.env.CADUCIDAD_TOKEN= 60*60*24*30;

// ============================
//  SEED de autenticacion
// ============================

process.env.SEED= process.env.SEED || 'este es el seed desarrollo ';

let urlDB;

if (process.env.NODE_ENV === 'dev') {
   urlDB = 'mongodb://localhost:27017/cafe'
} else {
    //admin_cafe
    //XIYRHH6YO2tB79rJ
    urlDB= process.env.MONGO_URI;
}
process.env.urlDB=urlDB;
// ============================
//  google client ID
// ============================
process.env.CLIENT_ID=process.env.CLIENT_ID || "427631670237-kph30j86s3d8hi8c1imefuvi9sgsbuov.apps.googleusercontent.com"