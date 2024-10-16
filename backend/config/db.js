import mongoose from 'mongoose';
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://bhashvika:vishnu%401321@cluster0.d88cm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Database connected");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
};
export default connectDB;
