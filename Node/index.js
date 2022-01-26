const fs = require('fs');
const express = require('express')
var dust = require('dustjs-helpers');
const res = require('express/lib/response');
const { json } = require('express/lib/response');

const app = express()
app.use(express.json())

const hostname = '127.0.0.1';
const port = 3000;

let pageHtml = '';
let src = '';

//Servir estáticos html, css y js
let taskdb =JSON.parse(fs.readFileSync('./db/tasks.json')) 

app.use('/static', express.static('./public/static'));


app.get('/tasks', (req, res) => {
    res.writeHead(200, 'application/json')
    res.write(taskdb)
    res.end()
})

app.post('/html/posttasks', (request,response)=>{

    let newtask = request.body
    console.log(taskdb)
    let newtaskdb = taskdb.push(newtask)
    
    response.send(newtask)
    response.end()
})

//Compilar, renderizar y servir con plantilla DustJS
const info = JSON.parse(fs.readFileSync('./public/context/data.json')) 
app.get('/dust', (req, res, next) => {
    fs.readFile('./public/views/layout.dust', (err,data)=>{
        if (err) {
            console.log('Error')
        } else {
            src = data.toString();
            var compiled = dust.compile(src, 'dust')
            dust.loadSource(compiled);
            dust.render('dust', info, (err,out)=>{
                if (err) {
                    next()
                    console.log('error')
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

// En caso de Error redirige a esta salida
app.use('/', (req,res,next)=>{
    res.writeHead(404, {'Content-Type':'text/plain;charset=UTF-8'})
    res.write('Página no encontrada')
    res.end();
})


//Server listen
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/static/home.html`);
  console.log(`Server running at http://${hostname}:${port}/dust`);
})
