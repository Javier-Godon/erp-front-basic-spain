import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofOfDeliveryListComponent } from './proof-of-delivery-list.component';

describe('ProofOfDeliveryListComponent', () => {
  let component: ProofOfDeliveryListComponent;
  let fixture: ComponentFixture<ProofOfDeliveryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProofOfDeliveryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProofOfDeliveryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
