import express from 'express'
import mongoose from 'mongoose'

import Messages from './dbMessages.js'



/* app configuration */
const app = express()
const port = process.env.PORT || 9000
const connection_url = ' mongodb+srv://admin:<a1317>@messages.w7ynszz.mongodb.net/?retryWrites=true&w=majority&appName=messages'

/* middleware */


/* database configuration */
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})


/* api endpoints */
app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"))

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


/* listener */
app.listen(port, () => console.log(`Listening on localhost: ${port}`))