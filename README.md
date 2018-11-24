[![NPM version](https://badge.fury.io/js/overlay-menu-ionic.svg?style=flat)](https://www.npmjs.com/package/overlay-menu-ionic)

# Introduction

This repository contains a component for creating an overlay menu component. It comes with a directive which makes it possible for 
any element to trigger a menu open/close functionality easily, so it's very easy to re-use troughout any application. 
<p>
<a href="url"><img src="https://i.makeagif.com/media/11-01-2018/U4HBrU.gif" height="425" width="250" ></a>
</p>

# How to Use

This package is available in NPM, so you can just easily install the package from npm: 

```
npm i overlay-menu-ionic --save
```

## IMPORTANT WARNING: Before You Begin
This component uses Angular animations, which are only available in Ionic through a polyfill. That has been taken care of by the component imports; however, you need to add the following line to **main.ts** of your app, otherwise the menu animation would not be performed: 

```
import 'web-animations-js/web-animations.min';
```

## Adding The Modules

Below you can see a glimpse of **app.module.ts**. The *OverlayMenuModule* is the module which wraps both the component and the directive, and after this you will be able to use them seamlessly in your project. 

```typescript
import { OverlayMenuModule } from "overlay-menu-ionic";

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    // menu module
    OverlayMenuModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
```

## Adding Menu Element and Feeding Parameters

You have to add the menu to the contents of **app.html**. That's where the content of menu belongs. Also, you have to add the corresponding items you want to have shown in the menu as component parameters, and there is also the possibility of adding some settings about the component.

```html
<overlay-menu [items]="menuItems" [settings]="menuSettings" (handleSelection)="handleSelection($event)"></overlay-menu>
```

With the **app.html** above, you will need the corresponding variables in **app.component.ts**, as shown in the example below: 

```typescript
  // items to be shown in the menu
  menuItems: string[] = ['item1', 'item2'];
  
  // tuning menu style with settings
  menuSettings = {color: '#4286f4'};
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
```  

### Handling Events 

In case any item is tapped, a **handleSelection** will be emitted, for which a callback can be called to take care of the event. Such callback can be specified in **app.html** and implemented like below in **app.component.ts**:

```typescript
handleSelection(itemSelected: any) {
    console.log('item selected ' + itemSelected);
}
```

## Adding the Directive

In order to trigger the menu, one needs to add the directive to any element which is supposed to open the menu. The functionality is somehow like the default *menuToggle* directive of Ionic, which enables buttons and elements to toggle menus. The directive can be added to any element in any page but you may need to add the directive as imports in the corresponding page. 

In the example code, this piece was added to the page **home.html** in the navbar section: 

```html
<ion-buttons left>
    <button ion-button icon-only menu-open>
        <ion-icon name="menu"></ion-icon>
    </button>
</ion-buttons>
```
