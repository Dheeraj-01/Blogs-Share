import dotenv from 'dotenv';

dotenv.config();


export const {
    APP_PORT,
    DB_URL,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET
} = process.env;