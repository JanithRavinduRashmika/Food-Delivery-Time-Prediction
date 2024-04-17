import './dashboard.scss'
import { useState, useEffect } from 'react'
import SideBar from '../../components/sidebar/Sidebar'
import NavBar from '../../components/navbar/Navbar'
import Widget from '../../components/widget/Widget'
import Summary from '../../components/widget/Summary'
import { LineChart } from '@mui/x-charts/LineChart'; 
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';


const Dashboard = () => {

  
  const [selectedValue, setSelectedValue] = useState("2024");
  const [xAxisValues, setXAxisValues] = useState([])
  const [yAxisValues, setYAxisValues] = useState([])

  useEffect(() => {
    fetch('/chart', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      
      body: JSON.stringify({"year":2024})
    }).then(resp => {
      return resp.json();
    }).then(resp => {
        setXAxisValues(resp.xAx);
        setYAxisValues(resp.yAx);
    }).catch(e => {
        console.log(e.message)
    })

}, [])

  const handleOptionSelect = (value) => {
    setSelectedValue(value);
    const data = {"year":value}
    
    
    fetch('/chart', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        
        body: JSON.stringify(data)
      }).then(resp => {
        return resp.json();
      }).then(resp => {
          setXAxisValues(resp.xAx);
          setYAxisValues(resp.yAx);
      }).catch(e => {
          console.log(e.message)
      })

  }






  return (
    <div className='home'>
      <SideBar/>
      <div className="homeContainer">
        <NavBar />
        <div className="widgets">
          <Summary/>
          <Widget title={"Today Deliveries"} value={1373} percentage={"15.32%"}  />
          <Widget title={"Ontime %"} value={"89.1%"} percentage={"2.19%"} />
          <Widget title={"Average Delay (min)"} value={5.32} percentage={"5.32%"} />
          <Widget title={"Model Accuracy"} value={1} percentage={"15.32%"} />
        </div>
        <div className="charts">
          <div className='chart'>
            <div className="top">
              <span className="title">Avarage Delivery Time</span>
              <div className="tab">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ backgroundColor: '#0077b6', color: 'white' }}>
                  {selectedValue}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleOptionSelect("2024")}>2024</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleOptionSelect("2023")}>2023</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleOptionSelect("2022")}>2022</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </div>
            </div>
            <div className="bottom">
              <LineChart
                xAxis={[{ data: xAxisValues }]}
                
                series={[
                  {
                    data: yAxisValues
                  }
                ]}
                width={1200}
                height={450}
                grid={{horizontal:true}}
                
              />
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Dashboard