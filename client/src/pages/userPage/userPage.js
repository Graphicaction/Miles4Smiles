import React from "react";
import UserCard from "../../components/UserCard/UserCard";
import RunningStats from "../RunningStats";
import {Container} from "../../components/Grid"


const UserPage =() => {
  return(
    <>
    <Container>
      <UserCard />
      <RunningStats />
    </Container>
    </>
  )
}

export default UserPage;