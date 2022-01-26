const fs = require('fs');
const express = require('express')
var dust = require('dustjs-helpers');
const res = require('express/lib/response');

const app = express()
app.use(express.json())

const hostname = '127.0.0.1';
const port = 3000;

let pageHtml = '';
let src = '';

//Servir estáticos html, css y js
app.use('/static', express.static('./public/static'));

app.post('/html/tasks', (request,response)=>{
    let task = ''
    task = request.body
    console.log(task)
    res.writeHead(404, {'Content-Type':'text/plain;charset=UTF-8'})
    res.write('Tarea registrada')
    res.end()
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

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/static/home.html`);
  console.log(`Server running at http://${hostname}:${port}/dust`);
})
