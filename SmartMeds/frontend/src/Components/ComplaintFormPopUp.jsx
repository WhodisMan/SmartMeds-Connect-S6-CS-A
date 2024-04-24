import React from 'react'
import './Complaints.css'
const ComplaintFormPopUp = (props) => {
  return (props.trigger)?(
    <div className='popup'>
        <div className="popup-inner card">
            <button className='close-btn' onClick={()=>props.setTrigger(false)}> close</button>
            {
                props.children
            }
        </div>
    </div>
  ):"";
  
}

export default ComplaintFormPopUp