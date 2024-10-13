import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundraiserDetailComponent } from './fundraiser-detail.component';

describe('FundraiserDetailComponent', () => {
  let component: FundraiserDetailComponent;
  let fixture: ComponentFixture<FundraiserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FundraiserDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundraiserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
