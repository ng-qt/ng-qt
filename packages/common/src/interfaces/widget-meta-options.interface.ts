export interface WidgetMetaOptions {
  name?: string;
  attrs?: Record<string, string>;
  events?: Record<string, string>;
  skipAddToDom?: boolean;
}
