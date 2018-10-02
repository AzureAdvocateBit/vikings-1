import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../../core';
import { openCloseAnimation } from '../../core/animations';
import { HeroService } from '../hero.service';

@Component({
  selector: 'vk-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  animations: [openCloseAnimation],
  })
export class HeroesComponent implements OnInit {
  selected: Hero;
  selectedHero: Hero;
  heroes$: Observable<Hero[]>;

  constructor(private heroService: HeroService) {
    this.heroes$ = heroService.entities$;
  }

  ngOnInit() {
    this.getHeroes();
  }

  add(hero: Hero) {
    this.heroService.add(hero);
  }

  clear() {
    this.selected = null;
  }

  close() {
    this.selected = null;
  }

  delete(hero: Hero) {
    this.heroService.delete(hero.id);
    this.close();
  }

  enableAddMode() {
    this.selected = <any>{};
  }

  getHeroes() {
    this.heroService.getAll();
    this.close();
  }

  select(hero: Hero) {
    this.selected = hero;
  }

  update(hero: Hero) {
    this.heroService.update(hero);
  }
}
