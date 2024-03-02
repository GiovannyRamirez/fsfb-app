import { useNavigate } from "react-router-dom";

import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import { URL_PAGES } from "../../constants";

import "./styles.css";

export const ProfileNav = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate(URL_PAGES.WELCOME);
  };

  const user = localStorage.getItem("user");
  const { name = "", email = "" } = JSON.parse(user || "");

  return (
    <div className="profileContainer">
      <section className="profileData">
        <h3 className="profileName">{name}</h3>
        <span className="profileEmail">{email}</span>
      </section>
      <div className="profileCloseSession" onClick={logout}>
        <CancelOutlinedIcon />
      </div>
    </div>
  );
};
