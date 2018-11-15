import {Component, Input, OnInit} from '@angular/core';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

@Component({
  selector: '[unoptimizedBox]',
  template: `
    <svg:rect
      [attr.dataId]="unoptimizedBox.id"
      [attr.x]="unoptimizedBox.x"
      [attr.y]="unoptimizedBox.y"
      width="20"
      height="20"
      stroke="black"
      [attr.fill]="selected ? 'red' : 'transparent'"
      strokeWidth="1">
    </svg:rect>
  `
})
export class UnoptimizedBoxComponent {
  @Input() unoptimizedBox;
  @Input() selected;
}

@Component({
  selector: 'app-ngzone-unoptimized',
  template: `
    <svg width="550" height="550"
         (mousedown)="mouseDown($event)"
         (mousemove)="mouseMove($event)"
         (mouseup)="mouseUp($event)">
      <svg:g unoptimizedBox *ngFor="let box of boxes"[unoptimizedBox]="box" [selected]=" box.id == currentId"></svg:g>
    </svg>
  `
})
export class NgzoneUnoptimizedComponent implements OnInit {

  currentId = null;
  boxes = [];
  offsetX;
  offsetY;

  ngOnInit() {
    for (let i = 0; i < 10000; i++) {
      const id = i;
      const x = getRandomInt(0, 500);
      const y = getRandomInt(0, 500);
      const box = {
        id,
        x,
        y
      };
      this.boxes.push(box);
    }
  }

  mouseDown(event) {
    const id = Number(event.target.getAttribute('dataId'));
    const box = this.boxes[id];
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    this.offsetX = box.x - mouseX;
    this.offsetY = box.y - mouseY;
    this.currentId = id;
  }

  mouseMove(event) {
    event.preventDefault();
    if (this.currentId !== null) {
      this.updateBox(this.currentId, event.clientX + this.offsetX, event.clientY + this.offsetY);
    }
  }

  mouseUp($event) {
    this.currentId = null;
  }

  updateBox(id, x, y) {
    const box = this.boxes[id];
    box.x = x;
    box.y = y;
  }

}
