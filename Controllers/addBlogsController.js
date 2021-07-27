import helper from '../Helpers/helper';
import Blog from '../Models/Blogs'
import User from '../Models/User'
const addBlogsController = {
    async add(req, res, next){
        let body = {};
        body.name  = req.user.displayName;
        res.render('addblogs', {body});
    },
    async addData(req, res, next){
        try {
            // console.log(req.body);
            req.body.user = req.user.id;
            await Blog.create(req.body);
            res.redirect('/dashboard');
        } catch (err) {
            console.error(err);
        }
    },
    async distroy(req, res, next){
        try {
            let id = req.params.id;
            await Blog.findByIdAndRemove(id);
            res.redirect('/dashboard');
        } catch (err) {
            console.error(err);
        }
    },
    async edit(req, res, next){
        try {
            const data = await Blog.findById(req.params.id);
            res.render('update',{id: req.params.id, data});
        } catch (err) {
            console.error(err);
        }
    },
    async newEdit(req, res, next){
        try {
            let id = req.params.id;
            await Blog.findByIdAndUpdate(id,req.body);
            res.redirect('/dashboard');
        } catch (err) {
            console.error(err);
        }
    },
    async blogbyId(req, res, next){
        try {
            let blog = await Blog.findById(req.params.id);
            let id = blog.user;
            let currUser = await User.findById(id);
            // console.log(blog);
            // console.log(currUser);
            let body = {};
            body.user = currUser;
            body.blog = blog;
            res.render('blogDetail', {body})
        } catch (err) {
            console.error(err);
        }
    },
    async store(req, res, next){
        try {
            let blogs = await Blog.find({status : 'public'});
            // console.log(data);
            let body = {};
            let user = [  ];
            for (let index = 0; index < blogs.length; index++) {
                let element = blogs[index];
                let id = element.user;
                let currUser = await User.findById(id);
                user[index] = currUser;
                blogs[index].index = index;
                let str = blogs[index].body;
                str = helper.truncate(str);
                str = helper.stripTags(str);
                blogs[index].body = str;
            }
            body.blogs = blogs;
            body.user = user;
            res.render('blogs',{body,mydata : req.user})
        } catch (err) {
            console.error(err);
        }
    },

}
export default addBlogsController;