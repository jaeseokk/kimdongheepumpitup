import * as React from "react";
import { RefAttributes } from "react";
import { flattenChildren } from "./flatten-children";
import { mergeRefs } from "./merge-refs";

export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, ...slotProps }, slotRef) => {
    const childrenArray = flattenChildren(children).filter(
      React.isValidElement
    );

    if (childrenArray.length !== 1) {
      return React.Children.only(null);
    }

    const childrenOnly = childrenArray[0] as React.ReactElement &
      RefAttributes<any>;

    return React.cloneElement(childrenOnly, {
      ...mergeProps(slotProps, childrenOnly.props as any),
      ...(childrenOnly.ref || slotRef
        ? { ref: mergeRefs(slotRef, childrenOnly.ref) }
        : {}),
    });
  }
);

Slot.displayName = "Slot";

/**
 * slot props 와 child props 를 병합합니다.
 *
 * event handler(prop 이름이 `on~` 인 것들)는 child -> slot 순서로 재구성됩니다.
 * `style` prop 은 slot props 에서 child props 로 병합됩니다.
 * `className` prop 은 slot props 에서 child props 로 병합됩니다. (`String.prototype.join` 을 사용합니다.)
 *
 * @param slotProps
 * @param childProps
 */
function mergeProps(
  slotProps: Record<string, any>,
  childProps: Record<string, any>
) {
  const mergedProps: Record<string, any> = { ...slotProps, ...childProps };

  const eventHandlerNames = Object.keys(mergedProps).filter((propName) =>
    /^on[A-Z]/.test(propName)
  );

  for (const eventHandlerName of eventHandlerNames) {
    mergedProps[eventHandlerName] = (...args: any) => {
      slotProps[eventHandlerName]?.(...args);
      return childProps[eventHandlerName]?.(...args);
    };
  }

  if (slotProps.style) {
    mergedProps.style = { ...slotProps.style, ...childProps.style };
  }

  if (slotProps.className) {
    mergedProps.className = [slotProps.className, childProps.className].join(
      " "
    );
  }

  return mergedProps;
}
