import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./index.css";

function Create() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [tempat, setTempat] = useState("");
  const [moto, setMoto] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      phone,
      tanggal,
      tempat,
      moto,
    };

    setIsLoading(true);

    setTimeout(() => {
      fetch("http://localhost:5000/peoples", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then(() => {
        setIsLoading(false);
        console.log("new data added");
        // history.go(-1); //buat kembali ke page yang sebelumnya
        history.push(`/`); // memaksa berppindah ke page home
      });
    }, 2000);
  };

  return (
    <div className="newData">
      <h2>New Data Page</h2>
      <p>memasukan data baru kedalam table di page home</p>
      <div className="form">
        <form onSubmit={(e) => handleSubmit(e)}>
          <label id="setNama">Nama</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            required
          />
          <label>Tanggal Lahir</label>
          <input
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            type="text"
            required
          />
          <label>Phone Number</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            required
          />
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            required
          />
          <label>Place Work</label>
          <input
            value={tempat}
            onChange={(e) => setTempat(e.target.value)}
            type="text"
            required
          />
          <label>Moto hidup</label>
          <textarea
            value={moto}
            onChange={(e) => setMoto(e.target.value)}
            required
          />
          {!isLoading && <button type="submit">Submit</button>}
          {isLoading && (
            <button
              disabled
              type="submit"
              style={{ backgroundColor: "lightgray", color: "#333" }}
            >
              Loading...
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Create;
