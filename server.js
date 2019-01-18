const express = require('express');
const hbs = require('hbs');
var app = express();
var fs = require('file-system');

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next)=>{
 var now = new Date().toString();
 var log = `${now}: ${req.method} ${req.url} `
console.log(log);
 fs.appendFile('server.log', log + '/n', (err)=>{
   if(err){
     console.log("Unable to handle Server.log");
   }
 });
next()
});

// app.use((req, res, next)=>{
//   res.render('Maintainence.hbs')
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) =>{
  res.render('homepage.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my Website'
  });
});


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});



app.get('/about', (req, res)=>{
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/project', (req, res)=>{
  res.render('project.hbs', {
    pageTitle: 'Portfolio Page'
  });
});


app.get('/bad', (req, res)=>{
  res.send({
    errorMessage: 'Unable to Handle requests'
  })
})

app.listen(port, ()=>{
  console.log(`Server has started on port ${port}`);
});
