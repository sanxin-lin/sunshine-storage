export const validateKey = (key: unknown): string => {
  let _key = key;
  if (typeof _key !== 'string') {
    console.warn(`${_key} used as a key, but it is not a string.`);
    _key = String(key);
  }

  return _key as string;
};

export const binary2ArrayBuffer = (binary: string): ArrayBuffer => {
  const length = binary.length;
  const buf = new ArrayBuffer(length);
  const arr = new Uint8Array(buf);
  for (let i = 0; i < length; i++) {
    arr[i] = binary.charCodeAt(i);
  }
  return buf;
};
