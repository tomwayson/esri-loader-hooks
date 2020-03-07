import { useEffect } from 'react';
import { loadModules } from 'esri-loader';

export function useGraphics(view: any, jsonGraphics: any[]) {
  useEffect(() => {
    if (!view || !jsonGraphics) {
      return;
    }

    let graphics: any[];
    loadModules(['esri/Graphic']).then(([Graphic]) => {
      graphics = jsonGraphics.map(jsonGraphic => new Graphic(jsonGraphic));
      view.graphics.addMany(graphics);
    });
    return function removeGraphics() {
      view && view.graphics.removeMany(graphics);
    };
  }, [view, jsonGraphics]);
}

export function useGraphic(view: any, jsonGraphic: any) {
  return useGraphics(view, [jsonGraphic]);
}
