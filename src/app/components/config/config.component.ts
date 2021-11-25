import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { DomHandler } from 'primeng/dom'
import { AppConfigService } from '../../services/app-config.service'
import { AppConfig } from '../../interfaces/AppConfig'

@Component({
	selector: 'app-config',
	templateUrl: './config.component.html',
	styleUrls: ['./config.component.scss'],
})
export class ConfigComponent implements OnInit, OnDestroy {
	active?: boolean

	scale: number = 14
	scales: number[] = [12, 13, 14, 15, 16]

	outsideClickListener: any

	config: AppConfig = {}

	subscription?: Subscription

	constructor(private el: ElementRef, private router: Router, private configService: AppConfigService) {
	}

	ngOnInit() {
		this.config = this.configService.config
		this.subscription = this.configService.configUpdate$.subscribe((config: any) => {
			this.config = config
			if (this.config.theme === 'nano')
				this.scale = 12
			else
				this.scale = 14

			this.applyScale()
		})

		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.active = false
			}
		})

		if (this.config?.theme === 'nano')
			this.scale = 12
	}

	toggleConfigurator(event: Event) {
		this.active = !this.active
		event.preventDefault()

		if (this.active)
			this.bindOutsideClickListener()
		else
			this.unbindOutsideClickListener()
	}

	hideConfigurator(event: Event) {
		this.active = false
		this.unbindOutsideClickListener()
		event.preventDefault()
	}

	changeTheme(event: Event, theme: string, dark: boolean) {
		let themeElement = document.getElementById('theme-link')
		// @ts-ignore
		themeElement.setAttribute('href', themeElement.getAttribute('href').replace(this.config.theme, theme))
		this.configService.updateConfig({...this.config, ...{theme, dark}})
		event.preventDefault()
	}

	onRippleChange() {
		// @ts-ignore
		this.configService.updateConfig(this.config)
		if (this.config?.ripple)
			DomHandler.removeClass(document.body, 'p-ripple-disabled')
		else
			DomHandler.addClass(document.body, 'p-ripple-disabled')
	}

	bindOutsideClickListener() {
		if (!this.outsideClickListener) {
			this.outsideClickListener = (event: any) => {
				if (this.active && this.isOutsideClicked(event)) {
					this.active = false
				}
			}
			document.addEventListener('click', this.outsideClickListener)
		}
	}

	unbindOutsideClickListener() {
		if (this.outsideClickListener) {
			document.removeEventListener('click', this.outsideClickListener)
			this.outsideClickListener = null
		}
	}

	isOutsideClicked(event: any) {
		return !(this.el.nativeElement.isSameNode(event.target) || this.el.nativeElement.contains(event.target))
	}

	decrementScale() {
		this.scale--
		this.applyScale()
	}

	incrementScale() {
		this.scale++
		this.applyScale()
	}

	applyScale() {
		document.documentElement.style.fontSize = this.scale + 'px'
	}

	ngOnDestroy() {
		if (this.subscription) {
			this.subscription.unsubscribe()
		}
	}
}
