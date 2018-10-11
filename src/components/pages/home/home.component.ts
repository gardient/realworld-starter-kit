import { WebComponent } from "../../web-component.base";

export class HomePageComponent extends WebComponent {
  public static tag = "page-home";

  constructor() {
    super();
  }

  protected render(): string {
    return `
    <div>
      <core-banner></core-banner>
      <div class="container page">
        <div class="row">
          <div class="col-md-9">
            <div class="feed-toggle">
              <ul id="feedOptions" class="nav nav-pills outline-active">
                <li class="nav-item">
                  <a id="your-feed" class="nav-link active" href="">Your Feed</a>
                </li>
                <li class="nav-item">
                  <a id="globalFeedButton" href="#" class="nav-link">Global Feed</a>
                </li>
              </ul>
            </div>
            <div id="globalFeed">
              <span>Loading articles ...</span>
            </div>
          </div>
          <div class="col-md-3">
            <popular-tags></popular-tags>
          </div>
        </div>
        <nav>
          <ul class="pagination">
            <li class="page-item active">
              <a class="page-link" href="">1</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="">2</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>`;
  }
}

export default HomePageComponent;
