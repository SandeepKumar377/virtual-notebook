import React,{useState} from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
    const [credentials, setCredentials] = useState({email:"", password:""})
    let history = useHistory();

    const userLogin = async (e) => {
        e.preventDefault();
        let url = "http://localhost:5000/api/auth/login"
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json', 
            },
            body: JSON.stringify({email:credentials.email, password:credentials.password})
        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            history.push("/")
        }
        else{
            alert("Please inter correct Credentials!")
        }
    }
    const setValueOnChange=(e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

return (
    <div className="container d-flex justify-content-center">
        <form className="my-4 col-sm-6" onSubmit={userLogin} >
            <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control" onChange={setValueOnChange} value={credentials.email} id="email" name="email" />
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" onChange={setValueOnChange} value={credentials.password} id="password" name="password" />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    </div>
)
}
export default Login