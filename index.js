const WebServer = require('./src/core/web-server');

const webServer = new WebServer();
webServer.start();

// const { v4: uuidv4 } = require('uuid');
// var md5 = require('md5');

// const express = require('express')
// const app = express()
// const port = 3000

// app.use(express.json())

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// let users = [{id:uuidv4(), firstname:"bob", name:"bob 2", password:md5("bobbob")},{id:uuidv4(), firstname:"stef"}];
// let incrementation = uuidv4();

// app.use((req, res, next) => {
//     const reqTime = Date.now()

//     res.on('finish', () => {
//         console.log(`[${new Date()}] ${req.ip} ${Date.now() - reqTime}ms ${req.method} ${req.originalUrl}`)
//     })
//     next()
// })

// app.use(function(err, req, res, next) {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
//   });

// app.get('/users',function(req, res){
//     res.status(200).send(users)
// })

// app.post('/users',function(req, res){
//     let newUser = req.body
//     newUser.id = incrementation
//     users.push(newUser)
//     incrementation = uuidv4();
//     res.sendStatus(200)
// });

// app.get('/users/:firstname',function(req, res){
//     if(req.params.firstname){
//         res.status(200).send(users.filter(user => {return req.params.firstname === user.firstname}))
//     }else{
//         res.sendStatus(400)
//     }
// })

// app.put('/users/:id',function(req, res){
//     if(req.params.id && req.body){
//         let index = users.findIndex(user => {return req.params.id == user.id})
//         users[index] = req.body
//         users[index].id = parseInt(req.params.id)
//         if(users[index].password !== req.body.password){
//             users[index].password = md5(req.body.password)
//         }
//         res.status(200).send(users)
//     }else{
//         res.sendStatus(400)
//     }
// })

// app.delete('/users/:id',function(req, res){
//     if(req.params.id){
//         let index = users.findIndex(user => {return req.params.id == user.id})
//         users.splice(index, 1)
//         res.status(200).send(users)
//     } else {
//         res.sendStatus(400)
//     }
// })

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
//   })

  