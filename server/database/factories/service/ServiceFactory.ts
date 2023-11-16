import Service from 'App/Models/service/Service'
import Factory from '@ioc:Adonis/Lucid/Factory'
import FaqFactory from '../FaqFactory'
import ServiceCategoryFactory from './ServiceCategoryFactory'
import ServiceSubcategoryFactory from './ServiceSubcategoryFactory'
import SeoFactory from '../SeoFactory'
import ServiceTagFactory from './ServiceTagFactory'

export default Factory.define(Service, ({ faker }) => {
  return {
    name: faker.commerce.productName(),
    short_desc: faker.commerce.productDescription(),
    long_desc: faker.lorem.paragraphs(),
    status: false,
  }
})
  .relation('faqs', () => FaqFactory)
  .relation('serviceCategory', () => ServiceCategoryFactory)
  .relation('serviceSubcategory', () => ServiceSubcategoryFactory)
  .relation('seo', () => SeoFactory)
  .relation('tags', () => ServiceTagFactory)
  .build()
