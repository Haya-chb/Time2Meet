
import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { Form } from '@adonisjs/inertia/react'

export default function CreateRoom() {
  return (
    <Page title="Créer une room">
      <Form route="rooms.store">
        <label htmlFor="name">Nom de la room</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Ex. : Réunion équipe"
          required
        />

        <button type="submit">Créer la room</button>
      </Form>
    </Page>
  )
}

CreateRoom.layout = [AppLayout]
