export type ReactRef<T> =
  | React.Ref<T>
  | React.RefObject<T>
  | React.MutableRefObject<T>
  | React.LegacyRef<T>;

export const mergeRefs = <T>(...refs: (ReactRef<T> | undefined)[]) => {
  return (value: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        // @ts-ignore
        (ref as React.MutableRefObject<T>).current = value;
      }
    });
  };
};
