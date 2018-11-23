import {Directive, HostListener, Input} from '@angular/core';
import { Events } from "ionic-angular";

/**
 * Generated class for the MenuOpenDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[menu-open]' // Attribute selector
})
export class MenuOpenDirective {

  constructor(private events: Events) {
  }

  // listening to onClick events on the host elements
  @HostListener('click') onClick(event: MouseEvent) {
    this.events.publish('overlayMenuToggle');
  }

}