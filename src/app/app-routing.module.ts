import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RoomComponent } from './pages/room/room.component'
import { LayoutComponent } from './layout/layout/layout.component'
import { AuthGuard } from './guards/auth.guard'
import { LoginComponent } from './pages/login/login.component'
import { HomeComponent } from './pages/home/home.component'

const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		canActivate: [AuthGuard],
		children: [
			{path: '', component: HomeComponent},
			{path: 'room/:roomId', component: RoomComponent},
		],
	},
	{path: 'login', component: LoginComponent},
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {
}
