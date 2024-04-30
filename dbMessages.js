import mongoose from 'mongoose'


const messagingSchema = mongoose.Schema ({
    message: String,
    name: String,
    timestamp: String,
    received: { type: Boolean, default: false}
})


export default mongoose.model('messagingmessages', messagingSchema)