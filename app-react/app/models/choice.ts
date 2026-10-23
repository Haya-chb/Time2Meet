
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { ChoiceSchema } from '#database/schema'
import Poll from '#models/poll'
import Vote from '#models/vote'

export default class Choice extends ChoiceSchema {
  @belongsTo(() => Poll)
  declare poll: BelongsTo<typeof Poll>

  @hasMany(() => Vote)
  declare votes: HasMany<typeof Vote>
}
