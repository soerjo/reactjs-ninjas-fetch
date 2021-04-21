import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import "./index.css";
import useFetch from "../../useFetch";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    cursor: "default",
  },
}))(TableRow);

export default function TableTamplate() {
  const { data, loading, err } = useFetch("http://localhost:5000/peoples");
  const [benar, setBenar] = useState(true);
  const history = useHistory();

  return (
    <div className="table">
      {loading && (
        <div className="circular">
          <CircularProgress />
        </div>
      )}
      {err && <h4>{err}</h4>}
      {data && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Phone Number</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((person) => (
                <StyledTableRow
                  key={person.id}
                  onClick={() => benar && history.push(`/detail/${person.id}`)}
                  style={{ textDecoration: "none" }}
                >
                  <TableCell>{person.name}</TableCell>
                  <TableCell>{person.email}</TableCell>
                  <TableCell>{person.phone}</TableCell>
                  <TableCell>
                    <button
                      onMouseEnter={() => setBenar(false)}
                      onMouseLeave={() => setBenar(true)}
                      onClick={() => history.push(`/create`)}
                    >
                      <EditIcon fontSize="small" />
                    </button>
                    <button
                      onMouseEnter={() => setBenar(false)}
                      onMouseLeave={() => setBenar(true)}
                      onClick={() => history.push(`/create`)}
                    >
                      <DeleteIcon fontSize="small" />
                    </button>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
