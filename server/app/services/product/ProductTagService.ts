import BaseService from '../BaseService'
import ProductTag from 'App/Models/product/ProductTag'

class ProductTagService extends BaseService<typeof ProductTag> {}

export default new ProductTagService(ProductTag)
