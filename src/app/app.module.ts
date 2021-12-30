import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { environment } from '../environments/environment'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ComponentsModule } from './components/components.module'
import { PagesModule } from './pages/pages.module'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { LayoutModule } from './layout/layout.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { providePerformance,getPerformance } from '@angular/fire/performance'

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		AngularFireDatabaseModule,
		AngularFireAuthModule,
		BrowserAnimationsModule,
		// NbThemeModule.forRoot({name: 'dark'}),
		// NbLayoutModule,
		// NbEvaIconsModule,
		// NbToastrModule.forRoot(),
		ComponentsModule,
		PagesModule,
		LayoutModule,
  provideFirebaseApp(() => initializeApp(environment.firebase)),
  provideAnalytics(() => getAnalytics()),
  provideAuth(() => getAuth()),
  provideDatabase(() => getDatabase()),
  provideFirestore(() => getFirestore()),
  providePerformance(() => getPerformance()),
	],
	providers: [
    ScreenTrackingService,UserTrackingService
  ],
	bootstrap: [AppComponent],
})
export class AppModule {
}
