import mongoose from 'mongoose'


const workerSchema = new mongoose.Schema({
    name:{type:String}
})

export default mongoose.models.workers || mongoose.model('workers', workerSchema)