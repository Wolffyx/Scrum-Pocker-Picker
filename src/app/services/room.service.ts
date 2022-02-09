import {Injectable} from '@angular/core'
import {AngularFireDatabase} from '@angular/fire/compat/database'

import {AngularFirestore, AngularFirestoreDocument, DocumentData} from '@angular/fire/compat/firestore'
import {Router} from '@angular/router'
import * as cryptoJs from 'crypto-js'
import {firstValueFrom, Subject} from 'rxjs'

import {environment} from '../../environments/environment'
import {Room} from '../interfaces/Room'
import {RoomPlayer} from '../interfaces/RoomPlayer'
import {Title} from '@angular/platform-browser'

import firebase from 'firebase/compat'
import UserInfo = firebase.UserInfo;

@Injectable({
	providedIn: 'root',
})
export class RoomService {
	player?: Subject<UserInfo>

	constructor(
		private afs: AngularFirestore,
		private router: Router,
		private db: AngularFireDatabase,
		private title: Title,
	) {
	}

	get(roomID: string): AngularFirestoreDocument<Room> {
		return this.afs
			.collection('rooms')
			.doc(roomID)
	}

	async create(name: string, player: any) {
		const uid = cryptoJs.AES.encrypt(name, environment.key).toString()
		const data = {
			uid,
			name,
			created: player.uid,
			createdAt: Date.now(),
		}
		const ownerData: RoomPlayer = {
			uid: player.uid,
			user: {
				uid: player.uid,
				displayName: player.displayName,
			},
			card: null,
			visible: false,
		}
		const oldTitle = this.title.getTitle()
		console.log(player)
		const room = await this.afs.collection('rooms').add(data)
		await room.collection('players').doc(player.uid).set(ownerData)
		this.title.setTitle(name + ' ' + oldTitle)
		return this.router.navigate(['room', room.id])
	}

	async pickCard(room: AngularFirestoreDocument<Room>, player: UserInfo, card: number | null = null) {
		const data = {
			card,
			picked: true,
			visible: false,
		}
		await room.update({
			firstPick: true,
		})
		const ref = room.collection('players').doc(player.uid).update(data)
	}

	joinUsers(room: AngularFirestoreDocument<Room>, player: UserInfo, spectate: boolean = false): DocumentData {
		const data: RoomPlayer = {
			uid: player.uid,
			user: {
				uid: player.uid,
				displayName: player.displayName,
			},
			card: null,
			visible: false,
		}
		const players = room.collection('players')
		const playerData = firstValueFrom(players.doc(player.uid).get())
		playerData.then(async (player) => {
			if (!player) return
			if (!player.exists) {
				await players.doc(player.id).set(data)
				console.log('doesn\'t exist')
			}
			console.log(player.exists)
		})
		const spectators = room.collection('spectators')
		return {players: players.valueChanges(), spectators: spectators.valueChanges()}
	}

	deleteUser(room: AngularFirestoreDocument<Room>, player: UserInfo) {
		return room.collection('players').doc(player.uid).delete()
	}

	showCards(roomID: string) {
		console.log('cards shown')
		return this.afs.collection('rooms').doc<Room>(roomID).get({})
	}

	async spectate(room: AngularFirestoreDocument, user: UserInfo, spectate: boolean) {
		await this.moveUserFromCollection(room, !spectate ? 'spectators' : 'players', spectate ? 'spectators' : 'players', user)
	}

	async moveUserFromCollection(room: AngularFirestoreDocument, from: string, to: string, user: UserInfo) {
		const playerRef = room.collection(from).doc(user.uid)
		const player = await firstValueFrom(playerRef.get())
		if (player)
			if (player.exists) {
				// @ts-ignore
				await room.collection(to).doc(user.uid).set(player.data())
				await playerRef.delete()
			}
		return 'An error occurred'
		//todo toast message
	}

	async checkIfIsSpectator(room: AngularFirestoreDocument, user: UserInfo) {
		const playerRef = room.collection('spectators').doc(user.uid)
		const player = await firstValueFrom(playerRef.get())
		if (!player) return false
		return player.exists as boolean
	}

	//todo remove user when tab closes
	private removeUser(room: any, user: any) {
		console.log(user.uid)
		// this.db.database.ref(user.uid).onDisconnect().remove((data)=>{
		// 	console.log(data)
		// 	room.collection("players").doc(user.uid).delete();
		// })
	}
}
