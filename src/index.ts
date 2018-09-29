import { Core } from "core";

// we are using side effects so disable this tslint rule
// tslint:disable:no-unused-expression
class App {
  constructor() {
    new Core();
  }
}

new App();
// tslint:enable:no-unused-expression
