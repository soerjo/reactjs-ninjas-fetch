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
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import "./index.css";
import Edit from "../Edit";

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
  const [edit, setEdit] = useState(false);
  const [data, setdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataEdit, setDataEdit] = useState();
  const [err, setErr] = useState("");

  useEffect(() => {
    const abortCon = new AbortController();

    setTimeout(() => {
      fetch("http://localhost:5000/peoples", { signal: abortCon.signal })
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch the data for that resource!");
          }
          return res.json();
        })
        .then((datajson) => {
          setLoading(false);
          // console.log("dari fetch loading is: ", loading);
          setdata(datajson);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            setLoading(false);
            setErr(err.message);
          }
        });
    }, 1000);
    return () => abortCon.abort();
  }, [loading]);

  const history = useHistory();

  const handleDelete = (id) => {
    fetch("http://localhost:5000/peoples/" + id, {
      method: "DELETE",
    })
      .then(() => {
        console.log("has been deleted");
        setdata();
        setLoading(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleEdit = (data) => {
    setEdit(true);
    setDataEdit(data);
  };

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
                    <button onClick={() => handleEdit(person)}>
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
      {data === false && loading === false && (
        <p className="dataKosong"> Datanya kosong ....</p>
      )}
      {edit && (
        <Edit
          person={dataEdit}
          isOpen={edit}
          setupOpen={setEdit}
          setLoading={setLoading}
          setData={setdata}
        />
      )}
    </div>
  );
}
