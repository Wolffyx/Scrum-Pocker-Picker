import { RoomPlayer } from './RoomPlayer'

export interface Room {
	uid: string,
	name: string,
	createdAt: Date,
	players: RoomPlayer[]
	created: string
	showCards: boolean
	firstPick: boolean
}
