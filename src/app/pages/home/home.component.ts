import { Component, OnInit } from '@angular/core'
import { RoomService } from '../../services/room.service'
import { AuthService } from '../../services/auth.service'

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	user: any

	constructor(
		private pick: RoomService,
		private authService: AuthService,
	) {
	}

	async ngOnInit() {
		this.user = await this.authService.getUser()
	}


	createRoom() {
		this.pick.create('test', this.user)
	}
}
