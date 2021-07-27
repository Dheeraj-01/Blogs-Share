
import helper from '../Helpers/helper';
import Blog from '../Models/Blogs';

const UserController = {
    async blogs(req, res, next){
        try {
            let body = {};
            body.name  = req.user.displayName;
            const blogs = await Blog.find({user : req.user.id}).lean();
            // console.log(blogs);
            body.blogs = blogs;

            body.blogs.CratedAt = helper.formateDate(blogs.CratedAt);
            res.render('dashboard', {body});
        } catch (err) {
            console.error(err);
        }
    }
}
export default UserController;
