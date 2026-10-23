
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { PollSchema } from '#database/schema'
import Room from '#models/room'
import Choice from '#models/choice'

export default class Poll extends PollSchema {
  @belongsTo(() => Room)
  declare room: BelongsTo<typeof Room>

  @hasMany(() => Choice)
  declare choices: HasMany<typeof Choice>
}
