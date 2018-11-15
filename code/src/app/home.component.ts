import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-home',
  template: `

    <ul>
      <li><a routerLink="/trackBy">TrackBy</a></li>
      <li><a routerLink="/changeDetection">Change Detection</a></li>
      <li><a routerLink="/ngZoneUnoptimized">NgZone Unoptimized</a></li>
      <li><a routerLink="/ngZoneOptimized">NgZone Optimized</a></li>
      <li><a routerLink="/computingValues">Computing Values</a></li>
      <li><a routerLink="/dynamicImport">Dynamic import</a></li>
      <li><a routerLink="/webWorker">Web Worker</a></li>
      <li><a routerLink="/intersectionObserver">Intersection Observer</a></li>
    </ul>
  `,
  styles: [
    'a {padding: 10px;}',
    '.static-header { z-index: 1001;}'
  ],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {

}
