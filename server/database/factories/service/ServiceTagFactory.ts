import ServiceTag from 'App/Models/service/ServiceTag'
import Factory from '@ioc:Adonis/Lucid/Factory'
import FaqFactory from '../FaqFactory'
import SeoFactory from '../SeoFactory'

export default Factory.define(ServiceTag, ({ faker }) => {
  return {
    name: faker.lorem.word(),
    short_desc: faker.commerce.productDescription(),
    long_desc: faker.lorem.paragraphs(),
  }
})
  .relation('faqs', () => FaqFactory)
  .relation('seo', () => SeoFactory)
  .build()
