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

function Sidebar() {
  return (
    <div className='sidebar'>
        <div className='top'>
            <span className="logo"> lamadin </span>
        </div>
        <div className='center'>
            <ul>
                <p className="title">MAINS</p>
                <li>
                    <DashboardIcon className='icon'/>
                    <span>Dashboard</span>
                </li>
            </ul>
            <ul>
            <p className="title">LISTS</p>
                <li>
                    <GroupIcon className='icon'/>
                    <span>Users</span>
                </li>
            </ul>
            <ul>
                <li>
                    <ProductionQuantityLimitsIcon className='icon'/>
                    <span>Products</span>
                </li>
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