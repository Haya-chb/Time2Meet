
import { useState } from 'react'
import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { Form } from '@adonisjs/inertia/react'

type Choice = {
  id: number
  proposition: string
  startsAt: string | null
  votesCount: number
  hasVoted: boolean
}


type Poll = {
  id: number
  question: string
  choices: {
    id: number
    proposition: string
    votesCount: number
    hasVoted: boolean
  }[]
}


type Room = {
  id: number
  name: string
  code: string
}

export default function RoomShow({
  room,
  polls = [],
}: {
  room: Room
  polls: Poll[]
}) {
  const [propositions, setPropositions] = useState(['', ''])

  function updateProposition(index: number, value: string) {
    setPropositions((current) =>
      current.map((item, i) => (i === index ? value : item))
    )
  }

  function addProposition() {
    setPropositions((current) => [...current, ''])
  }

  function removeProposition(index: number) {
    setPropositions((current) =>
      current.filter((_, i) => i !== index)
    )
  }

  return (
    <Page title={room.name}>
      <p>Code de la salle : {room.code}</p>

      <hr />

      <h2>Créer un sondage</h2>
      <p>Pose une question et ajoute au moins deux propositions.</p>

      <Form route="polls.store" routeParams={{ roomId: room.id }}>
        <input type="hidden" name="room_id" value={room.id} />

        <div>
          <label htmlFor="question">Question</label>
          <input
            id="question"
            name="question"
            type="text"
            placeholder="Ex. Quand êtes-vous disponibles ?"
            required
          />
        </div>

        {propositions.map((proposition, index) => (
          <div key={index} style={{ marginTop: '12px' }}>
            <label htmlFor={`choice-${index}`}>
              Proposition {index + 1}
            </label>

            <input
              id={`choice-${index}`}
              name="choices[]"
              type="text"
              value={proposition}
              onChange={(event) =>
                updateProposition(index, event.target.value)
              }
              placeholder={
                index === 0
                  ? 'Ex. Vendredi soir'
                  : index === 1
                    ? 'Ex. Samedi matin'
                    : 'Autre proposition'
              }
              required
            />

            {propositions.length > 2 && (
              <button
                type="button"
                onClick={() => removeProposition(index)}
                style={{ marginTop: '6px' }}
              >
                Supprimer cette proposition
              </button>
            )}
          </div>
        ))}

        <div style={{ marginTop: '12px' }}>
          <button
            type="button"
            onClick={addProposition}
          >
            + Ajouter une proposition
          </button>
        </div>

        <div style={{ marginTop: '16px' }}>
          <button type="submit" className="btn btn--primary">
            Créer le sondage
          </button>
        </div>
      </Form>

      <hr />

      <h2>Les sondages de cette salle</h2>

      {polls.length === 0 ? (
        <p>Il n'y a pas encore de sondage dans cette salle.</p>
      ) : (
        <div>
          {polls.map((poll) => {
            const maxVotes = Math.max(
              1,
              ...poll.choices.map((choice) => choice.votesCount)
            )

            return (
              <section
                key={poll.id}
                className="subnav__item"
                style={{
                  padding: '16px',
                  marginBottom: '20px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                }}
              >
                <h3>{poll.question}</h3>

                {poll.choices.map((choice) => {
                  const percentage = Math.round(
                    (choice.votesCount / maxVotes) * 100
                  )

                  return (
                    <div
                      key={choice.id}
                      style={{ marginBottom: '16px' }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: '12px',
                          marginBottom: '6px',
                        }}
                      >
                        <span>{choice.proposition}</span>

                        <strong>
                          {choice.votesCount}{' '}
                          {choice.votesCount > 1 ? 'votes' : 'vote'}
                        </strong>
                      </div>

                      <div
                        style={{
                          width: '100%',
                          height: '8px',
                          backgroundColor: '#e5e7eb',
                          borderRadius: '999px',
                          overflow: 'hidden',
                          marginBottom: '10px',
                        }}
                      >
                        <div
                          style={{
                            width: `${percentage}%`,
                            height: '100%',
                            backgroundColor: '#16a34a',
                            borderRadius: '999px',
                            transition: 'width 0.3s ease',
                          }}
                        />
                      </div>

                      <Form
                        route="polls.vote"
                        routeParams={{ id: poll.id }}
                      >
                        <input
                          type="hidden"
                          name="choice_id"
                          value={choice.id}
                        />

                        <button
                          type="submit"
                          className="btn btn--primary"
                        >
                          {choice.hasVoted
                            ? 'Retirer mon vote'
                            : 'Voter'}
                        </button>
                      </Form>
                    </div>
                  )
                })}
              </section>
            )
          })}
        </div>
      )}
    </Page>
  )
}

RoomShow.layout = [AppLayout]
