import {Component} from '@angular/core';

@Component({
  selector: 'app-dynamic-import',
  template: `

    <button (click)="exportToExcel()">Export</button>

  `,
  styles: []
})
export class DynamicImportComponent {


  exportToExcel() {
    import('xlsx').then(xlsx => {
      // JUST USE THE LIBRARY
      console.log(xlsx);
    });
  }
}
