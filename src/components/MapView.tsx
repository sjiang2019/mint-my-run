import {
  LatLngBounds,
  latLngBounds,
  LatLngExpression,
  LatLngTuple,
  Map,
  PointExpression,
} from "leaflet";
import React, { useMemo } from "react";
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
        zoom={13}
        scrollWheelZoom={false}
        bounds={bounds}
        boundsOptions={{ padding: [20, 20] as PointExpression }}
        whenCreated={props.onCreateMap}
      >
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        />
        <Polyline
          pathOptions={{ color: STRAVA_ORANGE }}
          positions={decodedPolyline}
        />
      </MapContainer>
    </>
  );
}
