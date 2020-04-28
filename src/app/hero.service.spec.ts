import {TestBed} from "@angular/core/testing";
import {HeroService} from "./hero.service";
import {MessageService} from "./message.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('HeroService', () => {
  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let heroService: HeroService;
  let messageService: MessageService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add'])
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        HeroService,
        {provide: MessageService, useValue: mockMessageService},
      ],
    });

    httpTestingController = TestBed.get(HttpTestingController);
    heroService = TestBed.get(HeroService);
    messageService = TestBed.get(MessageService);
  });

  it('should  call get with the correct URL', function () {
    heroService.getHero(4).subscribe();
    // heroService.getHero(5).subscribe();
    const req = httpTestingController.expectOne('api/heroes/4');
    req.flush({id: 4, name: 'SuperDude', strength: 100});
    httpTestingController.verify(); // makes sure no unexpected request were make. there was only one request to getHero.
  });
});
