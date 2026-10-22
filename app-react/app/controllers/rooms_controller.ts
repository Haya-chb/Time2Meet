
import type { HttpContext } from '@adonisjs/core/http'
import Room from '#models/room'

export default class RoomsController {
  /**
   * Afficher la liste des groupes
   */
  async index({ response }: HttpContext) {
    const rooms = await Room.all()

    return response.ok(rooms)
  }

  /**
   * Afficher le formulaire de création
   * Pas nécessaire pour l'instant avec React
   */
  async create({}: HttpContext) {
    return { message: 'Utilise le formulaire React pour créer un groupe' }
  }

  /**
   * Créer un nouveau groupe
   */
  async store({ request, response }: HttpContext) {
    const name = request.input('name')

    if (typeof name !== 'string' || !name.trim()) {
      return response.badRequest({
        message: 'Le nom du groupe est obligatoire',
      })
    }

    const code = crypto.randomUUID().replace(/-/g, '').slice(0, 8).toUpperCase()

    const room = await Room.create({
      name: name.trim(),
      code,
    })

    return response.created(room)
  }

  /**
   * Afficher un groupe précis
   */
  async show({ params, response }: HttpContext) {
    const room = await Room.find(params.id)

    if (!room) {
      return response.notFound({ message: 'Groupe introuvable' })
    }

    return response.ok(room)
  }

  /**
   * Afficher le formulaire de modification
   * Pas nécessaire pour l'instant avec React
   */
  async edit({ params }: HttpContext) {
    return { message: `Formulaire de modification du groupe ${params.id} à créer` }
  }

  /**
   * Modifier un groupe
   */
  async update({ params, request, response }: HttpContext) {
    const room = await Room.find(params.id)

    if (!room) {
      return response.notFound({ message: 'Groupe introuvable' })
    }

    const name = request.input('name')

    if (typeof name !== 'string' || !name.trim()) {
      return response.badRequest({
        message: 'Le nom du groupe est obligatoire',
      })
    }

    room.name = name.trim()
    await room.save()

    return response.ok(room)
  }

  /**
   * Supprimer un groupe
   */
  async destroy({ params, response }: HttpContext) {
    const room = await Room.find(params.id)

    if (!room) {
      return response.notFound({ message: 'Groupe introuvable' })
    }

    await room.delete()

    return response.ok({ message: 'Groupe supprimé avec succès' })
  }
}
