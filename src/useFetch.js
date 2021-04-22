import { useEffect, useState } from "react";

function useFetch(url, triger) {
  const [data, setdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  console.log("isi loading di dalam fetch", loading);

  useEffect(() => {
    const abortCon = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortCon.signal })
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
  }, [url, triger]);

  return { data, loading, err };
}

export default useFetch;
