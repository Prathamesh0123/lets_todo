import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTodosComponent } from './card-todos.component';

describe('CardTodosComponent', () => {
  let component: CardTodosComponent;
  let fixture: ComponentFixture<CardTodosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardTodosComponent]
    });
    fixture = TestBed.createComponent(CardTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
