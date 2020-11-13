import React, { Fragment } from 'react'
import doctorImg from '../../icons/icon_my_profile_doctor_blue_23px.svg'
import '../../assets/client/doctorsDetails.scss'
import moment from 'moment'


function DoctorsDetails({handleClient, doctor, handleSort, props}) {
  console.log(doctor);
  // let start = doctor.start_hour ? doctor.start_hour.slice(0, -3) : ""
  const startTime =  Number(props.startW.split(':')[0]) * 60 * 60 * 1000 + Number(props.startW.split(':')[1]) * 60 * 1000;
  // let end = doctor.end_hour ? doctor.end_hour.slice(0, -3) : ""
  const endTime = Number(props.endW.split(':')[0]) * 60 * 60 * 1000 + Number(props.endW.split(':')[1]) * 60 * 1000;

    return (
        <div className="mainDoctorDiv">
        <div className="doctorsAbove">
          <img src={doctorImg} alt="my patients" />
          <h4>Doctor details</h4>
        </div>
        <div className="row2">
          {doctor.map((doctor) => {
            console.log(doctor)
              return <Fragment key={doctor.id}>
            <div className='mainDoctorInfoDiv'>
                <div>
          <p><span>Email visit: </span>{doctor.email_exam_price} {doctor.email_currency}</p>
          <p><span>Video: </span>{doctor.web_exam_price} {doctor.web_currency}</p>
          <p><span>Video follow up: </span>{doctor.web_exam_follow_price} {doctor.web_follow_up_currency}</p>
          <p><span>Working Hours: </span> </p>
          <p><span>Mon-Fri: </span>{moment(startTime).subtract(1, 'hour').format("HH:mm A")}{' '}- {' '}{moment(endTime).subtract(1, 'hour').format("HH:mm A")}</p>
                </div>
                <div>
          <p><span>First Name: </span>{doctor.doctor.split((" "))[0]}</p>
          <p><span>Last Name: </span>{doctor.doctor.split(" ")[1]}</p>
          <p><span>Speciality: </span>{doctor.speciality}</p>
          <p><span>Phone number: </span>{doctor.phone}</p>
          <p><span>E-mail: </span>{doctor.email}</p>
                </div>
                <div className='imageDiv'>
                {doctor.image !== "/media/default.jpg" ? <img src={`http://healthcarebackend.xyz${doctor.image}`} alt="pic"/> : <p>+</p>}
                </div>
            </div>
            <div className='BiographyDiv'>
            <p className='pForBio'>Biography
                 </p>
                <textarea disabled={true} placeholder={doctor.biography}/>
            
            </div>
            </Fragment>
          })}
        </div>
      </div>
    )
}

export default DoctorsDetails
