import React from 'react'

const LoginUser = ({emailValue, passwordValue, submitted, handleEmail, handlePassword, handleSubmit}) => {
    return (
        <div className="row">
            <form className="form-horizontal">
                <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="email">Email:</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="email" placeholder="Enter email" value={emailValue} onChange={handleEmail}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" htmlFor="pwd">Password:</label>
                    <div className="col-sm-10"> 
                        <input type="password" className="form-control" id="pwd" placeholder="Enter password" value={passwordValue} onChange={handlePassword}/>
                    </div>
                </div>
                <div className="form-group"> 
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit" className="btn btn-default" value={submitted} onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginUser;
