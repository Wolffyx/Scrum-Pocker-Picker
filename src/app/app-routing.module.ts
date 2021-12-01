import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RoomComponent } from './pages/room/room.component'
import { LayoutComponent } from './layout/layout/layout.component'
import { LoginComponent } from './pages/login/login.component'
import { HomeComponent } from './pages/home/home.component'
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard'
import { redirectUnauthorizedTo } from '@angular/fire/auth-guard'

// function redirectUnauthorizedToLogin() {
// 	redirectUnauthorizedTo(['login'])
//
// }
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login'])
const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		canActivate: [AngularFireAuthGuard],
		children: [
			{path: '', component: HomeComponent},
			{path: 'room/:roomId', component: RoomComponent},
		],
		data: {authGuardPipe: redirectUnauthorizedToLogin},
	},
	{path: 'login', component: LoginComponent},
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {

}
