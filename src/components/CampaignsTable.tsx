import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useParams } from "react-router-dom";

interface CampaignRow {
  campaignId: string;
  clicks: number;
  cost: string;
  date: string;
}

const columns: { id: keyof CampaignRow; label: string; minWidth?: number }[] = [
  { id: "campaignId", label: "Campaign ID", minWidth: 100 },
  { id: "clicks", label: "Clicks", minWidth: 170 },
  { id: "cost", label: "Cost", minWidth: 170 },
  { id: "date", label: "Date", minWidth: 170 },
];

function CampaignsTable() {
  const { profileId } = useParams<{ profileId: string }>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const data: CampaignRow[] = useMemo(
    () => [
      // Пример данных, которые могут зависеть от profileId
      // Вставьте реальные данные здесь, например:
      { campaignId: "1", clicks: 100, cost: "100.00", date: "2022-03-01" },
      { campaignId: "2", clicks: 150, cost: "150.00", date: "2022-03-02" },
      { campaignId: "3", clicks: 1300, cost: "1300.00", date: "2022-03-01" },
      { campaignId: "4", clicks: 1250, cost: "1250.00", date: "2022-03-02" },
      // Добавьте дополнительные данные по вашему усмотрению
    ],
    [profileId]
  );

  // Измените тип события для handleChangeRowsPerPage
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement> // Изменение типа события
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.campaignId}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return <TableCell key={column.id}>{value}</TableCell>;
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 16px", // Добавленные стили
        }}
      >
        <div>1–4 of 4</div>
        <div>
          <span>Количество строк на странице:</span>
          <select
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            style={{ marginLeft: "8px" }}
          >
            {[10, 25, 100].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Paper>
  );
}

export default CampaignsTable;
