export interface WidgetMeta {
  name: string;
  attrs: Map<string, string>;
  events: Map<string, string>;
  skipAddToDom: boolean;
}
