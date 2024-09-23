const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const methodOverride = require('method-override');

const app = express();
const port = process.env.PORT || 8000;

require('dotenv').config();

app.use(express.urlencoded({ extended:true } ));
app.use(express.static('public'));
app.use(expressLayouts);

app.use(cookieParser('TravelBlogSecure'));
app.use(session({
    secret: 'TravelBlogSecretSession',
    saveUninitialized: true,
    resave:true
}));
app.use(flash());
app.use(fileUpload());

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const routes = require('./server/routes/travelRoutes.js')
app.use('/', routes);

app.listen(port, ()=> console.log(`Listening to port ${port}`));

app.use(methodOverride('_method'));
