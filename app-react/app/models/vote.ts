
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { VoteSchema } from '#database/schema'
import User from '#models/user'
import Choice from '#models/choice'

export default class Vote extends VoteSchema {
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Choice)
  declare choice: BelongsTo<typeof Choice>
}
