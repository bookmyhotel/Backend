import React, { useEffect, useState } from "react";
import styles from "../SearchData/DataComponent.module.css";
import { Link } from "react-router-dom";
import { User } from "../UserData/UserData.jsx";
import { deleteHotel } from "../../Utils/HotelData";



const DataComponent = ({ url, id,  price, name, city, facilities, review, rating,  availableRooms, discount, handleHotelDelete }) => {
  const [user, setuser] = useState(null);
  const lab = "See Availability >";
  const handleDelete = async (id) => {
    let confirmation = window.confirm("Are you sure to delete this hotel ")
    if (confirmation) {
      await deleteHotel(id);
      await handleHotelDelete();
    }
  }
  useEffect(() => {
    setuser(User());
    console.log(user);
  }, [])
  return (
    <div className={styles.maindiv}>
      <div className={styles.imgdiv}>
        <img src={url} alt="imageofHotel" />
      </div>
      <div className={styles.datadiv}>
        <div className={styles.hotelName}>
          <h3 className={styles.h3}>{name}</h3>
          {
            user && user.role == "ADMIN" && <div className={styles.adminActionIcons}>
              <Link to={`/edit/${id}`} title="edit hotel">
                <svg height="24" fill="green" viewBox="0 96 960 960" width="24"><path d="M209 857h40l335-336-40-40-335 336v40Zm567-393L601 290l28-29q37-38 88.5-38.5T807 259l21 21q31 29 29 67t-29 65l-52 52Zm-57 58L289 952H113V777l430-430 176 175Zm-154-21-21-20 40 40-19-20Z" /></svg>
              </Link>
              <span title="delete hotel" onClick={() => handleDelete(id)}>
                <svg height="24" cursor="pointer" fill="red" viewBox="0 96 960 960" width="24"><path d="M267 982q-57 0-96.5-39.5T131 846V345H68V209h268v-66h287v66h269v136h-63v501q0 57.125-39.438 96.562Q750.125 982 693 982H267Zm426-637H267v501h426V345ZM334 777h113V414H334v363Zm180 0h113V414H514v363ZM267 345v501-501Z" /></svg>
              </span>
            </div>
          }
        </div>

        <div
          style={{
            display: "flex",
            textAlign: "left"
          }}
        >
          <a href={"http://maps.google.com/?q=" + city}
            target="_blank"
            style={{
              color: "#0071C2",
              textDecoration: "underline",
              cursor: "pointer",
              display: "inline-block",
              marginBottom: "5px"
            }}
          >
            {city}
          </a>
          <p style={{
            display: "inline-block"
          }}

          ></p>
        </div>
        <div style={{flexWrap:"wrap"}}>
        { 
          facilities.map((el) => {
           return <p
              style={{
                padding: "0",
                marginTop: "3px",
                marginBottom: "0",
              }}
            >
              {el.facility} - <span  style={{color:"green", fontWeight:"bold"
              }}>{el.status && "FREE"}</span> 
              <span style={{color:"red", fontWeight:"normal"
              }}> {!el.status && "CHARGABLE"}</span>
            </p>
          })
        }
        </div>
        <p
          style={{
            padding: "0",
            margin: "0",
            fontSize: "13px",
            color: "green",
            marginTop: "6px",
          }}
        >
          You can cancel later, so lock in this great price today!
        </p>
        <h5 style={{ color: "brown", padding: "0", marginTop: "2px" }}>
          Only {availableRooms} rooms left at this price on our site
        </h5>
      </div>
      <div>
        <div style={{ display: "flex", marginTop: "-35px" }}>
          <div style={{ marginRight: "3px" }}>
            <h5 style={{ padding: "0", margin: "0", marginTop: "5px", fontSize: "16px", textAlign: "right" }}>
              {review}
            </h5>
            <p
              style={{
                padding: "0",
                margin: "0",
                color: "gray",
                fontSize: "13px",
              }}
            >
               Reviews
            </p>
          </div>
          <div
            style={{
              backgroundColor: "#003580",
              color: "white",
              padding: "15px",
              marginLeft: "5px",
              marginTop: "12px",
              fontWeight: "bold",
              borderRadius: "5px 5px 5px 5px",
            }}
          >
            {rating}
          </div>
        </div>

        <div style={{ textAlign: "right", marginTop: "-115px" }}>
          <p style={{ margin: "0", padding: "0" }}>
            <span
              style={{
                color: "red",
                textDecoration: "line-through",
                fontSize: "14px",
              }}
            >
              £ {price}
            </span>
            <span style={{ fontSize: "22px", fontWeight: "600" }}>  £ {discount}</span>
          </p>
          <p
            style={{
              padding: "0",
              margin: "0",
              color: "gray",
              fontSize: "13px",
            }}
          >
            tax and all
          </p>
          <Link to={`/search/${id}`}>
            <button
              style={{
                backgroundColor: "#0071C2",
                color: "white",
                border: "none",
                borderRadius: "3px",
                padding: "15px",
                marginTop: "10px",
                cursor: "pointer",
                marginBottom:"10px"
              }}
            >
              {lab}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export { DataComponent };
