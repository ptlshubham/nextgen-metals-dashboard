import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { LanguageService } from 'src/app/core/services/language.service';
import { LAYOUT_MODE } from 'src/app/layouts/layouts.model';
import { CookieService } from 'ngx-cookie-service';
import { EventService } from 'src/app/core/services/event.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-comingsoon',
  templateUrl: './comingsoon.component.html',
  styleUrls: ['./comingsoon.component.scss']
})

/**
 * ComingSoon Component
 */
export class ComingsoonComponent implements OnInit {
  mode: string | undefined;

  private _trialEndsAt: any;
  element: any;
  flagvalue: any;
  cookieValue: any;
  countryName: any;
  valueset: any;
  layoutMode!: string;

  /**
   * Language Listing
   */
   listLang = [
    { text: 'English', flag: 'assets/images/flags/us.jpg', lang: 'en' },
    { text: 'Spanish', flag: 'assets/images/flags/spain.jpg', lang: 'es' },
    { text: 'German', flag: 'assets/images/flags/germany.jpg', lang: 'de' },
    { text: 'Italian', flag: 'assets/images/flags/italy.jpg', lang: 'it' },
    { text: 'Russian', flag: 'assets/images/flags/russia.jpg', lang: 'ru' },
  ];

  @Output() settingsButtonClicked = new EventEmitter();
  constructor(
    public languageService: LanguageService,
    public _cookiesService: CookieService,
    private eventService: EventService,
    public translate: TranslateService,

  ) { }

  private _diff?: any;
  _days?: number;
  _hours?: number;
  _minutes?: number;
  _seconds?: number;

  ngOnInit(): void {
    // Date Set
    this._trialEndsAt = "2022-12-31";

    /**
     * Count date set
     */
    interval(1000).pipe(
      map((x) => {
        this._diff = Date.parse(this._trialEndsAt) - Date.parse(new Date().toString());
      })).subscribe((x) => {
        this._days = this.getDays(this._diff);
        this._hours = this.getHours(this._diff);
        this._minutes = this.getMinutes(this._diff);
        this._seconds = this.getSeconds(this._diff);
      });
    this.element = document.documentElement;
    this.layoutMode = LAYOUT_MODE;
    this.initialize();
    /***
     * Language value cookies wise set
     */
    this.cookieValue = this._cookiesService.get('lang');
    const val = this.listLang.filter(x => x.lang === this.cookieValue);
    this.countryName = val.map(element => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) { this.valueset = 'assets/images/flags/us.jpg'; }
    } else {
      this.flagvalue = val.map(element => element.flag);
    }
  }

  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }
  /***
   * Language Value Set
   */
  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.languageService.setLanguage(lang);
  }
    /**
   * Topbar Light-Dark Mode Change
   */
     changeMode(mode: string) {
      this.mode = mode;
      this.layoutMode = mode;
      this.eventService.broadcast('changeMode', mode);
    }
  
  /**
   * Day Set
   */
  getDays(t: number) {
    return Math.floor(t / (1000 * 60 * 60 * 24));
  }
   /**
   * Initialize
   */
    initialize(): void {
      // this.menuItems = MENU;
    }
  

  /**
   * Hours Set
   */
  getHours(t: number) {
    return Math.floor((t / (1000 * 60 * 60)) % 24);
  }

  /**
   * Minutes set
   */
  getMinutes(t: number) {
    return Math.floor((t / 1000 / 60) % 60);
  }

  /**
   * Secound set
   */
  getSeconds(t: number) {
    return Math.floor((t / 1000) % 60);
  }

  // Coin News Slider
  timelineCarousel: OwlOptions = {
    items: 1,
    loop: false,
    margin: 0,
    nav: false,
    navText: ["", ""],
    dots: true,
    responsive: {
      680: {
        items: 1
      },
    }
  }
}
