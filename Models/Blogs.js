  
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const blogSchema = new Schema({

    title: { type: String, required: true, trim : true },
    body: { type: String, default: ""},
    status: { type: String, required: true, default:'public'},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    CratedAt: { type: Date , default : Date.now},
    
});

export default mongoose.model('Blog', blogSchema, 'allBlogs');