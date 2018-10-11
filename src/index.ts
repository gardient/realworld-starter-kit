import { Core } from "core";
import RouterHandler from "routing/router-handler";
import Authentication from "services/authentication.service";

// we are using side effects so disable this tslint rule
// tslint:disable:no-unused-expression
class App {
  constructor() {
    new Authentication();
    new Core();
    const router = new RouterHandler();
    router.init();
  }
}

new App();
// tslint:enable:no-unused-expression
