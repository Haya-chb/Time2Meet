
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'votes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table
        .integer('choice_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('choices')
        .onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')

      // Un utilisateur ne peut voter qu'une fois
      // pour une proposition donnée.
      table.unique(['user_id', 'choice_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
