import { useEffect } from 'react';

export function useEvents(
  obj: any,
  names: string[],
  callback: (e: any) => void
) {
  useEffect(() => {
    if (!obj) {
      return;
    }
    const handles = names.map(name => obj.on(name, callback));
    return function removeHandles() {
      handles.forEach(handle => {
        handle.remove();
      });
    };
  }, [obj, names, callback]);
}

export function useEvent(obj: any, name: string, callback: (e: any) => void) {
  useEvents(obj, [name], callback);
}

export function useWatches(obj: any, names: string[], callback: any) {
  useEffect(() => {
    if (!obj) {
      return;
    }
    const handles = names.map(name => obj.watch(name, callback));
    return function removeHandles() {
      handles.forEach(handle => {
        handle.remove();
      });
    };
  }, [obj, names, callback]);
}

export function useWatch(obj: any, name: string, callback: any) {
  useWatches(obj, [name], callback);
}
