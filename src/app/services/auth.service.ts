import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router'
import { v4 as uuidv4 } from 'uuid'
import { Player } from '../interfaces/Player'

@Injectable({
	providedIn: 'root',
})
export class AuthService {

	user$!: AngularFirestoreDocument<Player>
	player: Player = JSON.parse(<string>localStorage.getItem('user'))

	constructor(
		private afAuth: AngularFireAuth,
		private afs: AngularFirestore,
		private router: Router,
	) {
	}

	getUser(): Player {
		return this.player
		// return this.afs.collection<Player[]>('players').doc<Player>(this.player.id)
		// 	.snapshotChanges()
		// 	.pipe(map((player)=>{
		// 		return player;
		// 	})).toPromise()
	}

	async signIn(username: string) {
		const uid = uuidv4()
		await this.createUser({uid, name: username})
	}

	async signOut() {
		localStorage.removeItem('username')
		localStorage.removeItem('token')
		return this.router.navigate(['/'])
	}

	// @ts-ignore
	private async updateUserData(uid, name) {
		const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`)
		const data = {
			uid,
			name,
		}

		return userRef.set(data, {merge: true})
	}

	// @ts-ignore
	private async createUser({uid, name}) {

		const id = this.afs.createId()
		let data = {
			id,
			uid,
			name,
		}
		const docRef = await this.afs.collection('players').add(data)

		localStorage.setItem('user', JSON.stringify(data))
	}
}
