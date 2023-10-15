import BaseService from '../BaseService'
import BlogCategory from 'App/Models/blogs/BlogCategory'

class BlogCategoryService extends BaseService<typeof BlogCategory> {}

export default new BlogCategoryService(BlogCategory)
