import './summary.scss'
import simg from './../../resources/summary.svg'


const Summary = () => {

  return (
    <div className='summary'>
        <div className="left">
            <div className="top">
                <span className="title">Daily Summary</span>
            </div>
            <div className="bottom">
                <span className="context">You have done 72% more deliveries compare to last week. Congratulations !!</span>
            </div>
        </div>
        <div className="right">
            <img src={simg} style={{width:125}} alt="sumarrySvg" className="image" />
        </div>
    </div>
  )
}

export default Summary

