
import Page from '~/components/page'
import AppLayout from '~/layouts/app'

type Room = {
  id: number
  name: string
  code: string
}

export default function RoomShow({ room }: { room: Room }) {
  return (
    <Page title={room.name}>
      <h1>{room.name}</h1>
      <p>Code de la salle : {room.code}</p>
      <p>Les votes apparaîtront ici prochainement.</p>
    </Page>
  )
}

RoomShow.layout = [AppLayout]
