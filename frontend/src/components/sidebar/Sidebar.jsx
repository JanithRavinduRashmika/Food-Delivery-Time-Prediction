import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import Person4Icon from '@mui/icons-material/Person4';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import simg from './../../resources/deliveryPerson.svg'
import ChatIcon from '@mui/icons-material/Chat';
import StorageIcon from '@mui/icons-material/Storage';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';

function Sidebar() {
  return (
    <div className='sidebar'>
        <div className='top'>
            <Link to="/">
                <img src={simg} style={{width:60}} alt="sumarrySvg" className="image" />
            </Link>
            
        </div>
        <div className='center'>
            <ul>
                <p className="title">MAINS</p>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <li>
                        <DashboardIcon className='icon'/>
                        <span>Dashboard</span>
                    </li>
                </Link>
                
            </ul>
            <ul>
                <Link to="/predict" style={{ textDecoration: 'none' }}>
                    <li>
                        <OnlinePredictionIcon className='icon'/>
                        <span>Prediction</span>
                    </li>
                </Link>
                
            </ul>
            <ul>
                <Link to="/database" style={{ textDecoration: 'none' }}>
                    <li>
                        <StorageIcon className='icon'/>
                        <span>Database</span>
                    </li>
                </Link>
                
            </ul>
            <ul>
                <Link to="/chat" style={{ textDecoration: 'none' }}>
                    <li>
                        <ChatIcon className='icon'/>
                        <span>Chat With DB</span>
                    </li>
                </Link>
                
            </ul>
            
            
            <ul>
            <p className="title">USER</p>
                <li>
                    <Person4Icon className='icon'/>
                    <span>Profile</span>
                </li>
            </ul>
            <ul>
                <li>
                    <LogoutIcon className='icon'/>
                    <span>Logout</span>
                </li>
            </ul>
            
        </div>
    </div>
  )
}

export default Sidebar