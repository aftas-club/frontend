import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuryLayoutComponent } from './jury-layout.component';

describe('JuryLayoutComponent', () => {
  let component: JuryLayoutComponent;
  let fixture: ComponentFixture<JuryLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuryLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JuryLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
