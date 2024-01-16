import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

interface ProfileRow {
  profileId: string;
  country: string;
  marketplace: string;
}

const columns: { id: keyof ProfileRow; label: string; minWidth?: number }[] = [
  { id: "profileId", label: "Profile ID", minWidth: 100 },
  { id: "country", label: "Country", minWidth: 170 },
  { id: "marketplace", label: "Marketplace", minWidth: 170 },
];

function ProfilesTable() {
  const navigate = useNavigate();
  const { accountId } = useParams<{ accountId: string }>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const data: ProfileRow[] = useMemo(
    () => [
      // Данные, зависящие от выбранного accountId
      { profileId: "1", country: "USA", marketplace: "Amazon" },
      { profileId: "2", country: "Canada", marketplace: "eBay" },
      { profileId: "3", country: "Ukraine ", marketplace: "Amazon" },
      { profileId: "4", country: "Africa", marketplace: "eBay" },
      // Дополнительные данные...
    ],
    [accountId]
  );

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
                  key={row.profileId}
                  onClick={() => navigate(`/campaigns/${row.profileId}`)}
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

export default ProfilesTable;
