import {
  LatLngBounds,
  latLngBounds,
  LatLngExpression,
  LatLngTuple,
  Map,
  PointExpression,
} from "leaflet";
import { useMemo } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";

import { STRAVA_ORANGE } from "../constants/styles";

var polyUtil = require("polyline-encoded");

interface MapViewProps {
  polyline: string;
  onCreateMap?: (map: Map) => void;
}

function createMapBounds(polyline: Array<LatLngTuple>): LatLngBounds {
  const bounds = latLngBounds(polyline[0] as unknown as LatLngExpression[]); // seemed to work without having to pass init arg
  polyline.forEach((coords: LatLngTuple) => {
    bounds.extend(coords);
  });
  return bounds;
}

export default function MapView(props: MapViewProps): JSX.Element {
  var decodedPolyline = polyUtil.decode(props.polyline);
  const bounds = useMemo(() => {
    return createMapBounds(decodedPolyline);
  }, [decodedPolyline]);

  return (
    <>
      <MapContainer
        id={"map"}
        style={{
          height: "400px",
          width: "100%",
          borderRadius: "6px",
          marginTop: "16px",
        }}
        zoom={14}
        scrollWheelZoom={false}
        bounds={bounds}
        boundsOptions={{ padding: [20, 20] as PointExpression }}
        whenCreated={props.onCreateMap}
      >
        <TileLayer
          // Watercolor map view option
          // url="http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg"
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Polyline
          pathOptions={{ color: STRAVA_ORANGE }}
          positions={decodedPolyline}
        />
      </MapContainer>
    </>
  );
}
