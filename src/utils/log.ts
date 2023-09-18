import pck from '../../package.json';

const PACKAGES_NAME = pck.name;
const PACKAGES_VERSION = pck.version;

export const log = (...args: any[]) => {
  console.log(`[${PACKAGES_NAME} ${PACKAGES_VERSION}]`, ...args);
};

export const warning = (msg: string) => {
  console.warn(`[${PACKAGES_NAME} ${PACKAGES_VERSION}] ${msg}`);
};

export const throwError = (msg: string) => {
  throw new Error(`[${PACKAGES_NAME} ${PACKAGES_VERSION}] ${msg}`);
};

export const safeExecute = (executor: any, errorHandler?: any) => {
  try {
    return executor();
  } catch (e) {
    warning(e as string);
    return errorHandler?.();
  }
};
