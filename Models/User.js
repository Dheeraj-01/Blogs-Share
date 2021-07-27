  
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({

    googleId: { type: String, required: true },
    displayName: { type: String, required: true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true},
    image: { type: String},
    CratedAt: { type: Date , default : Date.now},
    
    
});

export default mongoose.model('User', userSchema, 'users');