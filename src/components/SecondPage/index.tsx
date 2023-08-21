import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function SecondPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails');
    console.log(userDetails)
  })
  return (
    <div className="secondpage">
      <div>dd</div>
    </div>
  );
}
