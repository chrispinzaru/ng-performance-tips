import {Component} from '@angular/core';

@Component({
  selector: 'app-computingvalues',
  template: `

    <table>

      <!-- Wrong -->
      <tr *ngFor="let skill of skills">{{calcSomething(skill)}}</tr>

    </table>

  `,
  styles: []
})
export class ComputingValuesComponent {

  skills = [
    {
      name: 'Skill 1',
      percentage: 30
    },
    {
      name: 'Skill 2',
      percentage: 40
    },
    {
      name: 'Skill 3',
      percentage: 60
    }
  ];

  constructor() {

    /*

    If the value is not changed dynamically at runtime, a better solution would be to:

    1. Use pure pipes — Angular executes a pure pipe only when it detects a pure change to the input value.
    2. Creates a new property and set the value once, for example:

    this.skills = this.skills.map(skill => ({...skill, percentage: this.calcSomething(skill)}));

     */

    setTimeout(() => this.skills.push({
      name: 'Skill 4',
      percentage: 40
    }), 4000);
  }

  calcSomething(skill) {
    console.log(JSON.stringify(skill), ' is calculating');
    return skill.percentage + 10;
  }

}
