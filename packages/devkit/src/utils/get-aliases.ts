import { BuildOptions } from '../builders/build/build-options.interface';

export function getAliases(options: BuildOptions): Record<string, string> {
  return options.fileReplacements.reduce(
    (aliases, replacement) => ({
      ...aliases,
      [replacement.replace]: replacement.with,
    }),
    {},
  );
}
