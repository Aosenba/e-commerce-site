import dotenv from 'dotenv';
dotenv.config();

export default{
    PORT:process.env.PORT || 5000,
    MONGODB_URL:process.env.MONGODB_URL || 'mongodb://localhost/vicarious',
    JWT_SECRET:process.env.JWT_SECRET,
    ACCESS_KEY_ID:process.env.ACCESS_KEY_ID ,
    SECRET_ACCESS_KEY:process.env.SECRET_ACCESS_KEY
}