
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Room from '#models/room'

export default class extends BaseSeeder {
  async run() {
    await Room.firstOrCreate(
      { code: 'TEST2026' },
      { name: 'Groupe de test', code: 'TEST2026' }
    )
  }
}
