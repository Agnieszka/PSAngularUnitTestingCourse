import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HeroesComponent} from "./heroes.component";
import {HeroService} from "../hero.service";
import {HeroComponent} from "../hero/hero.component";
import {of} from "rxjs";
import {By} from "@angular/platform-browser";
import {Directive, Input} from "@angular/core";
import {HeroDetailComponent} from "../hero-detail/hero-detail.component";

@Directive({
  selector: '[routerLink]',
  host: {'(click)': 'onClick()'}
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;

  navigateTo: any = null;

  onClick() {
    this.navigateTo = this.linkParams;
  }
}


describe('HeroesComponent (deep tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>
  let mockHeroService: any;
  let HEROES;

  beforeEach(() => {
    HEROES = [
      {id: 1, name: 'SpiderDude', strength: 8},
      {id: 2, name: 'Wonderful Woman', strength: 24},
      {id: 3, name: 'SuperDude', strength: 55},
    ];

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        HeroComponent,
        RouterLinkDirectiveStub,
      ],
      providers: [
        {provide: HeroService, useValue: mockHeroService},
      ],
      // schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });


  it('should render each hero as a HeroComponent', function () {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();  //run ngOnInit
    const heroComponentsDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

    expect(heroComponentsDEs.length).toEqual(3);

    for (let i = 0; i < heroComponentsDEs.length; i++) {
      expect(heroComponentsDEs[i].componentInstance.hero).toEqual(HEROES[i]);
    }
  });

  it(`should call heroService.deleteHero when the HeroComponent's delete button is clicked (version 1)`, function () {
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();

    // trigger event on element
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    heroComponents[0].query(By.css('button'))
      .triggerEventHandler('click', {
        stopPropagation: () => {
        }
      });

    expect(fixture.componentInstance.delete).toHaveBeenCalled();
  });

  it(`should call heroService.deleteHero when the HeroComponent\'s delete button is clicked (version 2)`, function () {
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();

    // emit event from child component
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);

    expect(fixture.componentInstance.delete).toHaveBeenCalled();
  });

  it(`should call heroService.deleteHero when the HeroComponent\'s delete button is clicked (version 3)`, function () {
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();

    // rising event on child directive
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    heroComponents[0].triggerEventHandler('delete', null);

    expect(fixture.componentInstance.delete).toHaveBeenCalled();
  });

  it('should add a new hero to the hero list when the add button is clicked', function () {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const name = 'Mr. Ice';
    mockHeroService.addHero.and.returnValue(of({id: 5, name: name, strength: 4}));
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

    inputElement.value = name; // simulates typing
    addButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
    expect(heroText).toContain(name);
  });

  it('should have the correct route for the first hero', function () {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

    let routerLink = heroComponents[0].query(By.directive(RouterLinkDirectiveStub)).injector.get(RouterLinkDirectiveStub);

    heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);

    expect(routerLink.navigateTo).toBe('/detail/1');
  });


});
