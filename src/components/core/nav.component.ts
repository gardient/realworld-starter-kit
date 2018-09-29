import { WebComponent } from "@components/web-component.base";

class CoreNavComponent extends WebComponent {
  // private linkToHandler: Map<HTMLAnchorElement, () => void | boolean>;
  private signInLink: HTMLLIElement | null = null;
  private signUpLink: HTMLLIElement | null = null;
  private navUL: HTMLUListElement | null = null;

  constructor() {
    super();

    // this.linkToHandler = new Map<HTMLAnchorElement, () => void | boolean>();
  }

  protected render(): string {
    return `
      <nav class="navbar navbar-light">
        <div class="container">
            <a class="navbar-brand" href="#/" data-navigo >conduit</a>
            <ul class="nav navbar-nav pull-xs-right">
                <li class="nav-item">
                    <a href="#/" data-navigo class="nav-link">Home</a>
                </li>
                <li id="signin" class="nav-item">
                    <a href="#/login" data-navigo class="nav-link">Sign in</a>
                </li>
                <li id="signup" class="nav-item">
                    <a href="#/register" data-navigo class="nav-link">Sign up</a>
                </li>
            </ul>
        </div>
      </nav>`;
  }

  protected postRender() {
    this.navUL = this.querySelector("ul.nav.navbar-nav");

    this.signInLink = this.querySelector("#signin");
    this.signUpLink = this.querySelector("#signup");

    if (this.signInLink) {
      this.signInLink.addEventListener("click", () => this.userAuthernticated({ username: "name" }));
    }
  }

  private createNavItem(href: string, content: string, id?: string): HTMLLIElement {
    const element = document.createElement("li");
    element.classList.add("nav-item");
    if (id) { element.id = id; }

    const link = document.createElement("a");
    link.classList.add("nav-link");
    link.href = href;
    link.innerHTML = content;

    element.appendChild(link);

    return element;
  }

  private userAuthernticated(user: { username: string }) {
    this.removeGuestLinks();
    this.createProfileLinks(user);
  }

  private removeGuestLinks() {
    if (this.signInLink) { this.signInLink.remove(); }
    if (this.signUpLink) { this.signUpLink.remove(); }
  }

  private createProfileLinks({ username }: { username: string }) {
    if (this.navUL) {
      const newArticle = this.createNavItem("#/editor", '<i class="ion-compose"></i>&nbsp;New Post');
      this.navUL.appendChild(newArticle);

      const settings = this.createNavItem("#/settings", '<i class="ion-gear-a"></i>&nbsp;Settings');
      this.navUL.appendChild(settings);

      const userProfile = this.createNavItem("#/profile/" + username, username);
      this.navUL.appendChild(userProfile);
    }
  }
}

export default { tag: "core-nav", constructor: CoreNavComponent };
