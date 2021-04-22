import React from "react";
import { useParams } from "react-router";
import useFetch from "../../useFetch";
import { CircularProgress } from "@material-ui/core";
import "./details.css";

function Detail() {
  const { id } = useParams();
  const { data, err, loading } = useFetch(
    "http://localhost:5000/peoples/" + id
  );
  // console.log(data);
  return (
    <div className="detail">
      <h4>{`Detail Data #${err ? "error" : id}`}</h4>
      {err && <p>{err}</p>}
      {loading && (
        <div className="circular">
          <CircularProgress />
        </div>
      )}
      {data && (
        <div className="isiDetail">
          <h1>{data.name} </h1>
          <p>{data.tanggal} </p>
          <hr></hr>
          <p>Phone: {data.phone}</p>
          <p>Email: {data.email}</p>
          <p>Place: {data.tempat}</p>
          <p>Moto: "{data.moto}"</p>
        </div>
      )}
    </div>
  );
}

export default Detail;
