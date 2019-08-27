export type WithProperties<P> = {
  [property in keyof P]: P[property];
};

declare global {
  interface HTMLWindowElement {
    test: string;
  }
  const HTMLWindowElement: {
    prototype: HTMLWindowElement;
    new (): HTMLWindowElement;
  };

  interface HTMLViewElement {}
  const HTMLViewElement: {
    prototype: HTMLViewElement;
    new (): HTMLViewElement;
  };

  interface HTMLElementTagNameMap {
    Window: HTMLWindowElement;
    View: HTMLViewElement;
  }
}
