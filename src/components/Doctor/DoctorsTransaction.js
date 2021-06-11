import React from 'react'


function DoctorsTransaction({ props, handlePage, handleChange, handleImage, userLogin, saveBankAccountNumber }) {
    return (
        <>
            <div className='mainTransactionDiv'>

                <div className="newVideo">
                    <div className='profileDoc' style={{ borderBottom: props.page === 'bankAccount' && '4px solid #fa9551' }} onClick={() => { handlePage('bankAccount') }}>
                        <h4 style={{ fontWeight: props.page === 'bankAccount' && 'bold' }}>Bank Account</h4>
                    </div>
                    <div className='profileDoc' style={{ borderBottom: props.page === 'transactions' && '4px solid #fa9551' }} onClick={() => { handlePage('transactions') }} >
                        <h4 style={{ fontWeight: props.page === 'transactions' && 'bold' }}>Transactions</h4>
                    </div>
                </div>
            </div>
            {props.page === 'bankAccount' && <div className="mainBancAcount">
                <div className="doctor">
                    <label htmlFor="Number">Bank account number</label>
                    <input id='Number' value={props.accountNumber} onChange={handleChange} autoComplete="off" type="number" />
                    {/* <label htmlFor="Password">Password</label>
                    <div className='imageAndInputDiv'>
                        <input id='Password' value={props.Password} onChange={handleChange} autoComplete="off" type={props.seePass ? 'text' : "password"} />
                    </div> */}
                    <button onClick={saveBankAccountNumber}>Save</button>
                </div>

            </div>}
        </>
    )
}

export default DoctorsTransaction
