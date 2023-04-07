import { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { reserveRoom } from '../../../../Utils/HotelData'
import { useHistory } from 'react-router-dom'
import { ProgressBar } from 'react-loader-spinner'
const Div = styled.div`
width:100%;
margin-bottom:20px;

`
const Loader = styled.div`
display: flex;
width: 100%;
background: #f0f8ffa3;
position: fixed;
top:0px;
left:0px;
height: 99vh;
z-index: 100;
align-items: center;
justify-content: center;
`
const H1 = styled.div`
    font-size: 21px;
    line-height: 32px;
    font-weight: 600;
    color: #333;
    margin:10px 0;

    `
const Cont = styled.div`
    width: 100%;
    border: 1px solid #ccc7c7a6;
    border-radius: 3px;
    padding:2%;
    `

const DataDiv = styled.div`
    &{
        margin:10px;
        border-bottom:1px solid gray;
        padding-bottom:10px;
    }
    & input, select{
        margin-bottom:5px;
        outline:none;
        border:1px solid #0071c2;
        border-radius:5px;
        padding:5px;
        font-size:15px;
        font-weight:bold;
    }
    p{
    margin: 0 0 4px;
    font-size: 14px;
    font-weight: 700;
    padding: 0;
    }
    h1{
        color: #0071c2;
    font-weight: bold;
    font-size: 17px;
    border-bottom: 0;
    text-align: left;
   
    }
    `
const Last = styled.div`
        color: #6b6b6b;
        display: block;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    `
const Button = styled.div`
    background-color: #0071c2;
    border: 1px solid #0071c2;
    border-radius: 2px;
    color:#ffff;
    font-size: 14px;
    font-weight: 500;
    height:20px;
    justify-content: center;
    text-align: left;
    padding: 8px 16px;
    cursor: pointer;
    margin:10px;
    text-align:center;
`
const Tag = styled.div`
  display:flex;
    justify-content:flex-end;

  	align-items: center;

p{
    font-style: italic;
    color: #333!important;
    text-decoration: none;
    font-weight: bold;
    text-align: right;
    margin-left: 5px;
    font-size:12px;
}

img{
    width:16px;
    height:16px;
}


`
export const Availability = ({hotel}) => {
    const nowDate = new Date().toJSON();
    const [reserve, setReserve] = useState(false)
    const [user, setUser] = useState(false);
    const [checkInDate, setCheckInDate] = useState(nowDate.substring(0,16));
    const [checkOutDate, setCheckOutDate] = useState(nowDate.substring(0,16));
    const [loader, setLoader] = useState(false);
    const [guest, setGuest] = useState(1);
    const [rooms, setRooms] = useState(1);
    const history = useHistory();

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("login"));
        if (data) {
            setUser(true)
        }
        else {
            setUser(false)
        }
    }, [])

    const handleClick = async() => {
        var date1 = new Date(checkInDate);
        var date2 = new Date(checkOutDate);
        var Difference_In_Time = date2.getTime() - date1.getTime();
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        if(!user){
            alert("Please login first");
            history.push("/login");
        }
        let roomAvailable = hotel.rooms.filter((room)=> room.status  == "AVAILABLE");
        if(roomAvailable.length <= 0){
            alert("No rooms are available");
        }else{
            let payload = {
                roomId: roomAvailable[0].id,
                hotelId:roomAvailable[0].hotelId,
                days:Math.floor(Difference_In_Days) + 1
            }
            setLoader(true);
            let res = await reserveRoom(payload);
            setLoader(false);
            if(res.status){
                alert("Congratulations! You Rooms has been booked successfully ")
            }else{
                alert("Something went wrong please try again!!")
            }
            console.log(res);
        }
    }
  const handleCheckInDateChange = (e)=>{
  setCheckInDate(e.target.value);
  }
  const handleCheckOutDateChange = (e)=>{
  setCheckOutDate(e.target.value);
  }
  const handleGuest = (e)=>{
   setGuest(e.target.value);
  }
    return (
        <Div>
              {loader && <Loader>
                <ProgressBar
                    height="80"
                    width="80"
                    ariaLabel="progress-bar-loading"
                    wrapperStyle={{}}
                    wrapperClass="progress-bar-wrapper"
                    borderColor='#003580'
                    barColor='#006FBF'
                />
            </Loader>}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <H1>Availability</H1>
                <Tag>
                    <img src="https://cf.bstatic.com/static/img/bpg/bpg_logo_retina/b4785e81dfbdb3907f75887373d5920d3dc3b245.png" alt="tag" />
                    <p>We Price Match</p>

                </Tag>
            </div>
            <Cont>
                <div>
                    <DataDiv>
                        <p>Check-in date</p>
                        <h1>{checkInDate.replace("T", " ")}</h1>
                        <input type="datetime-local" value={checkInDate} onChange={handleCheckInDateChange}/>
                        <Last>From 2:00 PM</Last>

                    </DataDiv>
                    <DataDiv>
                        <p>Check-out date</p>
                        <h1>{checkOutDate.replace("T", " ")}</h1>
                        <input type="datetime-local" onChange={handleCheckOutDateChange} value={checkOutDate}/>
                        <Last>2-week stay</Last>
                    </DataDiv>
                </div>
                <div>
                    <DataDiv style={{border:"none"}}>
                        <p>Guests</p>
                        <h1>{guest} adults</h1>
                        <select onChange={handleGuest} value={guest}>
                            <option value="1">1 Adult</option>
                            <option value="2">2 Adults</option>
                            <option value="3">3 Adults</option>
                            <option value="4">4 Adults</option>
                        </select>
                    </DataDiv>
                    <DataDiv style={{border:"none"}}>
                        <p>Rooms</p>
                        <h1>{rooms} room</h1>
                        <select onChange={(e)=> setRooms(e.target.value)} value={rooms}>
                            <option value="1">1 </option>
                            <option value="2">2 </option>
                            <option value="3">3 </option>
                            <option value="4">4 </option>
                        </select>
                    </DataDiv>
                    <Button onClick={handleClick}>
                        {
                          "Reserve"
                        }
                    </Button>
                </div>
            </Cont>

        </Div>
    )
}