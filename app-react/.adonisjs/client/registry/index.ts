/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [[0,"/"]],
    types: placeholder as Registry['home']['types'],
  },
  'new_account.create': {
    methods: ["GET","HEAD"],
    pattern: '/signup',
    tokens: [[0,"signup"]],
    types: placeholder as Registry['new_account.create']['types'],
  },
  'new_account.store': {
    methods: ["POST"],
    pattern: '/signup',
    tokens: [[0,"signup"]],
    types: placeholder as Registry['new_account.store']['types'],
  },
  'session.create': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [[0,"login"]],
    types: placeholder as Registry['session.create']['types'],
  },
  'session.store': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [[0,"login"]],
    types: placeholder as Registry['session.store']['types'],
  },
  'dashboard': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard',
    tokens: [[0,"dashboard"]],
    types: placeholder as Registry['dashboard']['types'],
  },
  'session.destroy': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [[0,"logout"]],
    types: placeholder as Registry['session.destroy']['types'],
  },
  'rooms.join': {
    methods: ["POST"],
    pattern: '/rooms/join',
    tokens: [[0,"rooms"],[0,"join"]],
    types: placeholder as Registry['rooms.join']['types'],
  },
  'rooms.index': {
    methods: ["GET","HEAD"],
    pattern: '/rooms',
    tokens: [[0,"rooms"]],
    types: placeholder as Registry['rooms.index']['types'],
  },
  'rooms.create': {
    methods: ["GET","HEAD"],
    pattern: '/rooms/create',
    tokens: [[0,"rooms"],[0,"create"]],
    types: placeholder as Registry['rooms.create']['types'],
  },
  'rooms.store': {
    methods: ["POST"],
    pattern: '/rooms',
    tokens: [[0,"rooms"]],
    types: placeholder as Registry['rooms.store']['types'],
  },
  'rooms.show': {
    methods: ["GET","HEAD"],
    pattern: '/rooms/:id',
    tokens: [[0,"rooms"],[1,"id"]],
    types: placeholder as Registry['rooms.show']['types'],
  },
  'rooms.edit': {
    methods: ["GET","HEAD"],
    pattern: '/rooms/:id/edit',
    tokens: [[0,"rooms"],[1,"id"],[0,"edit"]],
    types: placeholder as Registry['rooms.edit']['types'],
  },
  'rooms.update': {
    methods: ["PUT","PATCH"],
    pattern: '/rooms/:id',
    tokens: [[0,"rooms"],[1,"id"]],
    types: placeholder as Registry['rooms.update']['types'],
  },
  'rooms.destroy': {
    methods: ["DELETE"],
    pattern: '/rooms/:id',
    tokens: [[0,"rooms"],[1,"id"]],
    types: placeholder as Registry['rooms.destroy']['types'],
  },
  'polls.store': {
    methods: ["POST"],
    pattern: '/rooms/:roomId/polls',
    tokens: [[0,"rooms"],[1,"roomId"],[0,"polls"]],
    types: placeholder as Registry['polls.store']['types'],
  },
  'polls.vote': {
    methods: ["POST"],
    pattern: '/polls/:id/vote',
    tokens: [[0,"polls"],[1,"id"],[0,"vote"]],
    types: placeholder as Registry['polls.vote']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
