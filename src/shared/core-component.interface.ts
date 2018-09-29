type htmlElementConstructor = () => HTMLElement;

export interface ICoreComponent {
  tag: string;
  constructor: htmlElementConstructor;
}
