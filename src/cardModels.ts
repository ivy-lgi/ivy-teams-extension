/**
 * Adaptive Card data model. Properties can be referenced in an adaptive card via the `${var}`
 * Adaptive Card syntax.
 */
export interface NewTask {
  kind: string;
  name: string;
  description: string;
  start: string;
  expiry: string;
  activator: string;
  priority: string;
  state: string;
  link: string;
}

export interface Starts {
  starts: any[];
}
