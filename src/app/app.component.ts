import {Component, HostListener, OnInit} from '@angular/core'
import {PrimeNGConfig} from "primeng/api";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

	constructor(private primengConfig: PrimeNGConfig) {

	}

	@HostListener('window:beforeunload')
	doSomething() {
		alert("asdasdasd");
	}

	ngOnInit() {
		this.primengConfig.ripple = true;

	}
}
