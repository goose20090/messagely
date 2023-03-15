import React from "react";
import BeatLoader from 'react-spinners/BeatLoader'

function Loader(){
    return(
        <div className="flex flex-col items-center justify-center h-screen">
            <BeatLoader color= {"rgb(54, 215,183"}/>
        </div>
    )
}

export default Loader;