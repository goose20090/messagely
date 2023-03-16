import React from "react";

function useStringify(users){

    const usernames = users.map((user)=> user.username)
    const unique = Array.from(new Set(usernames))

    let string = ""

    for( let i = 0; i < unique.length; i++ ){
        
        if(i === (unique.length - 1)){
            string += `and ${unique[i]}`
        }

        else if (i === (unique.length - 2)){
            string += `${unique[i]} `
        }
        else{
            string+= `${unique[i]}, `
        }

        
    }
    return string
}

export default useStringify