import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {TrackbyComponent} from 'src/app/tips/trackby.component';
import {ChangeDetectionComponent, InstructorListComponent} from 'src/app/tips/change-detection.component';
import {NgzoneUnoptimizedComponent, UnoptimizedBoxComponent} from 'src/app/tips/ngzone-unoptimized.component';
import {ComputingValuesComponent} from 'src/app/tips/computing-values.component';
import {NgzoneOptimizedComponent, OptimizedBoxComponent} from 'src/app/tips/ngzone-optimized.component';
import {DynamicImportComponent} from 'src/app/tips/dynamic-import.component';
import {WebworkerComponent} from 'src/app/tips/webworker.component';
import {IntersectionObserverComponent} from 'src/app/tips/intersection-observer.component';
import {DeferLoadDirective} from 'src/app/directives/deferload.directive';
import {HomeComponent} from 'src/app/home.component';

const COMPONENTS = [
  HomeComponent,
  TrackbyComponent,
  ChangeDetectionComponent,
  NgzoneUnoptimizedComponent,
  NgzoneOptimizedComponent,
  ComputingValuesComponent,
  DynamicImportComponent,
  WebworkerComponent,
  IntersectionObserverComponent,

  InstructorListComponent,
  UnoptimizedBoxComponent,
  OptimizedBoxComponent,
];

const DIRECTIVES = [
  DeferLoadDirective
];

@NgModule({
  declarations: [
    AppComponent,

    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
