import {async, ComponentFixture, fakeAsync, flush, TestBed} from "@angular/core/testing";
import {HeroDetailComponent} from "./hero-detail.component";
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../hero.service";
import {Location} from '@angular/common';
import {of} from "rxjs";
import {FormsModule} from "@angular/forms";

describe('HeroDetailComponent', () => {

  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockActivatedRoute, mockHeroService, mockLocation;

  beforeEach(() => {

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return '3';
          }
        }
      }
    }
    mockHeroService = jasmine.createSpyObj( ['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: Location, useValue: mockLocation},
        {provide: HeroService, useValue: mockHeroService},
      ],
    });
    fixture = TestBed.createComponent(HeroDetailComponent);

    mockHeroService.getHero.and.returnValue(of({id: 3, name: 'SuperDude', strength: 100}));
  });

  it('should render hero name in a h2 tag', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
  });

/*
  it('should call updateHero when save is called (using fake async)', fakeAsync((function () {
    mockHeroService.updateHero.and.returnValue(of());
    fixture.detectChanges();

    fixture.componentInstance.save();
    // tick(250);  // to wait
    flush(); // means: go ahead and fast forward the clock until any waiting tasks have been executed.
    // for most of the cases it is more handy
    expect(mockHeroService.updateHero).toHaveBeenCalled();
  })));
*/

  it('should call updateHero when save is called (using  async)', async((function () {
    mockHeroService.updateHero.and.returnValue(of());
    fixture.detectChanges();

    fixture.componentInstance.save2();

    fixture.whenStable().then(() => {
      expect(mockHeroService.updateHero).toHaveBeenCalled();
    });
  })));

});
