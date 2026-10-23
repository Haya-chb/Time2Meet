
import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { Form, Link } from '@adonisjs/inertia/react'
import { Users, ArrowRight } from 'lucide-react'

type Room = {
  id: number
  name: string
  code: string
}

export default function Dashboard({ rooms = [] }: { rooms: Room[] }) {
  return (
    <Page title="Dashboard">
      <h1>Mon espace Time2Meet</h1>

      <section>
        <h2>Rejoindre une salle</h2>
        <p>Saisis le code reçu pour rejoindre une salle existante.</p>

        <Form route="rooms.join">
          <label htmlFor="code">Code de la salle</label>
          <input
            id="code"
            name="code"
            type="text"
            placeholder="Ex. TEST2026"
            autoComplete="off"
            required
          />
          <button type="submit" className="btn btn--primary">
            Rejoindre
          </button>
        </Form>
      </section>

      <section>
        <h2>Mes salles</h2>

        {rooms.length === 0 ? (
          <p>
            Tu n'as encore aucune salle. Crée-en une ou rejoins-en une
            avec son code.
          </p>
        ) : (
          <div>
            {rooms.map((room) => (
              <Link
                key={room.id}
                route="rooms.show"
                routeParams={{ id: room.id }}
                className="subnav__item"
              >
                <Users size={18} />
                <span>
                  <strong>{room.name}</strong>
                  <br />
                  Code : {room.code}
                </span>
                <ArrowRight size={16} />
              </Link>
            ))}
          </div>
        )}
      </section>
    </Page>
  )
}

Dashboard.layout = [AppLayout]
