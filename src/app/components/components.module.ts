import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './login/login.component'
import { CardComponent } from './card/card.component'
import { ConfigComponent } from './config/config.component'
import { InputStyleSwitchComponent } from './input-style-switch/input-style-switch.component'
import { InputSwitchModule } from 'primeng/inputswitch'
import { FormsModule } from '@angular/forms'
import { CardModule } from 'primeng/card'

@NgModule({
	declarations: [
		LoginComponent,
		CardComponent,
		ConfigComponent,
		InputStyleSwitchComponent,
	],
	imports: [
		CommonModule,
		InputSwitchModule,
		FormsModule,
		CardModule,
	],
	exports: [
		CardComponent,
		ConfigComponent,
	],
})
export class ComponentsModule {
}
