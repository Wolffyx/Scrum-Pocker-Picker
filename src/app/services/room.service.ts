import { Injectable } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { AngularFireAuth } from '@angular/fire/compat/auth'

import { AuthService } from './auth.service'
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
		private authService: AuthService,
		private router: Router,
		private db: AngularFireDatabase,
		private auth: AngularFireAuth,
	) {
		// this.auth.authState.subscribe(auth => {
		// 	if (auth !== undefined && auth !== null) {
		// 		this.player = auth
		// 	}
		// })
	}

	get(roomID: string): AngularFirestoreDocument<Room> {
		return this.afs
			.collection('rooms')
			.doc(roomID)
	}

	getRoom() {
		return this.db.list('rooms')
	}

	async create(name: string, player: Player) {
		const uid = cryptoJs.AES.encrypt(name, environment.key).toString()
		console.log(player)
		const data = {
			uid,
			name,
			created: player.id,
			createdAt: Date.now(),
		}
		const ownerData: RoomPlayer = {
			id: player.id,
			player: player,
			card: null,
			status: true,
			visible: false,
			owner: true,
			spectate: false,
		}
		console.log(player)
		const room = await this.afs.collection('rooms').add(data)
		await room.collection('players').doc(player.id).set(ownerData)
		return this.router.navigate(['room', room.id])
	}

	async pickCard(room: AngularFirestoreDocument<Room>, player: Player, card: number) {
		const data = {
			card,
			picked: true,
			visible: false,
		}

		const ref = room.collection('players').doc(player.id).update(data)
		// const toastRef: NbToastRef = this.toast.success("Card picked");
		// toastRef.close();
		// console.log(ref.)
	}

	// @ts-ignore
	joinUsers(room: AngularFirestoreDocument<Room>, player: Player, roomID): AngularFirestoreCollection<DocumentData> {
		const data: RoomPlayer = {
			card: null,
			visible: false,
			status: true,
			spectate: false,
			id: player.id,
			owner: false,
			player: player,
		}
		// const playerData = {id: player.id, uid: player.uid}
		const players = room.collection('players')
		const playerData = players.doc(player.id).get().toPromise()
		playerData.then(async (player) => {
			if (!player.exists) {
				await players.doc(player.id).set(data)
				console.log('doesn\'t exist')
			}
			console.log(player.exists)
		})
		console.log(roomID,
			player.id)
		console.log(this.db.database.ref().onDisconnect())
		return players.valueChanges()
	}

	deleteUser(room: AngularFirestoreDocument<Room>, player: Player) {
		return room.collection('players').doc(player.id).delete()
	}

	showCards(roomID: string) {
		console.log('cards shown')
		return this.afs.collection('rooms').doc<Room>(roomID).get({})
	}
}
