/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

router.on('/').renderInertia('home', {}).as('home')

router
  .group(() => {
    router.get('signup', [controllers.NewAccount, 'create'])
    router.post('signup', [controllers.NewAccount, 'store'])

    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
   router.get('/dashboard', [controllers.Rooms, 'dashboard']).as('dashboard')
    router.post('logout', [controllers.Session, 'destroy'])

  router.post('rooms/join', [controllers.Rooms, 'join']).as('rooms.join')
  router.resource('rooms', controllers.Rooms)

router
  .post('rooms/:roomId/polls', [controllers.Polls, 'store'])
  .as('polls.store')


router
  .post('polls/:id/vote', [controllers.Polls, 'vote'])
  .as('polls.vote')


  })
  .use(middleware.auth())



