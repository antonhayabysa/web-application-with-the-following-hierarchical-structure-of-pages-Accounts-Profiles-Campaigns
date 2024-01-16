import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface AccountRow {
  accountId: string;
  email: string;
  authToken: string;
  creationDate: string;
}

const columns: { id: keyof AccountRow; label: string; minWidth?: number }[] = [
  { id: "accountId", label: "Account ID", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "authToken", label: "Auth Token", minWidth: 170 },
  { id: "creationDate", label: "Creation Date", minWidth: 170 },
];

const rows: AccountRow[] = [
  {
    accountId: "1",
    email: "user1@example.com",
    authToken: "token1",
    creationDate: "2022-01-01",
  },
  {
    accountId: "2",
    email: "user2@example.com",
    authToken: "token2",
    creationDate: "2022-02-01",
  },
  {
    accountId: "3",
    email: "user3@example.com",
    authToken: "token3",
    creationDate: "2022-03-01",
  },
  {
    accountId: "4",
    email: "user4@example.com",
    authToken: "token4",
    creationDate: "2022-04-01",
  },
  // Дополнительные записи...
];

function AccountsTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState<keyof AccountRow>("accountId");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const navigate = useNavigate();

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<{
      value: string | number;
    }> // Указываем тип события для select
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSort = (property: keyof AccountRow) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedRows = rows.slice().sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === "asc" ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <Paper style={{ marginBottom: "16px" }}>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : "asc"}
                    onClick={() => handleSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.accountId}
                  onClick={() => navigate(`/profiles/${row.accountId}`)}
                  style={{ cursor: "pointer" }}
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

export default AccountsTable;
