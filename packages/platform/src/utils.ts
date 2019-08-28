export function clamp(n: number, lowerBound: number, upperBound: number) {
  return Math.min(Math.max(n, lowerBound), upperBound);
}

export function scheduleMicroTask(fn: Function) {
  Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
}
