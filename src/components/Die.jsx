import React from "react"
export default function Die(props){
    const styles={
        backgroundColor:props.isHeld?'green':''
    }
    return(
        <>
        <button 
        style={styles}
        onClick={()=>props.hold(props.id)}>
            {props.value}</button>
        </>
    )
}