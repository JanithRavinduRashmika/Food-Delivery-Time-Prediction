import './database.scss'
import SideBar from '../../components/sidebar/Sidebar'
import NavBar from '../../components/navbar/Navbar'
import { Table, TableContainer, TableHead, TableRow } from '@mui/material'

const DataBase = () => {



    
  return (
    <div className='home'>
      <SideBar/>
      <div className="homeContainer">
        <NavBar />
        <div className="tableContainer">
            <div className="table">
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow></TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
            </div>
          
        </div>
        

      </div>

    </div>
  )
}

export default DataBase