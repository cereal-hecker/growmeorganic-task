import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, FormControl } from "@mui/material";

export default function FirstPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = () => {
    if (name && phoneNumber && email) {
      const userDetails = { name, phoneNumber, email };
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      navigate("/second");
    } else {
      alert("All fields are mandatory!");
    }
  };

  return (
    <div className="firstpage">
      <h1 className="heading">Grow Me Organic</h1>
      <h2>Enter Details</h2>
      <FormControl sx={{ ml: 3 }}>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          id="outlined-basic"
          label="Name"
          variant="outlined"
        />
        <TextField
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          sx={{ mb: 2 }}
          id="outlined-basic"
          label="Phone Number"
          variant="outlined"
        />
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
        <Button onClick={handleSubmit} color="error" variant="contained">
          Submit
        </Button>
      </FormControl>
    </div>
  );
}
