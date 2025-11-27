import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Senha } from './senha';

describe('Senha', () => {
  let component: Senha;
  let fixture: ComponentFixture<Senha>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Senha]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Senha);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
