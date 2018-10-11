import HomePageComponent from "components/pages/home.component";
import WebComponent from "components/web-component.base";
import Navigo = require("navigo");

// redeclare this because navigo doesn't export them
export type Params = { [k in string]: any };

interface IRoute {
  path: string;
  resolve: new (params?: any) => WebComponent;
  canActivate?(params?: Params): boolean;
}

export class RouterHandler {
  public static get instance(): RouterHandler {
    return RouterHandler.inst;
  }

  private static inst: RouterHandler;

  private static inject(component: WebComponent) {
    const outlet = document.querySelector("router-outlet");
    if (outlet) {
      while (outlet.firstChild) {
        outlet.removeChild(outlet.firstChild);
      }
      outlet.appendChild(component);
    }
  }

  public router: Navigo;

  constructor() {
    if (RouterHandler.inst == null) {
      RouterHandler.inst = this;
    } else {
      throw new Error("already instantiated, use Core.instance");
    }

    const root = null;
    const useHash = true;
    const hash = "#";
    this.router = new Navigo(root, useHash, hash);
  }

  public init() {
    // we will have to tell tsc that those constructors are of any type so that it doesn't complain
    const routes: IRoute[] = [
      { path: "/", resolve: HomePageComponent },
    ];

    this.router.on(() => RouterHandler.inject(new HomePageComponent())).resolve();

    for (const route of routes) {
      this.router.on(
        route.path,
        (params) => RouterHandler.inject(new (route.resolve)(params)),
        {
          before: (done, params) => {
            if (route.canActivate) {
              if (route.canActivate(params)) {
                done();
              } else {
                this.router.navigate("/");
                done(false);
              }
            } else {
              done();
            }
          },
        },
      ).resolve();
    }
  }
}

export default RouterHandler;
