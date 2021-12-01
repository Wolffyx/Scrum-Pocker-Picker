import { Player } from './Player'

export interface RoomPlayer {
	card: number | null
	status: boolean
	visible: boolean
	uid: string
	spectate: boolean
	player: Player
}
