import path from 'path';
import process from 'process';
import * as R from 'ramda';

export function getConfig(argv) {
  const defaults = {
    url: 'https://www.google.com/',
    hooks: path.resolve(process.cwd(), 'fuzzmonkey.hooks.mjs')
  };
  return {
    ...defaults,
    ...argv,
    hooks: argv.hooks ? path.resolve(argv.hooks) : defaults.hooks
  };
}

export async function getHooks(filepath) {
  const defaults = {
    create: R.identity,
    destroy: R.identity
  };

  try {
    return {
      ...defaults,
      ...(await import(filepath))
    };
  } catch {
    return defaults;
  }
}
