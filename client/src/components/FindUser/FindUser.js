import React from "react";

const FindUser = () =>{
  return(
    <>
      <Col size="md-6 sm-12">
      <Card title="Find a User by Username">
          <form className="form-inline">
            <input className="form-control mr-sm-2" type="search" placeholder="Search User" aria-label="Search"/>
            <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">Search</button>
          </form>
      </Card>
    </Col>
    </>
  )
}

export default FindUser;