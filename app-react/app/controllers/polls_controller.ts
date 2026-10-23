
import type { HttpContext } from '@adonisjs/core/http'
import Poll from '#models/poll'
import Choice from '#models/choice'
import Vote from '#models/vote'
import db from '@adonisjs/lucid/services/db'

export default class PollsController {
  

    // Créer un sondage avec ses propositions
  
  async store({ request, response, auth, params }: HttpContext) {
    const question = request.input('question')
    const roomId = Number(params.roomId ?? request.input('room_id'))
    const choices: unknown = request.input('choices')

            // Vérifier les informations reçues
    if (
      typeof question !== 'string' ||
      !question.trim() ||
      !Number.isInteger(roomId) ||
      roomId <= 0 ||
      !Array.isArray(choices) ||
      choices.length < 2 ||
      choices.some(
        (choice: unknown) =>
          typeof choice !== 'string' || !choice.trim()
      )
    ) {
      return response.badRequest(
        'Vérifie la question et les propositions. Il faut au moins deux propositions.'
      )
    }

    const user = auth.user!

            // Vérifier que l'utilisateur appartient à la salle
    const membership = await db
      .from('room_users')
      .where('room_id', roomId)
      .where('user_id', user.id)
      .first()

    if (!membership) {
      return response.forbidden(
        'Tu ne fais pas partie de cette salle.'
      )
    }

            // Créer le sondage et ses propositions dans une transaction
    await db.transaction(async (trx) => {
      const poll = await Poll.create(
        {
          question: question.trim(),
          type: 'free',
          roomId,
        },
        { client: trx }
      )

      for (const proposition of choices as string[]) {
        await Choice.create(
          {
            pollId: poll.id,
            proposition: proposition.trim(),
            startsAt: null,
          },
          { client: trx }
        )
      }
    })

            // Revenir à la salle pour voir le sondage créé
    return response.redirect().toRoute('rooms.show', {
      id: roomId,
    })
  }



  // Voter pour une proposition
   
  async vote({ params, request, auth, response }: HttpContext) {
    const poll = await Poll.find(params.id)

    if (!poll) {
      return response.notFound('Sondage introuvable.')
    }

    const user = auth.user!

    const membership = await db
      .from('room_users')
      .where('room_id', poll.roomId)
      .where('user_id', user.id)
      .first()

    if (!membership) {
      return response.forbidden(
        'Tu ne fais pas partie de cette salle.'
      )
    }

    const choiceId = Number(request.input('choice_id'))

    if (!Number.isInteger(choiceId) || choiceId <= 0) {
      return response.badRequest('Proposition invalide.')
    }

    const choice = await Choice.query()
      .where('id', choiceId)
      .where('poll_id', poll.id)
      .first()

    if (!choice) {
      return response.badRequest(
        'Cette proposition ne fait pas partie de ce sondage.'
      )
    }

    const existingVote = await Vote.query()
      .where('user_id', user.id)
      .where('choice_id', choice.id)
      .first()

    if (existingVote) {
      await existingVote.delete()
    } else {
      await Vote.create({
        userId: user.id,
        choiceId: choice.id,
      })
    }

    return response.redirect().back()
  }}