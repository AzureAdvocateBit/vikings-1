import {
  Component, EventEmitter, Input, Output, ChangeDetectionStrategy,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Hero, ModalComponent } from '../../core';
import { flyInOutAnimation, staggerListAnimation } from '../../core/animations';

@Component({
  selector: 'vk-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
  animations: [flyInOutAnimation, staggerListAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
  })
export class HeroListComponent {
  @Input() heroes: Hero[];
  @Input() selectedHero: Hero;
  @Output() deleted = new EventEmitter<Hero>();
  @Output() selected = new EventEmitter<Hero>();

  constructor(public dialog: MatDialog) {}

  byId(hero: Hero) {
    return hero.id;
  }

  onSelect(hero: Hero) {
    this.selected.emit(hero);
  }

  deleteHero(hero: Hero) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '250px';
    dialogConfig.data = {
      title: 'Delete Hero',
      message: `Do you want to delete ${hero.name}`,
    };

    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((deleteIt) => {
      console.log('The dialog was closed');
      if (deleteIt) {
        this.deleted.emit(hero);
      }
    });
  }
}
