import express from 'express';
import http from  'http';
import * as dao from './dao.js'

const app = express ();
const httpSrv = http.Server(app);

const hello = (req, res) => {
    const name = req.param('name', null)
    console.log('je suis dans hello')
    res.end(`hello ${name}`)
}

app.post('/ping', function(req, res){
    console.log('je suis dans ping')
    res.end('pong');
})
app.get('/hello', hello);


const postMessage = async (req, res) => {
    console.log('l\'utilisateur souhaite poster un message');
    const messageVariable = req.param('message');
    const usernameVariable = req.param('username');
    const ts = new Date().getTime();
    
    if(!messageVariable){
        res.status(400).end('Message est vide');
        return;
    }

    if(usernameVariable == null || usernameVariable == undefined || usernameVariable == ''){

        res.status(400).end('username est vide')
        return;
    }
    
    const u = user.find(element => element.username === usernameVariable);
    if (!u) {
        res.status(401).end('User unknow');
    }

    const monMessage = {
        message: messageVariable,
        username: usernameVariable,
        ts: ts
    
    }

    await dao.insertDocument("Message", monMessage);
    messages.push(monMessage);
    res.status(201);
    res.send("Messsagge créé");

}

const getUsers = (req, res) => {
    console.log('get users')
    const u = user.map(element => {return{username: element.username}} )
    res.json(users);
}

const postUsers = (req, res) => {
    console.log('');
    const userVariable = req.param('username');
    const passwordVariable = req.param('password');
    const identification = {
    user: userVariable,
    password: passwordVariable

    }
    if(!userVariable){
        res.status(400).end('user est vide');
        return;
    }

    if(passwordVariable == null || passwordVariable == undefined || passwordVariable == ''){

        res.status(400).end('password est vide')
        return;
    }
    
    users.push(identification);
    res.status(201).end();

}

const users = [];

app.post('/users', postUsers);
app.get('/users', getUsers);

const getMessages = (req, res) => {
    console.log('get messages')
    res.json(messages);
}

//message
app.post('/messages', postMessage);
app.get('/messages', getMessages);

httpSrv.listen(8080, function (){
    console.log('listening on *:8080')
})

