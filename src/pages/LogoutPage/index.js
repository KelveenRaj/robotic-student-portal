import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetApp } from "../../redux/slices/app";
import { logout } from "../../services/auth";
import Spin from "../../components/Spin";
import userpool from "../../utils/userpool";

const LogoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const user = userpool.getCurrentUser();
  const token = JSON.parse(localStorage.getItem("token"))?.accessToken;

  const handleLogout = async () => {
    if (user) {
      user.signOut();
    }

    await logout(token);
    dispatch(resetApp());
    setIsLoading(false);
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    if (token) {
      handleLogout();
    }
  }, [token]);

  return isLoading ? <Spin /> : null;
};

export default LogoutPage;
