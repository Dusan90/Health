import React, { Fragment } from 'react'
import doctorImg from '../../icons/icon_my_profile_doctor_blue_23px.svg'
import '../../assets/client/doctorsDetails.scss'


function DoctorsDetails({handleClient, doctor, handleSort}) {
    return (
        <div className="mainDoctorDiv">
        <div className="doctorsAbove">
          <img src={doctorImg} alt="my patients" />
          <h4>Doctor details</h4>
        </div>
        <div className="row2">
          {doctor.map((doctor) => {
              return <Fragment key={doctor.id}>
            <div className='mainDoctorInfoDiv'>
                <div>
                <p><span>Pricing: </span>{doctor.pricing}</p>
          <p><span>Email visit: </span>{doctor.email_exam_price}</p>
          <p><span>Video: </span>{doctor.web_exam_price}</p>
          <p><span>Video follow up: </span>{doctor.web_exam_follow_price}</p>
          <p><span>Working Hours </span></p>
          <p><span>Mon-Fri: </span>{doctor.workingHours}</p>
                </div>
                <div>
          <p><span>First Name: </span>{doctor.doctor.split((" "))[0]}</p>
          <p><span>Last Name: </span>{doctor.doctor.split(" ")[1]}</p>
          <p><span>Speciality: </span>{doctor.speciality}</p>
          <p><span>Phone number: </span>{doctor.phone}</p>
          <p><span>E-mail: </span>{doctor.email}</p>
                </div>
                <div className='imageDiv'>
                {doctor.image !== "/media/default.jpg" ? <img src={`https://healthcarebackend.xyz${doctor.image}`} alt="pic"/> : <p>+</p>}
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
