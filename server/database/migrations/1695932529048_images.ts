import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { ImageTypes } from 'App/Helpers/enums'

export default class extends BaseSchema {
  protected tableName = 'images'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('url', 2083)
      table.string('url_sm', 2083)
      table.enum('status', Object.values(ImageTypes)).defaultTo('Image').notNullable()

      table
        .integer('admin_user_id')
        .unsigned()
        .references('id')
        .inTable('admin_users')
        .onDelete('SET NULL')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('SET NULL')

      table.integer('blog_id').unsigned().references('id').inTable('blogs').onDelete('SET NULL')
      table
        .integer('product_subcategory_id')
        .unsigned()
        .references('id')
        .inTable('product_subcategories')
        .onDelete('SET NULL')
      table
        .integer('product_category_id')
        .unsigned()
        .references('id')
        .inTable('product_categories')
        .onDelete('SET NULL')
      table
        .integer('product_tag_id')
        .unsigned()
        .references('id')
        .inTable('product_tags')
        .onDelete('SET NULL')
      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onDelete('SET NULL')

      table
        .integer('service_subcategory_id')
        .unsigned()
        .references('id')
        .inTable('service_subcategories')
        .onDelete('SET NULL')
      table
        .integer('service_category_id')
        .unsigned()
        .references('id')
        .inTable('service_categories')
        .onDelete('SET NULL')
      table
        .integer('service_tag_id')
        .unsigned()
        .references('id')
        .inTable('service_tags')
        .onDelete('SET NULL')
      table
        .integer('service_id')
        .unsigned()
        .references('id')
        .inTable('services')
        .onDelete('SET NULL')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
