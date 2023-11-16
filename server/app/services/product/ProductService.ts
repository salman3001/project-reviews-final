import Product from 'App/Models/product/Product'
import BaseService from '../BaseService'

class ProductService extends BaseService<typeof Product> {}

export default new ProductService(Product)
