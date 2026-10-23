
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'polls'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('question').notNullable()

      // datetime = dates et horaires
      // free = question libre
      table.string('type').notNullable().defaultTo('free')

      table
        .integer('room_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('rooms')
        .onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
