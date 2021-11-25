import { RoomPlayer } from './RoomPlayer'
import firebase from 'firebase/compat'

export interface Room {
	uid: string,
	name: string,
	createdAt: Date,
	players: RoomPlayer[]
	created: string
}
