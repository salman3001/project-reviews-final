import BaseService from '../BaseService'
import Blog from 'App/Models/blogs/Blog'

class BlogService extends BaseService<typeof Blog> {}

export default new BlogService(Blog)
