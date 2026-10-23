import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'dashboard': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'rooms.join': { paramsTuple?: []; params?: {} }
    'rooms.index': { paramsTuple?: []; params?: {} }
    'rooms.create': { paramsTuple?: []; params?: {} }
    'rooms.store': { paramsTuple?: []; params?: {} }
    'rooms.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'rooms.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'rooms.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'rooms.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'dashboard': { paramsTuple?: []; params?: {} }
    'rooms.index': { paramsTuple?: []; params?: {} }
    'rooms.create': { paramsTuple?: []; params?: {} }
    'rooms.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'rooms.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'dashboard': { paramsTuple?: []; params?: {} }
    'rooms.index': { paramsTuple?: []; params?: {} }
    'rooms.create': { paramsTuple?: []; params?: {} }
    'rooms.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'rooms.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'rooms.join': { paramsTuple?: []; params?: {} }
    'rooms.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'rooms.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'rooms.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'rooms.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}