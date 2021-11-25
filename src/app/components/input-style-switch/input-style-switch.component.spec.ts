import { ComponentFixture, TestBed } from '@angular/core/testing'

import { InputStyleSwitchComponent } from './input-style-switch.component'

describe('InputStyleSwitchComponent', () => {
	let component: InputStyleSwitchComponent
	let fixture: ComponentFixture<InputStyleSwitchComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [InputStyleSwitchComponent],
		})
			.compileComponents()
	})

	beforeEach(() => {
		fixture = TestBed.createComponent(InputStyleSwitchComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
