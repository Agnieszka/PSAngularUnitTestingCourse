import {HeroComponent} from "./hero.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {By} from "@angular/platform-browser";

// schemas: [NO_ERRORS_SCHEMA]
// TestBed.configureTestingModule(...) - set needed imports, declarations etc here
// TestBed.createComponent(...);
// fixture.componentInstance - access to components methods
// fixture.nativeElement - root DOM element
// fixture.debugElement - nativeElement wrapper, you can uee it i.e. to find directive like ComponentHero in DOM
// fixture.detectChanges()

describe('HeroComponent (shallow tests)', () => {
  let fixture: ComponentFixture<HeroComponent>
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA], // hide errors from unknown attributes RISKY!!!
    });
    fixture = TestBed.createComponent(HeroComponent);
  });

  it('should have the correct hero', function () {
    fixture.componentInstance.hero = {id: 1, name: 'SuperDude', strength: 3};

    expect(fixture.componentInstance.hero.name).toEqual('SuperDude');
  });

  it('should render the hero name in an anchor tag', function () {
    fixture.componentInstance.hero = {id: 1, name: 'SuperDude', strength: 3};
    fixture.detectChanges(); // run change detection

    expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperDude');

    // here is the same with debugElement
    let deA = fixture.debugElement.query(By.css('a'));
    expect(deA.nativeElement.textContent).toContain('SuperDude');
  });

});
