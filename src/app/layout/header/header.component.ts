import { Component, OnInit } from '@angular/core'
import { MenuItem } from 'primeng/api'
import { AuthService } from '../../services/auth.service'
import { Player } from '../../interfaces/Player'

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	items!: MenuItem[]
	player!: Player
	checked: boolean = true

	constructor(
		private authService: AuthService) {
	}

	ngOnInit(): void {
		this.player = this.authService.getUser()
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
		localStorage.setItem('spectate', `${this.checked}`)
	}
}
