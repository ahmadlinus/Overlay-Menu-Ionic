import { Observable } from 'rxjs';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { OverlayMenuComponent } from './components/my-component';
import { MenuOpenDirective } from './directives/my-directive';
import {IonicModule} from "ionic-angular";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    // declare all components that your module uses
    OverlayMenuComponent,
    MenuOpenDirective
  ],
  exports: [
    // export the component(s) that you want others to be able to use
    OverlayMenuComponent,
    MenuOpenDirective
  ],
  imports: [IonicModule.forRoot(MyModule),
  BrowserAnimationsModule]
})
export class MyModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MyModule,
    };
  }
}

