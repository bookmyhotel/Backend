import React, { useEffect, useState } from "react";
import styles from "../SearchData/DataComponent.module.css";
import { User } from "../UserData/UserData.jsx";



export const BookingDetails = ({ hotelImage, hotelName, hotelCity, checkinDate, checkoutDate}) => {
  const [user, setuser] = useState(null);
  
  useEffect(() => {
    setuser(User());
    console.log(user);
  }, [])
  return (
    <div className={styles.maindiv}>
      <div className={styles.imgdiv}>
        <img src={hotelImage} alt="imageofHotel" />
      </div>
      <div className={styles.datadiv}>
      <div className={styles.hotelName}>
          <h3 className={styles.h3}>{hotelName}</h3>
      </div>
      <div
          style={{
            display: "flex",
            textAlign: "left"
          }}
        >
          <a href={"http://maps.google.com/?q=" + hotelCity}
            target="_blank"
            style={{
              color: "#0071C2",
              textDecoration: "underline",
              cursor: "pointer",
              display: "inline-block",
              marginBottom: "5px"
            }}
          >
            {hotelCity}
          </a>
          <p style={{
            display: "inline-block"
          }}

          ></p>
        </div>
        <div style={{flexWrap:"wrap"}}>
            <p
              style={{
                padding: "0",
                marginTop: "3px",
                marginBottom: "0",
              }}
            >
              Check-in - <span  style={{color:"green", fontWeight:"bold"
              }}>{checkinDate}</span> <br />
             
             Check-out - <span style={{color:"green", fontWeight:"bold"
              }}> {checkoutDate}</span>
            </p>
        </div>
      </div>
      <div>
    

        <div style={{ textAlign: "right", marginTop: "-115px" }}>
          <p style={{ margin: "0", padding: "0" }}>
            <span
              style={{
                color: "red",
                textDecoration: "line-through",
                fontSize: "14px",
              }}
            >
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

