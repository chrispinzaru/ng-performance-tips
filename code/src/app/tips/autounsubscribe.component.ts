import {Component, OnDestroy, OnInit} from '@angular/core';
import {AutoUnsubscribe} from 'src/app/decorators/autounsubscribe';
import {interval, Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@AutoUnsubscribe()
@Component({
  selector: 'app-autounsubscribe',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AutounsubscribeComponent implements OnInit, OnDestroy {

  private destroyed$ = new Subject<void>();

  private ticks$ = interval(1000);
  private one: Subscription;

  constructor() {
    const source = interval(1000);
    this.one = source.subscribe(data => {
      // do something
    });
  }

  public ngOnInit() {
    this.ticks$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(data => console.log(data));
  }

  // This method must be present, even if empty.
  ngOnDestroy() {
    // You can also do whatever you need here

    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
