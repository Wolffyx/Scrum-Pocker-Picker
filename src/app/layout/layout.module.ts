import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'
import { ContentComponent } from './content/content.component'
import { LayoutComponent } from './layout/layout.component'
import { RouterModule } from '@angular/router'
import { CardModule } from 'primeng/card'
import { MenubarModule } from 'primeng/menubar'
import { InputSwitchModule } from 'primeng/inputswitch'
import { FormsModule } from '@angular/forms'


@NgModule({
	declarations: [
		HeaderComponent,
		FooterComponent,
		ContentComponent,
		LayoutComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		CardModule,
		MenubarModule,
		InputSwitchModule,
		FormsModule,
	],
	exports: [
		HeaderComponent,
	],
})
export class LayoutModule {
}
