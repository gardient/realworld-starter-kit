export abstract class WebComponent extends HTMLElement {
  private attributeToCallbackMap: Map<string, (oldValue: any, newValue: any) => void>;

  constructor() {
    super();

    this.attributeToCallbackMap = new Map<string, (oldValue: any, newValue: any) => void>();
  }

  public get observedAttributes() {
    return [...this.attributeToCallbackMap.keys()];
  }

  public attributeChangedCallback(attributeName: string, oldValue: any, newValue: any): void {
    if (newValue) {
      const callback = this.attributeToCallbackMap.get(attributeName);
      if (callback) {
        callback(oldValue, newValue);
      }
    }
  }

  public subscribeToAttribute(
    name: string,
    callback: (oldValue: any, newValue: any) => void,
  ): { unsubscribe: () => void } {
    this.attributeToCallbackMap.set(name, callback);

    return {
      unsubscribe: () => {
        this.attributeToCallbackMap.delete(name);
      },
    };
  }

  public disconnectedCallback() {
    return;
  }

  public connectedCallback() {
    this.preRender();
    this.innerHTML = this.render();
    this.postRender();
  }

  protected preRender(): void { return; }
  protected postRender(): void { return; }
  protected abstract render(): string;
}
