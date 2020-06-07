import React, {useState, useContext, useEffect} from "react";
import API from "../../utils/API";
import LossCard from "./LossCard";

function ViewLosses(props) {
    const losses = props.losses;


    return (
        <>
        <div className="row">
            {props.losses.map((loss, i) => ( 
                <LossCard loss={loss} id={loss._id} lossId={i}/>
            ))}
        </div>
        </>
  )
}

export default ViewLosses;