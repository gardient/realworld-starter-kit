import { WebComponent } from "components/web-component.base";
import TagService from "services/tags.service";

export class PopularTagsComponent extends WebComponent {
  public static readonly tag = "popular-tags";

  private tagList: HTMLDivElement | null = null;

  constructor() {
    super();
  }

  protected render() {
    return `
    <div class="sidebar">
      <p>Popular Tags</p>
      <div id="tagList" class="tag-list">
        Loading tags ...
      </div>
    </div>`;
  }

  protected postRender() {
    this.tagList = this.querySelector("#tagList");

    TagService.getTags().then((tags) => {
      if (this.tagList) {
        while (this.tagList.firstChild) {
          this.tagList.firstChild.remove();
        }

        for (const tag of tags) {
          const tagEl = this.createTagElement(tag);

          tagEl.addEventListener("click", () => this.tagOnClick(tag));

          this.tagList.appendChild(tagEl);
        }
      }
    });
  }

  private tagOnClick(tag: string): void {
    const event = new CustomEvent("filter", { detail: tag });
    this.dispatchEvent(event);
  }

  private createTagElement(tag: string): HTMLAnchorElement {
    const tagEl = document.createElement("a");
    tagEl.classList.add("tag-pill", "tag-default");
    tagEl.innerHTML = tag;
    tagEl.href = "#/";
    tagEl.style.cursor = "pointer";
    return tagEl;
  }
}

export default PopularTagsComponent;
