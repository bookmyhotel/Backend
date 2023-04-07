import { useState } from "react"
import { Logout } from "../Login/Login"
import styles from "./Profile.module.css"


export const Profile = () => {
    const data = JSON.parse(localStorage.getItem("login"))
    const [logout, setLogout] = useState(false)
    let userData
    if (data) {
        if(data.email){
          userData ={
            name :data.email,
            imageUrl :"/profile.png"
          }
        }else{
            userData = data
        }
    }
    else {
        userData = {
            imageUrl: "#",
            name: ""
        }
    }
    const handleLogout = () => {
        localStorage.removeItem("login")
        document.location.href = "/"
        alert("Successfully Logged Out")
    }

    return <>
        <div className={styles.profile} onClick={() => setLogout(!logout)}>
            <div>
                <img src={userData.imageUrl} alt="userprofile" />
            </div>
            <div>
                <h4>{userData.name}</h4>
            </div>
        </div>
        {

            logout && <div className={styles.logout} onClick={() => handleLogout()} >
                <Logout />
            </div>
        }

    </>
}