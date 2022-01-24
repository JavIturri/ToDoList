//const http = require('http');
const fs = require('fs');
const express = require('express')
//var dust = require('dustjs-linkedin');
var dust = require('dustjs-helpers');

const app = express()

const hostname = '127.0.0.1';
const port = 3000;

let pageHtml = '';
let src = '';
let compiled = '';

let names =JSON.parse(fs.readFileSync('./data/data.json', {'encoding': 'utf-8'})) 
let datos =JSON.parse(fs.readFileSync('./public/DATA/datos.json', {'encoding': 'utf-8'})) 

app.get('/home', (req, res) => {
    fs.readFile('./public/page.html', (err,data)=>{
        if (err) {
            console.log('Error')
        } else {
            pageHtml = data  
        }
    if (pageHtml == '') {
        res.writeHead(500, {'Content-Type':'text/plain'})
        res.write('Error 500: internal server error')
    } else {
        res.writeHead(200, {'Content-Type':'text/html'});
        res.write(pageHtml)
    }
    res.end()
    })
})


app.get('/home/:id', (req, res, next) => {
    const id = req.params.id
    fs.readFile('./public/hello.dust', (err,data)=>{
        if(err){
            console.log('error')
            next()
        } else {
            src = data.toString()
            var compiled = dust.compile(src, 'hello');
            dust.loadSource(compiled);
            dust.render('hello', { name: id }, (err, out) => {
                if (err) {
                    next()
                } else {
                    pageHtml = out 
                    res.writeHead(200, {'content-type':'text/html'})
                    res.write(pageHtml)
                    res.end();
                }
            })
        }
    })
})

app.get('/dust', (req, res, next) => {
    const id = req.params.id
    fs.readFile('./public/TEMPLATES/home.dust', (err,data)=>{
        if(err){
            console.log('error')
            next()
        } else {
            src = data.toString()
            var compiled = dust.compile(src, 'hello');
            dust.loadSource(compiled);
            dust.render('hello', datos , (err, out) => {
                if (err) {
                    next()
                } else {
                    pageHtml = out 
                    res.writeHead(200, {'content-type':'text/html'})
                    res.write(pageHtml)
                    res.end();
                }
            })
        }
    })
})

app.use('/', (req,res,next)=>{
    res.writeHead(404, {'Content-Type':'text/plain;charset=UTF-8'})
    res.write('Página no encontrada')
    res.end();
})

//ANTES DE DUSTJS
/* let pageHtml = ''; */
/* let pageCss; */
/* fs.readFile('./public/styles.css', (err,data)=>{
    if (err) {
        console.log('Error')
    } else {
        pageCss = data  
    }
}) */
/* fs.readFile('./public/page.html', (err,data)=>{
    if (err) {
        console.log('Error')
    } else {
        pageHtml = data  
    }
}) */
/* app.get('/home', (req, res) => {
    if (pageHtml == '') {
        res.writeHead(500, {'Content-Type':'text/plain'})
        res.write('Error 500: internal server error')
    } else {
        res.writeHead(200, {'Content-Type':'text/html'});
        res.write(pageHtml)
    }
    res.end()
}) */
/* app.use('/', express.static('../Node/public'))   */
/*app.get('/styles', (req, res) => {
    res.writeHead(200, {'Content-Type':'text/css'});
    res.write(pageCss)
    res.end();
}) 
const server = http.createServer((req, res) => {
   res.writeHead(200, {'Content-Type':'text/html'});
   res.write(page)
   res.end();
}); */

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})
