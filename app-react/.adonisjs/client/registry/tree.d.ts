/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  newAccount: {
    create: typeof routes['new_account.create']
    store: typeof routes['new_account.store']
  }
  session: {
    create: typeof routes['session.create']
    store: typeof routes['session.store']
    destroy: typeof routes['session.destroy']
  }
  dashboard: typeof routes['dashboard']
  rooms: {
    join: typeof routes['rooms.join']
    index: typeof routes['rooms.index']
    create: typeof routes['rooms.create']
    store: typeof routes['rooms.store']
    show: typeof routes['rooms.show']
    edit: typeof routes['rooms.edit']
    update: typeof routes['rooms.update']
    destroy: typeof routes['rooms.destroy']
  }
  polls: {
    store: typeof routes['polls.store']
    show: typeof routes['polls.show']
    vote: typeof routes['polls.vote']
  }
}
