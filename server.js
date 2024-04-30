import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import Pusher from 'pusher'

import Messages from './dbMessages.js'



/* app configuration */
const app = express()
const port = process.env.PORT || 9000
const connection_url = 'mongodb+srv://admin:a1317@messages.w7ynszz.mongodb.net/?retryWrites=true&w=majority&appName=messages'

const pusher = new Pusher({
    appId: "1795699",
    key: "7ef4753b8c612d73d576",
    secret: "e76ebc4debd197c7119b",
    cluster: "us3",
    useTLS: true
});


/* middleware */
app.use(express.json())
app.use(Cors())


/* database configuration */
mongoose.connect(connection_url)


/* api endpoints */
const db = mongoose.connection
db.once("open", () => {
    console.log("DB Connected")
    const msgCollection = db.collection("messagingmessages")
    const changeStream = msgCollection.watch()
    changeStream.on('change', change => {
        console.log(change)
        if (change.operationType === "insert") {
            const messageDetails = change.fullDocument
            pusher.trigger("messages", "inserted", {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            })
        } else {
            console.log('Error trigerring Pusher')
        }
    })
})

app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"))

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



/* listener */
app.listen(port, () => console.log(`Listening on localhost: ${port}`))