import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HeroesComponent} from "./heroes.component";
import {HeroService} from "../hero.service";
import {of} from "rxjs";
import {Component, Input} from "@angular/core";
import {Hero} from "../hero";
import {By} from "@angular/platform-browser";


@Component({
  selector: 'app-hero',
  template: '<div></div>'
})
export class FakeHeroComponent {
  @Input() hero: Hero;
  // @Output() delete = new EventEmiter();
}

describe('HeroesComponent (shallow tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    HEROES = [
      {id: 1, name: 'SpiderDude', strength: 8},
      {id: 2, name: 'Wonderful Woman', strength: 24},
      {id: 3, name: 'SuperDude', strength: 55},
    ];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])
    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        FakeHeroComponent,
      ],
      providers: [
        {provide: HeroService, useValue: mockHeroService},
      ],
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should set correctly from the service', function () {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges(); // run ngOnInit

    expect(fixture.componentInstance.heroes.length).toBe(3);
  });

  it('should create one li for each hero', function () {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges(); // run ngOnInit

    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
  });

});
