const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors=require('cors')
const app = express();
app.use(cors())

// Db connection
const { mongoose } = require('./database');
// Settings 
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/tienda', require('./routes/usuario.routes'));
app.use('/api/tienda', require('./routes/categoria.routes'));
app.use('/api/tienda', require('./routes/producto.routes'));


app.use('/api/tienda', require('./routes/carrito.routes'));


app.use('/api/tienda',require('./routes/imagenes.routes'));

app.use('/api/tienda',require('./routes/upload.routes'));

 
app.use('/api/tienda', require('./routes/carditem.routes'));
app.use('/api/tienda', require('./routes/login.routes'));
app.use('/api/tienda', require('./routes/order.routes'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));;

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
}); 
