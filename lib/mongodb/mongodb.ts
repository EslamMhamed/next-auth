import mongoose from "mongoose"


let isConnected = false

export async function connectDB(){
    mongoose.set('strictQuery', true)

    if(isConnected){
        console.log('MongoDB already connected')
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: 'next-auth-app'
        })
        console.log('MongoDB connected')
        isConnected = true
    } catch (error) {
        console.log('MongoDB connection error', error)
    }
} 