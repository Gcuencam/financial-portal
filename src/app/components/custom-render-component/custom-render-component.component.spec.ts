import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRenderComponentComponent } from './custom-render-component.component';

describe('CustomRenderComponentComponent', () => {
  let component: CustomRenderComponentComponent;
  let fixture: ComponentFixture<CustomRenderComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomRenderComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomRenderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
