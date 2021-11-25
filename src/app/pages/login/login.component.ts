import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'
import { Location } from '@angular/common'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

	username: string = ''
	returnUrl: string = ''

	constructor(
		private router: Router,
		private authService: AuthService,
		private location: Location,
		private route: ActivatedRoute,
	) {
	}

	ngOnInit(): void {
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
	}

	async login() {
		console.log(this.username)
		await this.authService.signIn(this.username)
		await this.router.navigateByUrl(this.returnUrl)
	}
}
