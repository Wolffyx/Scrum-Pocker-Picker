import { Injectable } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/compat/database'

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { Router } from '@angular/router'
import * as cryptoJs from 'crypto-js'

import { environment } from '../../environments/environment'
import { Room } from '../interfaces/Room'
import { Player } from '../interfaces/Player'
import { RoomPlayer } from '../interfaces/RoomPlayer'

@Injectable({
	providedIn: 'root',
})
export class RoomService {
	player: any

	constructor(
		private afs: AngularFirestore,
		private router: Router,
		private db: AngularFireDatabase,
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
			player: {
				uid: player.uid,
				name: player.displayName,
			},
			card: null,
			status: true,
			visible: false,
			spectate: false,
		}
		console.log(player)
		const room = await this.afs.collection('rooms').add(data)
		await room.collection('players').doc(player.uid).set(ownerData)
		return this.router.navigate(['room', room.id])
	}

	async pickCard(room: AngularFirestoreDocument<Room>, player: Player, card: number) {
		const data = {
			card,
			picked: true,
			visible: false,
		}

		const ref = room.collection('players').doc(player.uid).update(data)
		// const toastRef: NbToastRef = this.toast.success("Card picked");
		// toastRef.close();
		// console.log(ref.)
	}

	// @ts-ignore
	joinUsers(room: AngularFirestoreDocument<Room>, player: Player, roomID): AngularFirestoreCollection<DocumentData> {
		const data: RoomPlayer = {
			uid: player.uid,
			player: {
				uid: player.uid,
				name: player.displayName,
			},
			card: null,
			status: true,
			visible: false,
			spectate: false,
		}
		// const playerData = {id: player.id, uid: player.uid}
		const players = room.collection('players')
		const playerData = players.doc(player.uid).get().toPromise()
		playerData.then(async (player) => {
			if (!player.exists) {
				await players.doc(player.id).set(data)
				console.log('doesn\'t exist')
			}
			console.log(player.exists)
		})
		console.log(roomID,
			player.uid)
		this.removeUser(room, player)
		return players.valueChanges()
	}

	deleteUser(room: AngularFirestoreDocument<Room>, player: Player) {
		return room.collection('players').doc(player.uid).delete()
	}

	showCards(roomID: string) {
		console.log('cards shown')
		return this.afs.collection('rooms').doc<Room>(roomID).get({})
	}

	private removeUser(room: any, user: any) {
		console.log(user.uid)
		this.db.database.ref(user.uid).onDisconnect().update({status: 'offline'}).then(() => {
			room.collection('players').doc(user.uid).delete()
		})

	}
}
