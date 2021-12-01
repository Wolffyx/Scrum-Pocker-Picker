import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router'
import { Player } from '../interfaces/Player'
import { getAuth, onAuthStateChanged, signInAnonymously, updateProfile } from '@angular/fire/auth'
import { Auth } from '@firebase/auth'

@Injectable({
	providedIn: 'root',
})
export class AuthService {

	user!: any
	player: Player = JSON.parse(<string>localStorage.getItem('user'))
	roomID: string = ''
	private auth: Auth | any

	constructor(
		private afAuth: AngularFireAuth,
		private afs: AngularFirestore,
		private router: Router,
	) {
		this.auth = getAuth()
		onAuthStateChanged(this.auth, (user) => {
			this.user = user
			if (user) {
				console.log(user)
			}
		})
	}

	getUser() {
		return this.user
	}

	async signIn(name: string) {
		await signInAnonymously(this.auth)
			.then(async (user) => {
				await updateProfile(this.auth.currentUser, {
					displayName: name,
				})
				// console.log(user.user)
			})
			.catch((error) => {
				console.log(error)
				const errorCode = error.code
				const errorMessage = error.message
				// ...
			})
	}

	async signOut() {
		const auth = getAuth()
		console.log(auth)
		await auth.signOut()
		await this.router.navigateByUrl('/')
	}

	// @ts-ignore
	// private async updateUserData(uid, name) {
	// 	const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`)
	// 	const data = {
	// 		uid,
	// 		name,
	// 	}
	//
	// 	return userRef.set(data, {merge: true})
	// }


}
