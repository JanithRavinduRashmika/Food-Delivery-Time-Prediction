import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Widget = ({title,value,percentage}) => {

  return (
    <div className="widget">
      <div className="top">      
        <span>{title}</span>
      </div>
      <div className="bottom">
        <span className="count">{value}</span>
        <div className="percentage" >
          
           <KeyboardArrowUpIcon/>
          
          
          <span>{percentage}</span>
        </div>

      </div>
    </div>
  );
};

export default Widget;
