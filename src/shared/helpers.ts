export const isNullOrUndefined = <T>(
  value: T | null | undefined
): value is null | undefined => {
  return value === null || value === undefined;
};

export const isNotNullOrUndefined = <T>(
  value: T | null | undefined
): boolean => {
  return !(value === null || value === undefined);
};

export const isNotEmpty = <T extends any[] | string | null | undefined>(
  value: T
  // @ts-ignore
): boolean => isNotNullOrUndefined(value) && value.length > 0;

export const isEmpty = <T extends any[] | string | null | undefined>(
  value: T
): boolean => !isNotEmpty(value);
