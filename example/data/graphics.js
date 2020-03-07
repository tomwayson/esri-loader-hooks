// these come from
// https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=intro-graphics

var point = {
  type: "point", // autocasts as new Point()
  longitude: -49.97,
  latitude: 41.73
};

// Create a symbol for drawing the point
var markerSymbol = {
  type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
  color: [226, 119, 40],
  outline: {
    // autocasts as new SimpleLineSymbol()
    color: [255, 255, 255],
    width: 2
  }
};

// First create a line geometry (this is the Keystone pipeline)
var polyline = {
  type: "polyline", // autocasts as new Polyline()
  paths: [[-111.3, 52.68], [-98, 49.5], [-93.94, 29.89]]
};

// Create a symbol for drawing the line
var lineSymbol = {
  type: "simple-line", // autocasts as SimpleLineSymbol()
  color: [226, 119, 40],
  width: 4
};

// Create an object for storing attributes related to the line
var lineAtt = {
  Name: "Keystone Pipeline",
  Owner: "TransCanada",
  Length: "3,456 km"
};

// Create a polygon geometry
var polygon = {
  type: "polygon", // autocasts as new Polygon()
  rings: [[-64.78, 32.3], [-66.07, 18.45], [-80.21, 25.78], [-64.78, 32.3]]
};

// Create a symbol for rendering the graphic
var fillSymbol = {
  type: "simple-fill", // autocasts as new SimpleFillSymbol()
  color: [227, 139, 79, 0.8],
  outline: {
    // autocasts as new SimpleLineSymbol()
    color: [255, 255, 255],
    width: 1
  }
};

export const pointGraphicJson = {
  geometry: point,
  symbol: markerSymbol
};

export const polylineGraphicJson = {
  geometry: polyline,
  symbol: lineSymbol,
  attributes: lineAtt,
  popupTemplate: {
    // autocasts as new PopupTemplate()
    title: "{Name}",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "Name"
          },
          {
            fieldName: "Owner"
          },
          {
            fieldName: "Length"
          }
        ]
      }
    ]
  }
};

export const polygonGraphicJson = {
  geometry: polygon,
  symbol: fillSymbol
};
