import {Component, OnDestroy, OnInit} from '@angular/core'
import {lastValueFrom, Observable} from 'rxjs'
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore'
import {AngularFireDatabase} from '@angular/fire/compat/database'
import {RoomService} from '../../services/room.service'
import {AuthService} from '../../services/auth.service'
import {ActivatedRoute, Router} from '@angular/router'
import {Room} from '../../interfaces/Room'
import {RoomPlayer} from '../../interfaces/RoomPlayer'
import firebase from 'firebase/compat'
import {sumBy} from 'lodash'
import {animate, group, state, style, transition, trigger} from '@angular/animations'
import UserInfo = firebase.UserInfo;

@Component({
	selector: 'app-room',
	templateUrl: './room.component.html',
	styleUrls: ['./room.component.scss'],
	animations: [
		trigger('slideInOut', [
			state('in', style({
				height: '*',
				opacity: 0,
			})),
			transition(':leave', [
				style({
					height: '*',
					opacity: 1,
				}),

				group([
					animate(300, style({
						height: 0,
					})),
					animate('200ms ease-in-out', style({
						'opacity': '0',
					})),
				]),

			]),
			transition(':enter', [
				style({
					height: '0',
					opacity: 0,
				}),

				group([
					animate(300, style({
						height: '*',
					})),
					animate('400ms ease-in-out', style({
						'opacity': '1',
					})),
				]),

			]),
		]),
	],
})
export class RoomComponent implements OnInit, OnDestroy {

	roomID = <string>this.route.snapshot.paramMap.get('roomId')
	roomDocument: AngularFirestoreDocument<Room> = this.roomService.get(this.roomID)
	room?: Observable<Room | undefined>
	user!: UserInfo
	players?: Observable<RoomPlayer[]>
	cards = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]
	visible = false
	average = null

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
		const room = await this.roomDocument.valueChanges()
		if (room) {
			this.players = (this.roomService.joinUsers(this.roomDocument, this.user)).players
			this.room = room
		}

	}

	ngOnDestroy() {
		this.roomService.deleteUser(this.roomDocument, this.user)
	}

	chose(card: number) {
		const players = this.roomService.pickCard(this.roomDocument, this.user, card)
		return players
	}

	showCards() {
		this.roomDocument.update({
			showCards: true,
		})
	}

	averageSum(players: RoomPlayer[]) {
		// console.log(sumBy(players, 'card'))
		// console.log(players)
		// console.log(countBy(players,'card'))
		return players.length ? sumBy(players, 'card') / players.length : 0
	}

	resetBoard() {
		this.roomDocument.update({
			showCards: false,
			firstPick: false,
		})
		lastValueFrom(this.roomDocument.collection('players').get()).then((players) => {
			players.forEach((doc) => {
				console.log(doc.data())
				doc.ref.update({
					card: null,
				})
			})

		})
	}

	createChart() {
		let randomColor = Math.floor(Math.random() * 16777215).toString(16)
		console.log(randomColor)
	}
}
