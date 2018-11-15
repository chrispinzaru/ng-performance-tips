import {Component} from '@angular/core';
import {WebworkerService} from 'src/app/services/webworker.service';


export class ResultsModel {
  constructor(
    public number: number,
    public result: number
  ) {
  }
}

export class ExecutionResultsModel {
  constructor(
    public executionResults: ResultsModel[],
    public executions: number,
    public executionTime: number,
    public scheduleTime: number) {
  }
}

// These functions are defined here:
// https://github.com/Microsoft/TypeScript/blob/master/lib/lib.webworker.d.ts
// Easiest way to be able to use the Web workers API on our TypeScript files is to declare
// the specific API functions we want to use according to:
// https://github.com/Microsoft/TypeScript/issues/20595#issuecomment-351030256
declare function postMessage(message: any): void;

export const FACTORIAL_SCRIPT = (input) => {
  const factorial = (inpt: number, partialResult: number) => {
    if (inpt === 0 || inpt === 1) {
      return partialResult;
    } else {
      return factorial(inpt - 1, partialResult * inpt);
    }
  };

  const runnerResult = {
    executions: 0,
    results: [],
    time: 0
  };

  const startTime = Date.now();
  for (let execution = 1; execution <= input.maxFactorial; execution++) {
    const result = factorial(execution, 1);
    runnerResult.executions++;
    runnerResult.results.push({number: execution, result});
  }

  // Force slow the execution
  let x = 0;
  while (x < 10000000000) {
    x++;
  }

  const endTime = Date.now();
  runnerResult.time = (endTime - startTime) / 1000;

  if (input.worker) {
    postMessage(runnerResult);
  } else {
    return runnerResult;
  }
};

@Component({
  selector: 'app-webworker',
  template: `

    <div>
      <button  (click)="factorialWithWorker()">Factorial with worker</button>
    </div>
    <div>
      <button  (click)="factorialWithoutWorker()">Factorial without worker</button>
    </div>
    <div class="results-container">
      <div>
        <p><b>Web worker results</b></p>
        <p>Schedule time: {{ workerResults.scheduleTime }} ms</p>
        <p>Execution time: {{ workerResults.executionTime }} ms</p>
        <p>Number of executions: {{ workerResults.executions }}</p>
        <!--<p>Results:</p>-->
        <!--<p *ngFor="let result of workerResults.executionResults">-->
          <!--<i>{{ result.number }}</i>: {{ result.result }}-->
        <!--</p>-->
      </div>
      <div>
        <p><b>Non web worker results</b></p>
        <p>Schedule time: {{ nonWorkerResults.scheduleTime }} ms</p>
        <p>Execution time: {{ nonWorkerResults.executionTime }} ms</p>
        <p>Number of executions: {{ nonWorkerResults.executions }}</p>
        <!--<p>Results:</p>-->
        <!--<p *ngFor="let result of nonWorkerResults.executionResults">-->
          <!--<i>{{ result.number }}</i>: {{ result.result }}-->
        <!--</p>-->
      </div>
    </div>

  `,
  styles: []
})
export class WebworkerComponent {

  public maxFactorial = 100;
  public nonWorkerResults = new ExecutionResultsModel([], 0, 0, 0);
  public workerResults = new ExecutionResultsModel([], 0, 0, 0);

  constructor(private workerService: WebworkerService) {
  }

  public factorialWithWorker() {
    this.workerResults = new ExecutionResultsModel([], 0, 0, 0);
    const startTime = Date.now();

    const input = {
      host: window.location.host,
      maxFactorial: this.maxFactorial,
      path: window.location.pathname,
      protocol: window.location.protocol,
      worker: true
    };

    this.workerService.run(FACTORIAL_SCRIPT, input).then(
      (result) => {
        this.workerResults.executionResults = result.results;
        this.workerResults.executions = result.executions;
        this.workerResults.executionTime = result.time;
      }
    ).catch(console.error);

    const endTime = Date.now();
    this.workerResults.scheduleTime = (endTime - startTime) / 1000;
  }

  public factorialWithoutWorker() {
    this.nonWorkerResults = new ExecutionResultsModel([], 0, 0, 0);
    const startTime = Date.now();

    const input = {
      host: window.location.host,
      maxFactorial: this.maxFactorial,
      path: window.location.pathname,
      protocol: window.location.protocol,
      worker: false
    };

    const result = FACTORIAL_SCRIPT(input);
    this.nonWorkerResults.executionResults = result.results;
    this.nonWorkerResults.executions = result.executions;
    this.nonWorkerResults.executionTime = result.time;

    const endTime = Date.now();
    this.nonWorkerResults.scheduleTime = (endTime - startTime) / 1000;
  }
}
