import React from "react"
import Notes from "./Notes"

const Home = () => {
    return (
        <>
            <div className="container">
                <h2>Add Notes</h2>
                <form className="my-5">
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
            <div className="container">
                <Notes />
            </div>

        </>
    )
}
export default Home