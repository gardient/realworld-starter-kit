import { WebComponent } from "components/web-component.base";

export class RouterOutletComponent extends WebComponent {
  public static readonly tag = "router-outlet";

  protected render(): string {
    return `<div id="router-outlet">router outlet initialized...</div>`;
  }
}

export default RouterOutletComponent;
