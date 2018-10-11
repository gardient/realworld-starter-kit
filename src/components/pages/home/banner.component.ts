import { WebComponent } from "components/web-component.base";

export class BannerComponent extends WebComponent {
  public static readonly tag = "core-banner";

  constructor() {
    super();
  }

  protected render() {
    return `
    <div class="banner">
      <div class="container">
          <h1 class="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
      </div>
    </div>`;
  }
}

export default BannerComponent;
