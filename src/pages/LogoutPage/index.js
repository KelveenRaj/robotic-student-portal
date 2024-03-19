import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetUserData } from "../../redux/slices/app";

const LogoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetUserData());
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);
};

export default LogoutPage;
