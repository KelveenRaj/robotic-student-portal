import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetUserData } from "../../redux/slices/app";
import userpool from "../../utils/userpool";

const LogoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = userpool.getCurrentUser();
    if (user) {
      user.signOut();
    }
    dispatch(resetUserData());
    navigate("/login", { replace: true });
  }, [navigate]);
};

export default LogoutPage;
