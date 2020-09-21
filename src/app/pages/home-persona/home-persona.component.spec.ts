import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePersonaComponent } from './home-persona.component';

describe('HomePersonaComponent', () => {
  let component: HomePersonaComponent;
  let fixture: ComponentFixture<HomePersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
