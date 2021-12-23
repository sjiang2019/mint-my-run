import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { ReadableActivity } from "../constants/models";

interface Row {
  key: string;
  value: number | string;
  unit: string;
}

function createRow(key: string, value: number | string, unit: string): Row {
  return { key, value, unit };
}

function createRows(readableActivity: ReadableActivity): Array<Row> {
  return [
    createRow("Time", readableActivity.duration, "HH:MM:SS"),
    createRow(
      "Max speed",
      readableActivity.maxSpeed.value,
      readableActivity.maxSpeed.unit
    ),
    createRow(
      "Average speed",
      readableActivity.averageSpeed.value,
      readableActivity.averageSpeed.unit
    ),
    createRow(
      "Total elevation gain",
      readableActivity.totalElevationGain.value,
      readableActivity.totalElevationGain.unit
    ),
    createRow(
      "Elevation (high)",
      readableActivity.elevationHigh.value,
      readableActivity.elevationHigh.unit
    ),
    createRow(
      "Elevation (low)",
      readableActivity.elevationLow.value,
      readableActivity.elevationLow.unit
    ),
  ];
}

export default function ActivityDataTable({
  readableActivity,
}: {
  readableActivity: ReadableActivity;
}) {
  const rows = createRows(readableActivity);
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Metric</TableCell>
            <TableCell align="right">Stat</TableCell>
            <TableCell align="left">Unit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.key}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.key}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
              <TableCell align="left">{row.unit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
