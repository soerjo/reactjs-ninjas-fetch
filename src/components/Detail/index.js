import React from "react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import "./details.css";

function Detail() {
  const { id } = useParams();
  const [data, setdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const abortCon = new AbortController();

    setTimeout(() => {
      fetch("http://localhost:5000/peoples/" + id, { signal: abortCon.signal })
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
  }, [id]);

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
