import BaseService from '../BaseService'
import ProductSubcategory from 'App/Models/product/ProductSubcategory'

class ProductSubcategoryService extends BaseService<typeof ProductSubcategory> {}

export default new ProductSubcategoryService(ProductSubcategory)
