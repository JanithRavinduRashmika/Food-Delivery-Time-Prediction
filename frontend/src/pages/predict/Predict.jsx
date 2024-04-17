import './predict.scss'
import SideBar from '../../components/sidebar/Sidebar'
import NavBar from '../../components/navbar/Navbar'
import TextField from '@mui/material/TextField';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import {Icon} from "leaflet"
import "leaflet/dist/leaflet.css"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Select, MenuItem, InputLabel, FormControl, Button} from '@mui/material';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import { useState } from 'react';
import simg from './../../resources/prediction.svg'





const Predict = () => {

  const resturantIcon = new Icon({
    iconUrl: require('./../../resources/restaurantPin.png'),
    iconSize: [38,38]
  });

  const homeIcon = new Icon({
    iconUrl: require('./../../resources/homePin.png'),
    iconSize: [38,38]
  });

  const [formData, setFormData] = useState({
    deliveryPersonAge:"",
    deliveryPersonRating:"",
    restaurantLongitude:"",
    restaurantLatitude:"",
    deliveryLongitude:"",
    deliveryLatitude:"",
    city:"",
    orderDate:"",
    orderType:"",
    orderedTime:"",
    orderPickedTime:"",
    typeOfVehicle:"",
    vehicleCondition:"",
    weatherCondition:"",
    roadTrafficDensity:"",
    multipleDeliveries:"",
    festival:""
  })

  const [focused, setFocused] = useState({
    deliveryPersonAge:false,
    deliveryPersonRating:false,
    restaurantLongitude:false,
    restaurantLatitude:false,
    deliveryLongitude:false,
    deliveryLatitude:false,
    city:false,
    orderDate:false,
    orderType:false,
    orderedTime:false,
    orderPickedTime:false,
    typeOfVehicle:false,
    vehicleCondition:false,
    weatherCondition:false,
    roadTrafficDensity:false,
    multipleDeliveries:false,
    festival:false
  })

  
  const [predictedTime, setPredictedTime] = useState(0)

  const [mapCenterCoordinates, setMapCenterCoordinates] = useState([20.59,78.96])
  const [mapRestaurantCoordinates, setMapRestaurantCoordinates] = useState([0,0]) 
  const [mapDeliveryCoordinates, setMapDeliveryCoordinates] = useState([0,0])

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({
      ...formData, [name] : value
    })

    if((name === "restaurantLongitude") || (name === "restaurantLatitude")){
      if((formData.restaurantLatitude !== "") && (formData.restaurantLongitude !== "")){
        setMapRestaurantCoordinates([parseFloat(formData.restaurantLatitude), parseFloat(formData.restaurantLongitude)])
        if(mapDeliveryCoordinates[0] !== 0 && mapDeliveryCoordinates[1] !== 0){
          setMapCenterCoordinates([(parseFloat(mapRestaurantCoordinates[0])+parseFloat(mapDeliveryCoordinates[0]))/2 , (parseFloat(mapRestaurantCoordinates[1])+parseFloat(mapDeliveryCoordinates[1]))/2])
        }else{
          setMapCenterCoordinates(mapRestaurantCoordinates)
        }
      }else{
        setMapRestaurantCoordinates([0,0])
      }
    }

    if((name === "deliveryLongitude") || (name === "deliveryLatitude")){
      if((formData.deliveryLatitude !== "") && (formData.deliveryLongitude !== "")){
        setMapDeliveryCoordinates([parseFloat(formData.deliveryLatitude), parseFloat(formData.deliveryLongitude)])
        if(mapRestaurantCoordinates[0] !== 0 && mapRestaurantCoordinates[1] !== 0){
          setMapCenterCoordinates([(parseFloat(mapRestaurantCoordinates[0])+parseFloat(mapDeliveryCoordinates[0]))/2 , (parseFloat(mapRestaurantCoordinates[1])+parseFloat(mapDeliveryCoordinates[1]))/2])
        }else{
          setMapCenterCoordinates(mapDeliveryCoordinates)
        }
      }else{
        setMapDeliveryCoordinates([0,0])
      }
    }

    


    
  }

  const handleBlur = (e) => {
    setFocused({
      ...focused, [e.target.name] : true
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(formData)
   

    try {
      const response = await fetch('/predict', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      console.log(response.predictedTime)
      setPredictedTime(responseData.predictedTime);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }

    
  }

  const handleOrderDate = (e) =>{
    const date = new Date(e)
    setFormData({
      ...formData, "orderDate" : date.getFullYear()+'-'+(date.getMonth() + 1)+'-'+date.getDate()
    })
    
  }

  const handleOrderedTime = (e) =>{
    const date = new Date(e)
    setFormData({
      ...formData, "orderedTime" : date.getHours()+'-'+date.getMinutes()
    })
  }
  
  const handleOrderPickedTime = (e) =>{
    const date = new Date(e)
    setFormData({
      ...formData, "orderPickedTime" : date.getHours()+'-'+date.getMinutes()
    })
  }

  
  

  return (
    <div className='home'>
      <SideBar/>
      <div className="homeContainer">
        <NavBar />
          <div className="formContainer">
            
            <form className="form" onSubmit={handleSubmit}>
              <div className='driverDetails'>
                <span className='driverDetailsTitle'>Delivery Person Details</span>
                <div className="driverDetailsContent">
                  <TextField name = "deliveryPersonAge" className='dpdTxt' id="outlined-basic" label="Delivery Person Age" variant="outlined" type='number' onChange={handleChange} onBlur={handleBlur} required
                    error = {focused.deliveryPersonAge && (formData.deliveryPersonAge<18 || formData.deliveryPersonAge>60) ? true:false} 
                    helperText={focused.deliveryPersonAge && (formData.deliveryPersonAge<18 || formData.deliveryPersonAge>60) ? "Invalid Age":""}
                  />

                  <TextField name = "deliveryPersonRating" className='dpdTxt' id="outlined-basic" label="Delivery Person Rating" variant="outlined"  onChange={handleChange} onBlur={handleBlur} required
                    error = {focused.deliveryPersonRating && (formData.deliveryPersonRating<1 || formData.deliveryPersonRating>5) ? true:false} 
                    helperText = {focused.deliveryPersonRating && ((formData.deliveryPersonRating < 0) || (formData.deliveryPersonRating>5)) ? "Invalid Rating":""}
                  />

                </div>
              </div>
              <div className='locationDetails'>
                <span className='locationDetailsTitle'>Delivery Location Details</span>
                <div className="locationDetailsContent">
                  <div className="restDelLocation">
                    <TextField name = "restaurantLongitude" className='locTxt' id="outlined-basic" label="Restaurant Longitude" variant="outlined"  onChange={handleChange} onBlur={handleBlur} required
                      error = {focused.restaurantLongitude && (formData.restaurantLongitude<68.7 || formData.restaurantLongitude>97.25) ? true:false} 
                      helperText = {focused.restaurantLongitude && (formData.restaurantLongitude<68.7 || formData.restaurantLongitude>97.25) ? "Invalid Restaurant Longitude":""}
                    />
                    <TextField name = "deliveryLongitude" className='locTxt' id="outlined-basic" label="Delivery Longitude" variant="outlined" onChange={handleChange} onBlur={handleBlur} required
                      error = {focused.deliveryLongitude && (formData.deliveryLongitude<68.7 || formData.deliveryLongitude>97.25) ? true:false} 
                      helperText = {focused.deliveryLongitude && (formData.deliveryLongitude<68.7 || formData.deliveryLongitude>97.25) ? "Invalid Delivery Longitude":""}
                    />
                  </div>
                  <div className="restDelLocation">
                    <TextField name = "restaurantLatitude" className='locTxt' id="outlined-basic" label="Restaurant Latitude" variant="outlined" onChange={handleChange} onBlur={handleBlur} required
                      error = {focused.restaurantLatitude && (formData.restaurantLatitude<8.4 || formData.restaurantLatitude>37.6) ? true:false} 
                      helperText = {focused.restaurantLatitude && (formData.restaurantLatitude<8.4 || formData.restaurantLatitude>37.6) ? "Invalid Restaurant Latitude":""}
                    />
                    <TextField name = "deliveryLatitude" className='locTxt' id="outlined-basic" label="Delivery Latitude" variant="outlined" onChange={handleChange} onBlur={handleBlur} required
                      error = {focused.deliveryLatitude && (formData.deliveryLatitude<8.4 || formData.deliveryLatitude>37.6) ? true:false} 
                      helperText = {focused.deliveryLatitude && (formData.deliveryLatitude<8.4 || formData.deliveryLatitude>37.6) ? "Invalid Delivery Latitude":""}
                    />
                  </div>
                </div>
              </div>
              <div className="map">
                    <MapContainer center={mapCenterCoordinates} zoom={5} scrollWheelZoom={false}>
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      
                        <Marker position={mapRestaurantCoordinates} icon={resturantIcon}></Marker>

                        <Marker position={mapDeliveryCoordinates} icon={homeIcon}></Marker>
                      
                      
                    </MapContainer>
              </div>
              <div className="city">
                    <FormControl fullWidth className='otherTxt'>
                      <InputLabel id="demo-simple-select-label">City</InputLabel>
                      <Select
                        name = "city"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="City"
                        onChange={handleChange}
                        required
                        defaultValue=""
                        error = {focused.city && (formData.city === "") ? true:false}
                      >
                          <MenuItem value={"urban"}>Urban</MenuItem>
                          <MenuItem value={"metropolitian"}>Metropolitian</MenuItem>
                          <MenuItem value={"semi urban"}>Semi Urban</MenuItem>
                          
                        </Select>
                    </FormControl>
              </div>
              <div className='orderDetails'>
                <span className='orderDetailsTitle'>Order Details</span>
                <div className="orderDetailsContent">
                  <div className="orderContext">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker name = "orderDate" className='orderTxt' label="Order Date"   onChange={(data)=>{handleOrderDate(data)}} />
                    </LocalizationProvider>
                    <FormControl fullWidth className='orderTxt'>
                      <InputLabel id="demo-simple-select-label">Order Type</InputLabel>
                      <Select
                        name = "orderType"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Order Type"
                        onChange={handleChange}
                        required
                        defaultValue=""
                      >
                          <MenuItem value={"snack"}>Snack</MenuItem>
                          <MenuItem value={"drinks"}>Drinks</MenuItem>
                          <MenuItem value={"buffet"}>Buffet</MenuItem>
                          <MenuItem value={"meal"}>Meal</MenuItem>
                        </Select>
                    </FormControl>
                  </div>
                  <div className="orderContext">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker name = "orderedTime" className="orderTxt" label="Ordered Time" onChange={(data) => {handleOrderedTime(data)}} required/>
                      <TimePicker name = "orderPickedTime" className="orderTxt" label="Order Picked Time" onChange={(data)=>{handleOrderPickedTime(data)}} required/>
                    </LocalizationProvider>
                  </div>
                </div>
              </div>
              <div className='otherDetails'>
                <span className='otherDetailsTitle'>Other Details</span>
                <div className="otherDetailsContent">
                  <div className="otherContext">
                    <FormControl fullWidth className='otherTxt'>
                      <InputLabel id="demo-simple-select-label">Type Of Vehicle</InputLabel>
                      <Select
                        name = "typeOfVehicle"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Type Of Vehicle"
                        onChange={handleChange}
                        required
                        defaultValue=""
                      >
                          <MenuItem value={"mortorcycle"}>Mortorcycle</MenuItem>
                          <MenuItem value={"scooter"}>Scooter</MenuItem>
                          <MenuItem value={"electric scooter"}>Electric Scooter</MenuItem>
                          <MenuItem value={"bicycle"}>Bicycle</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth className='otherTxt'>
                      <InputLabel id="demo-simple-select-label">Vehicle Condition</InputLabel>
                      <Select
                        name = "vehicleCondition"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Vehicle Condition"
                        onChange={handleChange}
                        required
                        defaultValue=""
                      >
                          <MenuItem value={"0"}>0</MenuItem>
                          <MenuItem value={"1"}>1</MenuItem>
                          <MenuItem value={"2"}>2</MenuItem>
                          <MenuItem value={"3"}>3</MenuItem>
                        </Select>
                    </FormControl>
                  </div>
                  <div className="otherContext">
                    <FormControl fullWidth className='otherTxt'>
                      <InputLabel id="demo-simple-select-label">Weather Condition</InputLabel>
                      <Select
                        name = "weatherCondition"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Weather Condition"
                        onChange={handleChange}
                        required
                        defaultValue=""
                      >
                          <MenuItem value={"sunny"}>Sunny</MenuItem>
                          <MenuItem value={"stormy"}>Stormy</MenuItem>
                          <MenuItem value={"sandstorm"}>Sandstorm</MenuItem>
                          <MenuItem value={"cloudy"}>Cloudy</MenuItem>
                          <MenuItem value={"fog"}>Fog</MenuItem>
                          <MenuItem value={"windy"}>Windy</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth className='otherTxt'>
                      <InputLabel id="demo-simple-select-label">Road Traffic Density</InputLabel>
                      <Select
                        name = "roadTrafficDensity"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Road Traffic Density"
                        onChange={handleChange}
                        required
                        defaultValue=""
                      >
                          <MenuItem value={"jam"}>Jam</MenuItem>
                          <MenuItem value={"high"}>High</MenuItem>
                          <MenuItem value={"medium"}>Medium</MenuItem>
                          <MenuItem value={"low"}>Low</MenuItem>
                        </Select>
                    </FormControl>
                  </div>
                  <div className="otherContext">
                    <FormControl fullWidth className='otherTxt'>
                      <InputLabel id="demo-simple-select-label">Multiple Deliveries</InputLabel>
                      <Select
                        name = "multipleDeliveries"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Multiple Deliveries"
                        onChange={handleChange}
                        required
                        defaultValue=""
                      >
                          <MenuItem value={"0"}>0</MenuItem>
                          <MenuItem value={"1"}>1</MenuItem>
                          <MenuItem value={"2"}>2</MenuItem>
                          <MenuItem value={"3"}>3</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth className='otherTxt'>
                      <InputLabel id="demo-simple-select-label">Festival</InputLabel>
                      <Select
                        name = "festival"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Festival"
                        onChange={handleChange}
                        required
                        defaultValue=""
                      >
                          <MenuItem value={"yes"}>Yes</MenuItem>
                          <MenuItem value={"no"}>No</MenuItem>
                        </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
              <Button type='submit' className='predictionBtn' variant="contained" endIcon={<OnlinePredictionIcon /> }>
                Predict
              </Button>
              
            </form>
            { predictedTime !== 0 &&
              <div className="prediction">
                <div className="left">
                  <span className="title">Predicted Time:</span>
                  <span className="predict">{predictedTime}</span>
                  <span className="min">min</span>
                </div>
                <div className="right">
                  <img src={simg} style={{width:400}} alt="sumarrySvg" className="image" />
                </div>
              </div>
            }
            
          </div>
      </div>
      
      
    </div>
  )
}

export default Predict