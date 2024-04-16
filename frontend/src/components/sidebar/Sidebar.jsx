import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookIcon from '@mui/icons-material/Book';
import SettingsIcon from '@mui/icons-material/Settings';
import Person4Icon from '@mui/icons-material/Person4';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import simg from './../../resources/deliveryPerson.svg'

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
                <Link to="/">
                    <li>
                        <DashboardIcon className='icon'/>
                        <span>Dashboard</span>
                    </li>
                </Link>
                
            </ul>
            <ul>
                <p className="title">LISTS</p>
                <Link to="/predict">
                    <li>
                        <GroupIcon className='icon'/>
                        <span>Predictions</span>
                    </li>
                </Link>
                
            </ul>
            <ul>
                <Link to="/database">
                    <li>
                        <ProductionQuantityLimitsIcon className='icon'/>
                        <span>DataBase</span>
                    </li>
                </Link>
                
            </ul>
            <ul>
                <li>
                    <BookmarkBorderIcon className='icon'/>
                    <span>Orders</span>
                </li>
            </ul>
            <ul>
                <li>
                    <DeliveryDiningIcon className='icon'/>
                    <span>Delivery</span>
                </li>
            </ul>
            <ul>
            <p className="title">USEFULL</p>
                <li>
                    <QueryStatsIcon className='icon'/>
                    <span>Stats</span>
                </li>
            </ul>
            <ul>
                <li>
                    <NotificationsIcon className='icon'/>
                    <span>Notifications</span>
                </li>
            </ul>
            <ul>
            <p className="title">SERVICE</p>
                <li>
                    <FavoriteIcon className='icon'/>
                    <span>System Health</span>
                </li>
            </ul>
            <ul>
                <li>
                    <BookIcon className='icon'/>
                    <span>Logs</span>
                </li>
            </ul>
            <ul>
                <li>
                    <SettingsIcon className='icon'/>
                    <span>Settings</span>
                </li>
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
        <div className='bottom'>
            <div className="colorOption"></div>
            <div className="colorOption"></div>
        </div>
    </div>
  )
}

export default Sidebar