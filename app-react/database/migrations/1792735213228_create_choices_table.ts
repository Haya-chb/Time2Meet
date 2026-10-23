
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'choices'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('poll_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('polls')
        .onDelete('CASCADE')

      // Texte visible de la proposition
      table.text('proposition').notNullable()

      // Utilisé pour les propositions de dates/horaires
      table.timestamp('starts_at').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.index(['poll_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
