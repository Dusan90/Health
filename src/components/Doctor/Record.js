import React from "react";
import "../../assets/record.scss";
import myClientProfile from "../../icons/newIconsForDesign/client_picture.svg";
import chek from "../../icons/chek.svg";
import clockIcon from "../../icons/icon_Waiting_Room_blue.svg";
import declined from "../../icons/icon_Log_Out_blue.svg";
import { GiCheckeredFlag } from "react-icons/gi";
import Loading from "../../icons/c+.svg";
import moment from "moment";
import Pagination from "react-js-pagination";




const Record = ({
  props,
  record,
  handleClick,
  loading,
  searchByType,
  ResetonSelectChange,
  handlePageChange,
  handlePage

}) =>{ 
  return (

  <>
    {record &&
      record.map(client => {
        console.log(client);
        return (
          <div key={client.id} className="mainClienn" style={{padding: props.pageYourOn === 'clientConsul' && '0', height: props.pageYourOn === 'clientConsul' && '10px' }}>
            {/* <div className="clDetails"> */}
            <div className="newVideo" style={{margin: props.pageYourOn === 'clientConsul' && '0px'}}>
          <div className='profileDoc' style={{borderBottom: props.pageYourOn === 'clientDetails' && '4px solid #fa9551' }} onClick={() =>{handlePage('clientDetails')}}>
          <h4 style={{fontWeight: props.pageYourOn === 'clientDetails' && 'bold' }}>Client details</h4>
          </div>
          <div className='profileDoc' style={{borderBottom: props.pageYourOn === 'clientConsul' && '4px solid #fa9551' }} onClick={() =>{handlePage('clientConsul')}}>
          <h4 style={{fontWeight: props.pageYourOn === 'clientConsul' && 'bold' }}>Client consultations</h4>
          </div>
        </div>
          {/* <h4>Client details </h4> */}
        {/* </div> */}
        {props.pageYourOn === 'clientDetails' && <div>
        <div className="client">
            <img src={client.image.includes('default') ? myClientProfile : `https://healthcarebackend.xyz/media/${client.image}`} alt="cliet profile" />
              <div className="client-p">
        <p>{client.client}</p>
        <h5>Address: <span>{client.address}</span></h5>
        <h5>E-mail: <span>{client.email}</span></h5>
        <h5>Phone number: <span>{client.phone}</span></h5>
        <h5>Date of birth: <span>{client.birth_date}</span></h5>
        <h5>{client.gender === 'M' ? 'Male' : 'Female'}</h5>
              </div>
            </div>
            <div className="form">
              <div className="conditionss">
                <span>Chronical conditions:{" "}</span>
                <textarea
                  type="text"
                  readOnly
                  className="address-input"
                  placeholder={client.chronical_conditions}
                 id='ChronicalConditions'
                />
              </div>
              <div  className="allergiess">
               <span>Allergies:{" "}</span>
               <textarea
                  type="text"
                  readOnly
                  className="address-input2"
                  placeholder={client.allergies}
                 id='Allergies'
                />
         
              </div>
            </div>
          </div>}
      
{props.pageYourOn === 'clientConsul' && <div className="consAndPagi">
{loading ? (
        <img
          src={Loading}
          className="loading"
          alt="loading..."
          style={{ width: "150px" }}
        />
      ) : (
        <div className="mainTabelRecord">
          <div className="mainConsultation">
            <div className="icon_left">
              <p>Consultations</p>
            </div>
          </div>

          <table className="table2">
            <thead className="client-head">
              <tr className="client-row">
              
                <th className="client-subject">Subject</th>
                <th
                  className="client-type"
                  style={{ padding: props.searchClient && "0 0 30px 0" }}
                >
                  <div className="mainExamDiv">
             
                    <select
                      type="text"
                      placeholder=""
                      onClick={ResetonSelectChange}
                      onChange={searchByType}
                      value={props.searchType}
                      
                    >
                      <option value="">Type</option>
                      <option value="mail">Email</option>
                      <option value="video">Video</option>
                      <option value="queue">Waiting room</option>
                    </select>
                  </div>
                </th>
                <th className="client-date">Date</th>
                <th
                  className="client-status"
                  style={{ padding: props.searchClient && "0 0 30px 0" }}
                >
                  Status
                </th>
              </tr>
            </thead>
            {props.messageIfEmpty === "" &&
              props.paginatedExams.map((exam, index) => {
                return (
                  <tbody key={index} className="client-body">
                    <tr
                      // data-id={exam.id}
                      className="list-group"
                      style={{ fontWeight: exam.isRead && 700 }}
                      onClick={() => handleClick(exam.id, exam.exam_type)}
                    >
                      <td className="client-subject">{exam.subject}</td>
                      <td className="client-type">{exam.exam_type}</td>
                      <td className="created">
                        {exam.created && !exam.appointed_date ? (
                          <p> {moment(exam.created).format("MM/DD/YY HH:mm")}</p>
                        ) : exam.appointed_date ? (
                          <p>
                            {" "}
                            {moment(exam.appointed_date).format(
                              "MM/DD/YY HH:mm"
                            )}
                          </p>
                        ) : null}
                      </td>
                      <td className="client-status">
                        {exam.status === "Pending" ||
                        exam.status === "In the queue" ? (
                          <img
                            src={clockIcon}
                            alt="clockIcon"
                            className="pendi"
                          />
                        ) : exam.status === "Declined" ||
                          exam.status === "Canceled" ? (
                          <img
                            src={declined}
                            alt="declined"
                            className="declined"
                          />
                        ) : exam.status === "Finished" ? (
                          <GiCheckeredFlag className="finished" />
                        ) : (
                          <img src={chek} alt="ckeck" className="check" />
                        )}
                        <h5 className="status">{exam.status}</h5>
                      </td>
                    </tr>
                  </tbody>
                );
              
              })}
          </table>
          {props.messageIfEmpty !== "" && (
            <div className="NoResultDiv">{props.messageIfEmpty}</div>
          )}
        </div>
      )}

      <div className="pagi">
           <Pagination
          activePage={props.page}
          itemsCountPerPage={10}
          totalItemsCount={props.searchedUpcomingOrPast.length === 0 ? props.exams.length : props.searchedUpcomingOrPast.length}
          pageRangeDisplayed={10}
          onChange={handlePageChange}
          itemClassLast={'lastPage'}
          hideFirstLastPages={true}


        />
      </div>
</div>}
          </div>  );
      })}
  </>
)}

export default Record;
