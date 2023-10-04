import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'knowledge_base_categories'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('language_id')
        .unsigned()
        .references('id')
        .inTable('languages')
        .onDelete('SET NULL')
      table.string('name').unique().notNullable()
      table.string('slug').unique().notNullable()
      table.string('meta_title')
      table.string('meta_desc')
      table.string('meta_keywords')

      table.index(['slug'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
