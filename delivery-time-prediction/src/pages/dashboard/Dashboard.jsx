import './dashboard.scss'
import SideBar from '../../components/sidebar/Sidebar'
import NavBar from '../../components/navbar/Navbar'
import Widget from '../../components/widget/Widget'
import Summary from '../../components/widget/Summary'

const Dashboard = () => {
  return (
    <div className='home'>
      <SideBar/>
      <div className="homeContainer">
        <NavBar />
        <div className="widgets">
          <Summary/>
          <Widget type="user" />
          <Widget type="user" />
          <Widget type="user" />
          <Widget type="user" />
          
        </div>

      </div>

    </div>
  )
}

export default Dashboard