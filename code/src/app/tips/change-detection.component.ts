import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';

@Component({
  selector: 'app-change-detection',
  template: `
    <app-instructors-list [instructors]="instructors"></app-instructors-list>
    <button (click)="insertOne()">Insert Another Instructor</button>
  `,
  styles: [``],
})
export class ChangeDetectionComponent {
  instructors = ['Instructor 1', 'Instructor 2', 'Instructor 3'];

  insertOne() {
    this.instructors.push('Instructor n');
  }
}

@Component({
  selector: 'app-instructors-list',
  template: `
    <ul>
      <li *ngFor="let instructor of instructors">
        {{ instructor }}
      </li>
    </ul>
  `,
  styles: [``],
})
export class InstructorListComponent implements AfterViewInit {

  // Suppose this time the instructor list doesn't change after it arrives
  @Input() instructors = [];


  constructor(private cdr: ChangeDetectorRef) {
  }

  // Wait until the view inits before disconnecting
  ngAfterViewInit() {
    // Since we know the list is not going to change
    // let's request that this component not undergo change detection at all
    this.cdr.detach();


    // setInterval(() => this.cdr.detectChanges(), 5000);

  }

  // Angular provides additional controls such as the following
  // if the situation allows

  // Request a single pass of change detection for the application
  // this.cdr.markForCheck();

  // Request a single pass of change detection for just this component
  // this.cdr.detectChanges();

  // Connect this component back to the change detection process
  // this.cdr.reattach();

}
