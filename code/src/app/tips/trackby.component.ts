import {Component} from '@angular/core';

@Component({
  selector: 'app-trackby',
  template: `
    <ul>
      <li *ngFor="let item of collection; trackBy: trackByFn">{{item.id}}</li>
    </ul>
    <button (click)="getItems()">Refresh items</button>
  `,
  styles: [``]
})
export class TrackbyComponent {

  collection = null;

  constructor() {
    this.collection = [{id: 1}, {id: 2}, {id: 3}];
  }

  getItems() {
    this.collection = this.getItemsFromServer();
  }

  getItemsFromServer() {
    return [{id: 1}, {id: 2}, {id: 3}, {id: 4}];
  }

  trackByFn(index, item) {
    return index; // or item.id
  }

}
