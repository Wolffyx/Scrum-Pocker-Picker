import { Player } from './Player'

export interface RoomPlayer {
	card: number | null
	status: boolean
	visible: boolean
	id: string
	owner: boolean,
	spectate: boolean
	player: Player
}
