export interface IWebComponent {
  observedAttributes: string[];
  attributeChangedCallback: (attributeName: string, oldValue: any, newValue: any) => void;
}

export class WebComponent extends HTMLElement implements IWebComponent {
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
}
