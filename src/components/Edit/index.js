import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "70%",
  },
}));

function Edit({ person, isOpen, setupOpen, setLoading, setData }) {
  const [name, setName] = useState(person.name);
  const [tanggal, setTanggal] = useState(person.tanggal);
  const [phone, setPhone] = useState(person.phone);
  const [email, setEmail] = useState(person.email);
  const [tempat, setTempat] = useState(person.tempat);
  const [moto, setMoto] = useState(person.moto);
  const [isLoading, setIsLoading] = useState(false);

  const classes = useStyles();
  const [open, setOpen] = useState(isOpen);
  console.log("isi person", person);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setupOpen(false);
    }, 1000);
  };

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
    setLoading(true);
    setData();

    setTimeout(() => {
      fetch("http://localhost:5000/peoples/" + person.id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then(() => {
        setIsLoading(false);
        setOpen(false);
        setTimeout(() => {
          setupOpen(false);
        }, 1000);
        console.log("new data added");
      });
    }, 1000);
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h3>Change Data...</h3>
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
        </Fade>
      </Modal>
    </>
  );
}

export default Edit;
