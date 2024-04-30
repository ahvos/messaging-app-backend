import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'

import Messages from './dbMessages.js'



/* app configuration */
const app = express()
const port = process.env.PORT || 9000
const connection_url = 'mongodb+srv://admin:a1317@messages.w7ynszz.mongodb.net/?retryWrites=true&w=majority&appName=messages'


/* middleware */
app.use(express.json())
app.use(Cors())


/* database configuration */
mongoose.connect(connection_url)


/* api endpoints */
app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"))

/*
app.post('/messages/new', (req, res) => {
    const dbMessage = req.body
    Messages.create(dbMessage, (err, data) => {
        if(err)
            res.status(500).send(err)
        else
            res.status(201).send(data)
    })
})

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
        res.status(200).send(data)
        }
    })
})


app.post('/messages/new', async (req, res) => {
    try {
        const dbMessage = req.body;
        const data = await Messages.create(dbMessage);
        res.status(201).send(data);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/messages/sync', async (req, res) => {
    try {
        const data = await Messages.find();
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send(err);
    }
});
*/

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body;

    // Create the message using the newMessage object
    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            const responseData = {
                _id: data._id,
                ...dbMessage
            };
            res.status(201).send(responseData);
        }
    });
});



/* listener */
app.listen(port, () => console.log(`Listening on localhost: ${port}`))