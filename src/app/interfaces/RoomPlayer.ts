import firebase from 'firebase/compat'
import UserInfo = firebase.UserInfo

export interface RoomPlayer {
	card: number | null
	visible: boolean
	uid: string
	user: Partial<UserInfo>
}
