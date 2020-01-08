import React from 'react';
import '../../assets/dashboard.scss'; 


const Dashboard = ({exams, clients, handleClick}) => (
        <div>
            <table className="table1">
                <thead className="thead">
                    <tr className="trow">
                        <th className='client'>Client</th>
                        <th className='subject'>Subject</th>
                        <th className='created'>Created</th>
                        <th className='status'>Status</th>
                    </tr>    
                </thead>
                {exams.map(exam => {
                    return(
                    <tbody key={exam.exam} className="tbody">
                        <tr key={exam.exam} data-id={exam.exam} className="list-group" onClick={handleClick.bind(this)}>         
                            <td className="client">{exam.client}</td>
                            <td className='subject'>{exam.subject}</td>
                            <td className='created'>{exam.created}</td>
                            <td className='status'>{exam.status}</td>                 
                        </tr>
                    </tbody>
                    )}
                )}
            </table>
            
            {/* <div className="row2">
                <ul className="nav nav-pills">
                    <li className="disabled"><a href="#list">Clients</a></li>
                </ul>
                {clients.map(client => {
                    return (
                        <div key={client.id} className="list-group">
                            <a href="/client" className="list-group-item">{client.client}</a>
                        </div>
                    )
                })}
            </div> */}
        </div>
);

export default Dashboard;