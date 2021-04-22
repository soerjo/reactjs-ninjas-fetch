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
import { useState } from "react";
import { useHistory } from "react-router-dom";

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
  },
}))(TableRow);

export default function TableTamplate() {
  const [render, setrender] = useState(false);
  const { data, loading, err } = useFetch(
    "http://localhost:5000/peoples",
    render
  );

  const history = useHistory();

  const handleDelete = (id) => {
    fetch("http://localhost:5000/peoples/" + id, {
      method: "DELETE",
    })
      .then(() => {
        console.log("has been deleted");
        setrender(!render);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="table">
      {console.log("log dari render:", render)}
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
                <StyledTableRow key={person.id}>
                  <TableCell
                    style={{ cursor: "pointer" }}
                    onClick={() => history.push(`/detail/${person.id}`)}
                  >
                    {person.name}
                  </TableCell>
                  <TableCell>{person.email}</TableCell>
                  <TableCell>{person.phone}</TableCell>
                  <TableCell>
                    <button>
                      <EditIcon fontSize="small" />
                    </button>
                    <button onClick={() => handleDelete(person.id)}>
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
