import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router'
import { Player } from '../interfaces/Player'
import { getAuth, onAuthStateChanged, signInAnonymously, updateProfile } from '@angular/fire/auth'
import { Auth } from '@firebase/auth'
import firebase from 'firebase/compat'
import { BehaviorSubject } from 'rxjs'
import UserInfo = firebase.UserInfo

@Injectable({
	providedIn: 'root',
})
export class AuthService {

	user?: UserInfo
	// @ts-ignore
	user$: BehaviorSubject<UserInfo> = new BehaviorSubject<UserInfo>(null)
	player: Player = JSON.parse(<string>localStorage.getItem('user'))
	roomID: string = ''
	auth: Auth | any

	constructor(
		private afAuth: AngularFireAuth,
		private afs: AngularFirestore,
		private router: Router,
	) {
		this.auth = getAuth()
		onAuthStateChanged(this.auth, (user) => {
			user ? this.user = user : console.log('User not logged in!')
			// if (user) {
			// 	this.user$.next(user)
			// 	this.user = user
			// }
		})
	}

	getUser() {
		// return this.user$.value
		return this.user as UserInfo
	}

	async signIn(name: string) {
		const user = await signInAnonymously(this.auth)
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
		// @ts-ignore
		this.user$.next(null)
		await this.router.navigateByUrl('/login')
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
