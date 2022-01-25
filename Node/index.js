const fs = require('fs');
const express = require('express')
var dust = require('dustjs-helpers');
const { json } = require('express/lib/response');
const axios = require('axios')

const app = express()
app.use(express.json())

const hostname = '127.0.0.1';
const port = 3000;

let pageHtml = '';
let src = '';
let compiled = '';

const info = JSON.parse(fs.readFileSync('./public/context/data.json')) 

app.get('/home', (req, res, next) => {
    fs.readFile('./public/views/layout.dust', (err,data)=>{
        if (err) {
            console.log('Error')
        } else {
            src = data.toString();
            var compiled = dust.compile(src, 'home')
            dust.loadSource(compiled);
            dust.render('home', info, (err,out)=>{
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

app.get('/html', (req,res,next)=>{
    const html = fs.readFileSync('./public/trash/home.html', {'encoding': 'utf-8'})
    res.writeHead(200, {'content-type':'text/html'})
    res.write(html)
    res.end();
})

app.post('/html/tasks', (request,response)=>{
    let task = ''
    task = request.body
    console.log(task)
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

app.use('/', (req,res,next)=>{
    res.writeHead(404, {'Content-Type':'text/plain;charset=UTF-8'})
    res.write('Página no encontrada')
    res.end();
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/home`);
})
