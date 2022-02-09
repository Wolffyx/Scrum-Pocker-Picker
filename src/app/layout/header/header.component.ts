import { Component, OnInit } from '@angular/core'
import { MenuItem } from 'primeng/api'
import { AuthService } from '../../services/auth.service'
import { ActivatedRoute } from '@angular/router'
import { RoomService } from '../../services/room.service'
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore'
import { Room } from '../../interfaces/Room'

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	items!: MenuItem[]
	player!: any
	checked: boolean = false
	roomID = ''
	room!: AngularFirestoreDocument<Room>

	constructor(
		private authService: AuthService,
		private route: ActivatedRoute,
		private roomService: RoomService) {
	}

	async ngOnInit() {
		this.roomID = this.route.snapshot.children[0].params.roomId
		this.player = this.authService.getUser()
		this.room = this.roomService.get(this.roomID)
		this.checked = await this.roomService.checkIfIsSpectator(this.room, this.player)
		this.items = [
			{
				label: 'File',
				items: [{
					label: 'New',
					icon: 'pi pi-fw pi-plus',
					items: [
						{label: 'Project'},
						{label: 'Other'},
					],
				},
					{label: 'Open'},
					{label: 'Quit'},
				],
			},
			{
				label: 'Edit',
				icon: 'pi pi-fw pi-pencil',
				items: [
					{label: 'Delete', icon: 'pi pi-fw pi-trash'},
					{label: 'Refresh', icon: 'pi pi-fw pi-refresh'},
				],
			},
		]
	}

	spectate() {
		this.roomService.spectate(this.room, this.player, this.checked)
		// localStorage.setItem('spectate', `${this.checked}`)
	}
	async logout() {
		await this.authService.signOut()
	}
}
