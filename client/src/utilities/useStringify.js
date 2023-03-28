import { useContext } from "react";
import { UserContext } from "../context/user";

function useStringify(users){
     
    const {user} = useContext(UserContext)
    if (!users){
        return
    }


    const usernames = users.map((user)=> user.username)
    const uniqueUsernames = Array.from(new Set(usernames))

    let string = ""

    for (let i = 0; i < uniqueUsernames.length; i++) {
        let usernameStr
        if (uniqueUsernames[i] === user.username){
            usernameStr = 'Me'
        }
        else {
            usernameStr = uniqueUsernames[i]
        }
        switch (i) {
            case uniqueUsernames.length - 1:
                string += `and ${usernameStr}`;
                break;
            case uniqueUsernames.length - 2:
                string += `${usernameStr} `;
                break;
            default:
                string += `${usernameStr}, `;
        }
    }
    return string
}

export default useStringify