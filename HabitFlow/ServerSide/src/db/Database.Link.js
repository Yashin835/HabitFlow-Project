import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const ConnectDb = async () => {
    const maxRetries = 3;
    const retryDelay = 2000; 
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Database connection attempt ${attempt}/${maxRetries}`);
            await mongoose.connect(process.env.MONGODB_URL);
            console.log("Database connected successfully");
            return;
        } catch (error) {
            console.error(`Database connection attempt ${attempt} failed:`, error.message);
            
            if (attempt === maxRetries) {
                console.error("All database connection attempts failed");
                console.error("Error details:", error);
                process.exit(1);
            }
            
            console.log(`Retrying in ${retryDelay}ms...`);
            await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
    }
}

export default ConnectDb 