import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RoomComponent } from './room/room.component'
import { LoginComponent } from './login/login.component'
import { FormsModule } from '@angular/forms'
import { LayoutModule } from '../layout/layout.module'
import { HomeComponent } from './home/home.component'
import { ComponentsModule } from '../components/components.module'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { CardModule } from 'primeng/card'


@NgModule({
	declarations: [
		RoomComponent,
		LoginComponent,
		HomeComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		LayoutModule,
		ComponentsModule,
		ButtonModule,
		InputTextModule,
		CardModule,
	],
})
export class PagesModule {
}
