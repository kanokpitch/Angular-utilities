import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteTemplateComponent } from './autocomplete-template.component';

describe('AutocompleteTemplateComponent', () => {
  let component: AutocompleteTemplateComponent;
  let fixture: ComponentFixture<AutocompleteTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
