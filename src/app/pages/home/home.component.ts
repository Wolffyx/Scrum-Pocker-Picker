import { Component, OnInit } from '@angular/core'
import { RoomService } from '../../services/room.service'
import { AuthService } from '../../services/auth.service'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	user: any
	displayBasic?: boolean
	position?: string
	roomName = ''
	loading = false

	constructor(
		private pick: RoomService,
		private authService: AuthService,
		private titleService: Title,
		private route: ActivatedRoute,
	) {
	}

	async ngOnInit() {
		this.user = await this.authService.getUser()
		this.titleService.setTitle(this.route.snapshot.data['title'])
	}


	createRoom() {
		this.loading = true
		console.log(this.roomName)
		this.pick.create(this.roomName, this.user).finally(() => {
			this.loading = false
			this.displayBasic = false
		})
	}

	showBasicDialog() {
		this.displayBasic = true
	}

}
