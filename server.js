import express from 'express'
import mongoose from 'mongoose'


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


/* listener */
app.listen(port, () => console.log(`Listening on localhost: ${port}`))