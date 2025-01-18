import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentDtComponent } from './parent-dt.component';

describe('ParentDtComponent', () => {
  let component: ParentDtComponent;
  let fixture: ComponentFixture<ParentDtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentDtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentDtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
