import './navbar.scss'
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ChecklistIcon from '@mui/icons-material/Checklist';

function Navbar() {
  return (
    <div className='navbar'>
        <div className="wrapper">
            <div className="search">
                <input type="text" placeholder='Search..' />
                <SearchIcon/>
            </div>
            <div className="items">
                <div className="item">
                    <LanguageIcon className='icon' />
                    English
                </div>
                <div className="item">
                    <LanguageIcon className='icon'/>
                </div>
                <div className="item">
                    <DarkModeIcon className='icon'/>
                </div>
                <div className="item">
                    <FullscreenIcon className='icon'/>
                </div>
                <div className="item">
                    <NotificationsNoneIcon className='icon'/>
                </div>
                <div className="item">
                    <ChatBubbleIcon className='icon'/>
                </div>
                <div className="item">
                    <ChecklistIcon className='icon'/>
                </div>
                <div className="item">
                    <img 
                        src='.././resources/avatar/jpg'
                        alt=''
                        className='avatar'
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar