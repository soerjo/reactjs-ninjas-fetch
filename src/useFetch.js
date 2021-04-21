import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

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
  }, [url]);

  return { data, loading, err };
}

export default useFetch;
