import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { UserStats } from "../constants/models";

function createData(key: string, value: number) {
  return { key, value };
}

export default function StatsDataTable({ stats }: { stats: UserStats }) {
  const rows = [
    createData("Swims", stats.swimTotal.count),
    createData("Rides", stats.rideTotal.count),
    createData("Runs", stats.runTotal.count),
  ];

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Activity</TableCell>
            <TableCell align="right">Total count</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
