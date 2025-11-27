import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ativar } from './ativar';

describe('Ativar', () => {
  let component: Ativar;
  let fixture: ComponentFixture<Ativar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ativar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ativar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
