import { Component, Input, OnInit } from '@angular/core'
import { RoomPlayer } from '../../interfaces/RoomPlayer'

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
	number?: number = undefined
	@Input('player') player!: RoomPlayer

	constructor() {
	}

	ngOnInit(): void {
	}

}
