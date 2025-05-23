import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectListComponent } from './object-list.component';

describe('ObjectListComponent', () => {
  let component: ObjectListComponent;
  let fixture: ComponentFixture<ObjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjectListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
