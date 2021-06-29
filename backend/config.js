import dotenv from 'dotenv';
dotenv.config();

export default{
    PORT:process.env.PORT || 5000,
    MONGODB_URL:process.env.MONGODB_URL || 'mongodb://localhost/vicarious',
    JWT_SECRET:process.env.JWT_SECRET,
    accessKeyId:process.env.accessKeyId || 'accesskeyID',
    secretAccessKey : process.env.secretAccessKey || 'secretAccessKey'
}