import DropdownButton from '../dropDownBtn/DropdownButton';
import './chart.scss'
import { LineChart } from '@mui/x-charts/LineChart'; 

const Chart = ({xAxisData,yAxisData}) => {

  return (
    <div className='chart'>
      <div className="top">
        <span className="title">Avarage Delivery Delay</span>
        <div className="tab">
          <DropdownButton className="dropdown"/>
          <DropdownButton className="dropdown"/>
        </div>
      </div>
      <div className="bottom">
        <LineChart
          xAxis={[{ data: xAxisData }]}
          
          series={[
            {
              data: yAxisData,
              
              
            },
          ]}
          width={750}
          height={450}
          grid={{horizontal:true}}
          
        />
      </div>
    </div>
  )
}

export default Chart