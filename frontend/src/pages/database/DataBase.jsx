import './database.scss'
import SideBar from '../../components/sidebar/Sidebar'
import NavBar from '../../components/navbar/Navbar'

import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { useEffect, useState } from 'react'

const DataBase = () => {

    const columns = [
        { id: 'ID', name: 'ID' },
        { id: 'Delivery_person_ID', name: 'Delivery Person ID' },
        { id: 'Delivery_person_Age', name: 'Delivery PersonAge' },
        { id: 'Delivery_person_Ratings', name: 'Delivery Person Ratings' },
        { id: 'Restaurant_latitude', name: 'Restaurant Latitude' },
        { id: 'Restaurant_longitude', name: 'Restaurant Longitude' },
        { id: 'Delivery_location_latitude', name: 'Delivery Location Latitude' },
        { id: 'Delivery_location_longitude', name: 'Delivery Location Longitude' },
        { id: 'Order_Date', name: 'Order Date' },
        { id: 'Time_Orderd', name: 'Time Orderd' },
        { id: 'Time_Order_picked', name: 'Time Order Picked' },
        { id: 'Weatherconditions', name: 'Weather Conditions' },
        { id: 'Road_traffic_density', name: 'Road Traffic Density' },
        { id: 'Vehicle_condition', name: 'Vehicle Condition' },
        { id: 'Type_of_order', name: 'Type Of Order' },
        { id: 'Type_of_vehicle', name: 'Type Of Vehicle' },
        { id: 'multiple_deliveries', name: 'multiple Deliveries' },
        { id: 'Festival', name: 'Festival' },
        { id: 'City', name: 'City' },
        { id: 'Time_taken(min)', name: 'Time Taken' }
        
    ]

    const handlechangepage = (event, newpage) => {
        pagechange(newpage)
    }
    const handleRowsPerPage = (event) => {
        rowperpagechange(+event.target.value)
        pagechange(0);
    }

    const [rows, rowchange] = useState([]);
    const [page, pagechange] = useState(0);
    const [rowperpage, rowperpagechange] = useState(5);
    
    useEffect(() => {
        fetch("/database").then(resp => {
            return resp.json();
        }).then(resp => {
            rowchange(resp.database);
        }).catch(e => {
            console.log(e.message)
        })

    }, [])

    return (

        <div className='home'>
            <SideBar/>
            <div className="homeContainer">
                <NavBar />
                <div className="tableContainer">
                    <div className="table">
 
                                <TableContainer className='tcontainer'>
                                    <Table >
                                        <TableHead>
                                            <TableRow>
                                                {columns.map((column) => (
                                                    <TableCell style={{ backgroundColor: 'black', color: 'white' }} key={column.id}>{column.name}</TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows && rows
                                                .slice(page * rowperpage, page * rowperpage + rowperpage)
                                                .map((row, i) => {
                                                    return (
                                                        <TableRow key={i}>
                                                            {columns && columns.map((column, i) => {
                                                                let value = row[column.id];
                                                                return (
                                                                    <TableCell key={value}>
                                                                        {value}
                                                                    </TableCell>
                                                                )
                                                            })}
                                                        </TableRow>
                                                    )
                                                })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination className='tPagination'
                                    rowsPerPageOptions={[5, 10, 50, 100]}
                                    rowsPerPage={rowperpage}
                                    page={page}
                                    count={rows.length}
                                    component="div"
                                    onPageChange={handlechangepage}
                                    onRowsPerPageChange={handleRowsPerPage}

                                />
                            

                        

                    </div>
                
                </div>
                

            </div>

        </div>

        
    );
}


export default DataBase