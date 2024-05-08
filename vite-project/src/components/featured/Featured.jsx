import "./Featured.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = ({amountToday, amountLast7day, amountLastMonth}) => {
  const getTodayPercentage = (amount, goal) => {
    return (amount / goal) * 100;
  };
  const todayGoal = 4000
  const percentage = getTodayPercentage(amountToday, todayGoal);

 
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Ukupni prihodi</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
        
          <CircularProgressbar value={percentage} text={`${percentage.toFixed(2)}%`} strokeWidth={5} />
        </div>
        <p className="title">Ukupna prodaja ostvarena danas</p>
        <p className="amount">{amountToday}KM</p>
        <p className="desc">
        Obrada prethodnih transakcija. Posljednje uplate možda neće biti uključene.        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Današnji cilj</div>
            <div className="itemResult ">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount">{todayGoal}KM</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Posljednja sedmica</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">{amountLast7day}KM</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Posljednji mjesec</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">{amountLastMonth}KM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;