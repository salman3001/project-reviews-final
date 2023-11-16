import ProductCategory from 'App/Models/product/ProductCategory'
import BaseService from '../BaseService'

class ProductCategroyService extends BaseService<typeof ProductCategory> {}

export default new ProductCategroyService(ProductCategory)
