
import db from '@adonisjs/lucid/services/db'
import type { HttpContext } from '@adonisjs/core/http'
import Poll from '#models/poll'
import Room from '#models/room'

export default class RoomsController {
  /**
   * Afficher les salles
   */
  async index({ auth, inertia }: HttpContext) {
    const user = auth.user!

    const rooms = await Room.query()
      .join('room_users', 'rooms.id', 'room_users.room_id')
      .where('room_users.user_id', user.id)
      .select('rooms.*')

    return inertia.render('rooms/index', {
      rooms: rooms.map((room) => ({
        id: room.id,
        name: room.name,
        code: room.code,
      })),
    })
  }

  /**
   * Afficher le formulaire de création
   */
  async create({ inertia }: HttpContext) {
    return inertia.render('rooms/create')
  }

  /**
   * Afficher le dashboard avec les salles de l'utilisateur
   */
  async dashboard({ auth, inertia }: HttpContext) {
    const user = auth.user!

    const rooms = await Room.query()
      .join('room_users', 'rooms.id', 'room_users.room_id')
      .where('room_users.user_id', user.id)
      .select('rooms.*')

    return inertia.render('dashboard', {
      rooms: rooms.map((room) => ({
        id: room.id,
        name: room.name,
        code: room.code,
      })),
    })
  }

  /**
   * Créer une salle et y inscrire son créateur
   */
  async store({ request, response, auth }: HttpContext) {
    const name = request.input('name')

    if (typeof name !== 'string' || !name.trim()) {
      return response.badRequest({
        message: 'Le nom de la salle est obligatoire',
      })
    }

    const code = crypto.randomUUID().replace(/-/g, '').slice(0, 8).toUpperCase()

    const room = await Room.create({
      name: name.trim(),
      code,
    })

    const user = auth.user!

    await db.table('room_users').insert({
      room_id: room.id,
      user_id: user.id,
      created_at: new Date(),
      updated_at: new Date(),
    })

    return response.redirect().toRoute('rooms.show', { id: room.id })
  }

  /**
   * Afficher une salle et ses sondages avec le nombre de votes
   */
  async show({ params, auth, inertia, response }: HttpContext) {
    const room = await Room.find(params.id)

    if (!room) {
      return response.notFound('Salle introuvable.')
    }

    const user = auth.user!

    const membership = await db
      .from('room_users')
      .where('room_id', room.id)
      .where('user_id', user.id)
      .first()

    if (!membership) {
      return response.forbidden('Tu ne fais pas partie de cette salle.')
    }

    const polls = await Poll.query()
      .where('room_id', room.id)
      .preload('choices')

    const choiceIds = polls.flatMap((poll) =>
      poll.choices.map((choice) => choice.id)
    )

    const voteCounts = choiceIds.length
      ? await db
          .from('votes')
          .select('choice_id')
          .count('* as total')
          .whereIn('choice_id', choiceIds)
          .groupBy('choice_id')
      : []

    const countsByChoice = new Map(
      voteCounts.map((row) => [
        Number(row.choice_id),
        Number(row.total),
      ])
    )

    return inertia.render('rooms/show', {
      room: {
        id: room.id,
        name: room.name,
        code: room.code,
      },
      polls: polls.map((poll) => ({
        id: poll.id,
        question: poll.question,
        type: poll.type,
        choices: poll.choices.map((choice) => ({
          id: choice.id,
          proposition: choice.proposition,
          startsAt: choice.startsAt,
          votesCount: countsByChoice.get(choice.id) ?? 0,
        })),
      })),
    })
  }

  /**
   * Rejoindre une salle avec son code
   */
  async join({ request, auth, response, session }: HttpContext) {
    const code = request.input('code')

    if (typeof code !== 'string' || !code.trim()) {
      session.flash('errors', {
        code: 'Saisis le code de la salle.',
      })

      return response.redirect().back()
    }

    const room = await Room.findBy('code', code.trim().toUpperCase())

    if (!room) {
      session.flash('errors', {
        code: 'Aucune salle ne correspond à ce code.',
      })

      return response.redirect().back()
    }

    const user = auth.user!

    const alreadyJoined = await db
      .from('room_users')
      .where('room_id', room.id)
      .where('user_id', user.id)
      .first()

    if (!alreadyJoined) {
      await db.table('room_users').insert({
        room_id: room.id,
        user_id: user.id,
        created_at: new Date(),
        updated_at: new Date(),
      })
    }

    return response.redirect().toRoute('rooms.show', { id: room.id })
  }
}
