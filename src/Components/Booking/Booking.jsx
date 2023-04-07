import { useEffect, useState } from "react";
import styles from "./Booking.module.css";
import { ProgressBar } from 'react-loader-spinner';
import { Navbar } from "../Navbar/Navbar";
import FooterBlue from "../Footer/FooterBlue";
import { BookingDetails } from "../SearchData/BookingDetails";
import { getAllTransactions } from "../../Utils/HotelData";


export const Booking = () => {
    const [loader, setLoader] = useState(false);
    const [transactions, setTransactions] =useState([]);
    
    async function getTransactions(){
        setLoader(true);
        let res = await getAllTransactions();
        setTransactions(res.result);
        setLoader(false);
        console.log(res);
    }
    useEffect(()=>{
      getTransactions();
    },[])


    return <>
        <div>
       <Navbar />
        </div>
        {loader && <div className={styles.loader}>
            <ProgressBar
                height="80"
                width="80"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass="progress-bar-wrapper"
                borderColor='#003580'
                barColor='#006FBF'
            />
        </div>}
        {
            (!transactions || transactions.length <= 0)  && <div style={{textAlign:"center", margin:"10px"}}>No transactions</div>
        }
        <div style={{maxWidth:"80%", margin:"auto", marginTop:"10px"}}>
        {
            transactions.map((el)=>{
                let checkinDate = el.startDate.substring(0,16);
                let checkOutDate = el.endDate.substring(0,16);
                return  <BookingDetails 
                checkinDate={checkinDate} checkoutDate={checkOutDate}
                hotelName={el.hotelDetails.name} hotelImage={el.hotelDetails.url}
                hotelCity={el.hotelDetails.city}/> 
            })
        }
        </div>
        <FooterBlue />

    </>
}