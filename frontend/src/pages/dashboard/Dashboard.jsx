import './dashboard.scss'
import { useState, useEffect } from 'react'
import SideBar from '../../components/sidebar/Sidebar'
import NavBar from '../../components/navbar/Navbar'
import Widget from '../../components/widget/Widget'
import Summary from '../../components/widget/Summary'
import Chart from '../../components/chart/Chart'
import Temp from '../../components/temp/Temp'

const Dashboard = () => {

  const [deliveries,setDeliveries] = useState("0")
  const [ontime,setOntime] = useState("00.00")
  const [delay,setDelay] = useState("00.00")
  const [accuracy,setAccuracy] = useState("00.00")
  const [avgDeliveryDelayX,setAvgDeliveryDelayX] = useState([1,2,3])
  const [avgDeliveryDelayY,setAvgDeliveryDelayY] = useState([1,2,3])


  useEffect( () =>{
    fetch("/dashboard").then(
      res => res.json()
    ).then(
      data => {
        setDeliveries(data.deliveries)
        setOntime(data.ontime)
        setDelay(data.delay)
        setAccuracy(data.accuracy)
        setAvgDeliveryDelayX(data.avgDeliveryDelayX)
        setAvgDeliveryDelayY(data.avgDeliveryDelayY)
      }
    ).catch(
      error => console.log(error)
    )
  }, [])


  return (
    <div className='home'>
      <SideBar/>
      <div className="homeContainer">
        <NavBar />
        <div className="widgets">
          <Summary/>
          <Widget title={"Today Deliveries"} value={deliveries} />
          <Widget title={"Ontime %"} value={ontime}/>
          <Widget title={"Average Delay"} value={delay} />
          <Widget title={"Model Accuracy"} value={accuracy}/>
        </div>
        <div className="charts">
          <Chart xAxisData={avgDeliveryDelayX} yAxisData={avgDeliveryDelayY}/>
          <Temp/>
        </div>

      </div>

    </div>
  )
}

export default Dashboard