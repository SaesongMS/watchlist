import {
  faBed,
  faCalendarDays,
  faCar,
  faChartBar,
  faChartPie,
  faDownload,
  faHome,
  faPerson,
  faPlane,
  faTaxi,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);


  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItem">
            <FontAwesomeIcon icon={faHome} />
            <span>Home</span>
          </div>
          <div className="headerListItem" onClick={() => navigate("/top-movies")}>
            <FontAwesomeIcon icon={faChartPie} />
            <span>Top Movies</span>
          </div>
          <div className="headerListItem" onClick={() => navigate("/get-xml")}>
            <FontAwesomeIcon icon={faDownload} />
            <span>Dump DB to XML</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faUpload} />
            <span>Populate DB from XML</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
