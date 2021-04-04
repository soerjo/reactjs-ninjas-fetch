import { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function TableTamplate() {
  const [data, setdata] = useState("");

  const classes = makeStyles({
    table: {
      minWidth: 700,
    },
  });

  useEffect(() => {
    // console.log("useEffect work!");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        setdata(json);
        // console.log(json);
      });
  }, []);

  return (
    <div>
      {!data && <p>Loading ...</p>}
      {data && (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Phone Number</StyledTableCell>
                <StyledTableCell>Website</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((person) => (
                <StyledTableRow key={person.id}>
                  <TableCell>{person.name}</TableCell>
                  <TableCell>{person.email}</TableCell>
                  <TableCell>{person.phone}</TableCell>
                  <TableCell>{person.website}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
