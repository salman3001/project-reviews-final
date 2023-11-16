import Product from 'App/Models/product/Product'
import Factory from '@ioc:Adonis/Lucid/Factory'
import FaqFactory from '../FaqFactory'
import ProductCategoryFactory from './ProductCategoryFactory'
import ProductSubcategoryFactory from './ProductSubcategoryFactory'
import SeoFactory from '../SeoFactory'
import ProductTagFactory from './ProductTagFactory'

export default Factory.define(Product, ({ faker }) => {
  return {
    name: faker.commerce.productName(),
    short_desc: faker.commerce.productDescription(),
    long_desc: faker.lorem.paragraphs(),
    status: false,
  }
})
  .relation('faq', () => FaqFactory)
  .relation('productCategory', () => ProductCategoryFactory)
  .relation('productSubcategory', () => ProductSubcategoryFactory)
  .relation('seo', () => SeoFactory)
  .relation('tags', () => ProductTagFactory)
  .build()
