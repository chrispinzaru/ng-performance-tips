import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TrackbyComponent} from 'src/app/tips/trackby.component';
import {ChangeDetectionComponent} from 'src/app/tips/change-detection.component';
import {NgzoneUnoptimizedComponent} from 'src/app/tips/ngzone-unoptimized.component';
import {ComputingValuesComponent} from 'src/app/tips/computing-values.component';
import {NgzoneOptimizedComponent} from 'src/app/tips/ngzone-optimized.component';
import {DynamicImportComponent} from 'src/app/tips/dynamic-import.component';
import {WebworkerComponent} from 'src/app/tips/webworker.component';
import {IntersectionObserverComponent} from 'src/app/tips/intersection-observer.component';
import {HomeComponent} from 'src/app/home.component';

const routes: Routes = [
  {
    path: '',
    // redirectTo: '/admin',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'trackBy',
    component: TrackbyComponent
  },
  {
    path: 'changeDetection',
    component: ChangeDetectionComponent
  },
  {
    path: 'ngZoneUnoptimized',
    component: NgzoneUnoptimizedComponent
  },
  {
    path: 'ngZoneOptimized',
    component: NgzoneOptimizedComponent
  },
  {
    path: 'computingValues',
    component: ComputingValuesComponent
  },
  {
    path: 'dynamicImport',
    component: DynamicImportComponent
  },
  {
    path: 'webWorker',
    component: WebworkerComponent
  },
  {
    path: 'intersectionObserver',
    component: IntersectionObserverComponent
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canLoad: [/*AuthGuard*/]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
