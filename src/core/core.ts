import components from "@components";

export class Core {
  private static inst: Core;

  constructor() {
    if (Core.inst == null) {
      Core.inst = this;
    } else {
      throw new Error("already instantiated, use Core.instance");
    }

    components.forEach((component) => {
      window.customElements.define(component.tag, component.constructor);
    });
  }

  public static get instance(): Core {
    return Core.inst;
  }
}
