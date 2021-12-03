import { Component, OnDestroy, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { RoomService } from '../../services/room.service'
import { AuthService } from '../../services/auth.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Room } from '../../interfaces/Room'
import { RoomPlayer } from '../../interfaces/RoomPlayer'

@Component({
	selector: 'app-room',
	templateUrl: './room.component.html',
	styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit, OnDestroy {

	title = 'scrumPokerPicker'
	items!: Observable<any>
	room$!: Observable<Room>
	room!: AngularFirestoreDocument<Room>
	user = JSON.parse(<string>localStorage.getItem('user'))
	players!: Observable<RoomPlayer[]>
	roomID = <string>this.route.snapshot.paramMap.get('roomId')
	cards = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]
	visible = false
	average = null
	spectate = localStorage.getItem('spectate')

	constructor(
		private firestore: AngularFirestore,
		private db: AngularFireDatabase,
		private roomService: RoomService,
		private authService: AuthService,
		private router: Router,
		private route: ActivatedRoute,
	) {
	}

	async ngOnInit() {
		this.user = await this.authService.getUser()
		this.room = this.roomService.get(this.roomID)
		// @ts-ignore
		this.room$ = await this.room.valueChanges()
		this.players = this.roomService.joinUsers(this.room, this.user, this.roomID)

	}

	ngOnDestroy() {
		this.roomService.deleteUser(this.room, this.user)
	}

	chose(card: number) {
		const players = this.roomService.pickCard(this.room, this.user, card)
		return players
	}

	showCards() {
		this.room.collection('players').get().toPromise().then((players) => {
			players.forEach((doc) => {
				this.average = this.average + doc.data().card
				console.log(doc.data())
				doc.ref.update({
					visible: true,
				})
			})
			this.room.update({
				// @ts-ignore
				average: this.average / players.size,
			})
			// @ts-ignore
			console.log(this.average / players.size)
		})
	}

}
