import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './app.component'
import {HTTP_PROVIDERS} from 'angular2/http'
import {enableProdMode} from 'angular2/core';

enableProdMode(); // to use in productino mode. "Disable Angular's development mode, which turns off assertions and other checks within the framework."


bootstrap(AppComponent, [HTTP_PROVIDERS]);
//bootstrap(AppComponent);