import mongoose from 'mongoose'


const techSchema = new mongoose.Schema({
    id:{type:Number},
    name:{type:String},
    catagory:{type: String},
    inspection:{type: Date, default: Date.now},
    maintance:{
        type:Object, default:{}
    },
    parts:{type:Array},
    
    organization:{type:String},
    orders:{type:Array},
    
    history:[
        {
            date:{type:Date, default:Date.now}, 
            user:{type:String}, 
            type:{type:String}, 
            text:{type:String}
        }
    ]
})

export default mongoose.models.tech || mongoose.model('tech', techSchema)

