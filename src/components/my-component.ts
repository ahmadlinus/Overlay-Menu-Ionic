import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Events } from "ionic-angular";

@Component({
  selector: 'overlay-menu',
  template: '<div #menu [@menuOpening]="menuHidden ? \'closed\' : \'open\'" class="custom-menu">\n' +
  '  <div class="items">\n' +
  '    <button #closeButton ion-button icon-only clear class="menu-close-button" (click)="closeMenu()" icon-start>\n' +
  '      <ion-icon name="close"></ion-icon>\n' +
  '    </button>\n' +
  '    <h4 style="margin-left: 5%" *ngFor="let item of menuItems" (click)="selectItem(item)">\n' +
  '      {{item}}\n' +
  '    </h4>\n' +
  '  </div>\n' +
  '</div>',
  animations: [
    trigger('menuOpening', [
      state('open', style({
        opacity: 0.85,
        visibility: 'visible',
        height: '100%'
      })),
      state('closed', style({
        opacity: 0,
        visibility: 'hidden',
        height: '0'
      })),
      transition('* => *', animate('.5s'))
    ])
  ], styles: ['    .custom-menu {\n' +
  '        position: fixed;\n' +
  '        width: 100%;\n' +
  '        height: 100%;\n' +
  '        background: red;\n' +
  '        opacity: 0;\n' +
  '        visibility: hidden;\n' +
  '        z-index: 20;\n' +
  '        top: 0;\n' +
  '        left: 0;\n' +
  '        color: white;\n' +
  '        font-size: 13px;\n' +
  '        overflow: scroll;  // scroll when the categories exceed the limit\n' +
  '\n' +
  '        .menu-close-button {\n' +
  '          width: 5px;\n' +
  '          margin-bottom: 0;\n' +
  '        }\n' +
  '      }']
})
export class OverlayMenuComponent {
  @Input('items') menuItems: string[];
  @Input('settings') settings: any;

  @Output() handleSelection: EventEmitter<any> = new EventEmitter<any>();

  // whether or not the menu is hidden
  public menuHidden: boolean = true;

  @ViewChild('menu', {read: ElementRef}) menuLayer: ElementRef;
  @ViewChild('closeButton', {read: ElementRef}) closeButton: ElementRef;

  constructor(private events: Events,
              private renderer: Renderer2) {
  }

  ngOnInit() {
    console.log(this.menuLayer);
    let color = this.settings['color'];
    // setting default value
    if (!color) 
      color = '#4286f4';
    // setting the input style
    this.renderer.setStyle(this.menuLayer.nativeElement, 'background-color', color);
    this.renderer.setStyle(this.closeButton.nativeElement, 'background-color', color);

    // listening to open/close events
    this.events.subscribe('overlayMenuToggle', () => {
      this.openCustomMenu();
    });
  }

  public openCustomMenu(): void {
    // toggle menu animation state
    this.menuHidden = !this.menuHidden;
  }

  public closeMenu(): void {
    if (!this.menuHidden)
      this.menuHidden = true;
  }

  public selectItem(item: any): void {
    // emitting an output event to handle selection of an item
    this.handleSelection.emit(item);
  }

}
