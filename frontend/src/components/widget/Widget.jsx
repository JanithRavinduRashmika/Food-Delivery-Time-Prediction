import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Widget = ({title,value}) => {

  return (
    <div className="widget">
      <div className="top">      
        <span>{title}</span>
      </div>
      <div className="bottom">
        <span className="count">{value}</span>
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          <span>12%</span>
        </div>

      </div>
    </div>
  );
};

export default Widget;
