import mongoose from 'mongoose'

const MONGODB_URI = 'mongodb://127.0.0.1:27017/fortuna'


if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local',
    )
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        }
        cached.promise = mongoose.connect('mongodb://localhost:27017/fortuna', opts).then(mongoose => {
            console.log('Db connected')
            return mongoose
        })
    }
    try {
        cached.conn = await cached.promise
    } catch (e) {
        cached.promise = null
        throw e
    }

    return cached.conn
}
// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function connectDB() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//       useNewUrlParser: true, 
//     useUnifiedTopology: true,
//       family: 4
//     };

//     cached.promise = mongoose.connect('mongodb://localhost:27017/fortuna', opts).then((mongoose) => {
//       return mongoose;
//     });
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// }

export default dbConnect


// async function dbConnect(){
//     try{
//         await mongoose.connect('mongodb://localhost:27017/fortuna',{bufferCommands: false})
//         .then(()=>console.log('Connected...'))
//     }
//     catch(e){
//         console.log(e)
//     }
// }

// export default dbConnect
