import React, { Fragment } from 'react'
import doctorImg from '../../icons/newIconsForDesign/doctor_picture.svg'

import '../../assets/client/doctorsDetails.scss'
import moment from 'moment'


function DoctorsDetails({handleClient, doctor, handleSort, props, main}) {
  console.log(props);
  // let start = doctor.start_hour ? doctor.start_hour.slice(0, -3) : ""
  const startTime =  Number(props.startW.split(':')[0]) * 60 * 60 * 1000 + Number(props.startW.split(':')[1]) * 60 * 1000;
  // let end = doctor.end_hour ? doctor.end_hour.slice(0, -3) : ""
  const endTime = Number(props.endW.split(':')[0]) * 60 * 60 * 1000 + Number(props.endW.split(':')[1]) * 60 * 1000;
  console.log(startTime );
  const time = `${moment(startTime).subtract(1, 'hour').format("HH:mm A")} - ${moment(endTime).subtract(1, 'hour').format("HH:mm A")}`
    return (
        <div className="mainDoctorDiv">
        <div className="doctorsAbove">
          {/* <img src={doctorImg} alt="my patients" /> */}
          <h4>Doctor details</h4>
        </div>
        <div className="row2">
          {doctor.map((doctor) => {
            console.log(doctor)
              return <Fragment key={doctor.id}>
            <div className='mainDoctorInfoDiv'>
            <div className='imageDiv'>
                <img src={doctor.image.includes('default') ? doctorImg : `https://healthcarebackend.xyz${doctor.image}`} alt="pic"/>
                <div className='info'>
                  <p>{doctor.doctor}</p>
                  <h5>Speciality: <span>{doctor.speciality}</span></h5>
                  <h5>Organization: <span>{doctor.organization}</span></h5>
                  <h5>Email: <span>{doctor.email}</span></h5>
                  <h5>Phone: <span>{doctor.phone}</span></h5>
                </div>
                
            </div>
                <div className='pricesAndDoing'>
                <div className="priceInfo">
                  <p style={{fontWeight: '900', textAlign: 'start', fontSize: '16px' }}>Services</p>
                  {doctor.email_exam_status === 'True' && <div>
                  <p><span>Email consultation: </span>{doctor.email_exam_price} {doctor.email_currency}</p>
                  {doctor.email_exam_status === 'True' && <button onClick={() => {main.props.history.push({pathname: '/initiate', state: { doctorId: doctor.id }})}}>Start</button>}
                  </div>}
                  {doctor.web_exam_status === 'True' && <div>
                  <p><span>Video consultation: </span>{doctor.web_exam_price} {doctor.web_currency}</p>
                  {doctor.web_exam_status === 'True' && <button onClick={() => {main.props.history.push({pathname: '/client/video-request', state: { doctorId: doctor.id }})}}>Start</button>}
                  </div>}
                  {doctor.web_exam_follow_status === 'True' &&<div>
                  <p><span>Video follow up: </span>{doctor.web_exam_follow_price} {doctor.web_follow_up_currency}</p>
                  {doctor.web_exam_follow_status === 'True' && <button onClick={() => {main.props.history.push({pathname: '/client/video-request', state: { doctorId: doctor.id }})}}>Start</button>}
                  </div>}
                  {doctor.waiting_room_status === 'True' &&<div>
                  <p><span>Waiting room: </span>{doctor.waiting_room_price} {doctor.waiting_room_currency}</p>
                  {doctor.waiting_room_status === 'True' && <button onClick={() => {main.props.history.push({pathname: '/client/waiting-room', state: { doctorId: doctor.id }})}}>Start</button>}
                  </div>}
                </div>
                </div>
            </div>
            <div className='BiographyDiv'>
              <div className="workHours">
                <div>
                <p style={{fontSize: '16px'}}><span>Working Hours </span> </p>
                  {props.workingHoursArray.map(ex =>{
                    return <p key={ex.id}><span>{ex.day === 0 ? 'Mon: ' : ex.day === 1 ? 'Tue: ' : ex.day === 2 ? 'Wed: ' : ex.day === 3 ? 'Thu: ' : ex.day === 4 ? 'Fri: ' : ex.day === 5 ? 'Sat: ' : ex.day === 6 ? 'Sun: ' : null }</span>{moment(ex.start_hour, "HH:mm:ss").format('HH:mm')} : {moment(ex.end_hour, "HH:mm:ss").format('HH:mm')}</p>
                  })}
                  {/* <p><span>Mon: </span>{!startTime ? null : time}</p>
                  <p><span>Tue: </span>{!startTime ? null : time}</p>
                  <p><span>Wed: </span>{!startTime ? null : time}</p>
                  <p><span>Thu: </span>{!startTime ? null : time}</p>
                  <p><span>Fri: </span>{!startTime ? null : time}</p>
                  <p style={{margin: 0}}><span>Sat: </span>{!startTime ? null : time}</p> */}
                </div>
              </div>
              <div className='bio'>
                <p className='pForBio' style={{fontSize: '16px'}}>Biography
                 </p>
                <textarea disabled={true} className='bioText' placeholder={doctor.biography}/>
              </div>
            </div>
            </Fragment>
          })}
        </div>
      </div>
    )
}

export default DoctorsDetails
