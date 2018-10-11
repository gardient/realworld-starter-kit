import components from "components";
import RouterOutletComponent from "routing/router-outlet.component";

export class Core {
  private static inst: Core;

  constructor() {
    if (Core.inst == null) {
      Core.inst = this;
    } else {
      throw new Error("already instantiated, use Core.instance");
    }

    [...components, RouterOutletComponent].forEach((component) => {
      // we have to assert to any here because tsc does not like treating imported types as constructors
      window.customElements.define(component.tag, component);
    });
  }

  public static get instance(): Core {
    return Core.inst;
  }
}
