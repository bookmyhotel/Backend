import { useEffect, useState } from "react";
import { HotelData, AllHotelData } from "../../Utils/HotelData";
import FooterBlue from "../Footer/FooterBlue";
import { Navbar } from "../Navbar/Navbar";
import { DataComponent } from "../SearchData/DataComponent";
import { FilterFeature } from "./FilterFeature";
import { SearchRequest } from "./SearchRequest";
import styles from "./SearchRequest.module.css";
import { ProgressBar } from 'react-loader-spinner';

export const SearchPage = () => {
    const [initialHoteldata, setInitialHoteldata] = useState([]);
    const [loader, setLoader] = useState(true);
    const [showData, setShowData] = useState()
    const [price, setPrice] = useState(false);
    const [star, setStar] = useState(false);
    const [query, setQuery] = useState("");
    
   async function allHotels() {
       setLoader(true);
       let res = await AllHotelData();
        setInitialHoteldata(res.result);
        console.log(res.result);
        setLoader(false);
        setShowData(res.result)
        return res;
    }
   const handleHotelDelete =()=>{
    allHotels();
   }
    useEffect(() => {
         allHotels()
        let q = window.location.search;
        console.clear();
        q = q && q.replace("?hotel=", "");
        console.log(decodeURIComponent(q));
        setQuery(decodeURIComponent(q));
    }, [])

    const filterPrice = (e) => {

        if (e.target.name === "price") {
            if (Number(e.target.value) === 1500) {

                const filteredAbove1500 = initialHoteldata.filter((el) => {

                    return (Number(el.rooms.price) > 1500)
                })
                setShowData([...filteredAbove1500])
            }
            else if (Number(e.target.value) === 1000) {

                const filteredAbove1500 = initialHoteldata.filter((el) => {

                    return ((Number(el.rooms.price) >= 1000) && (Number(el.rooms.price) < 1500));
                })
                setShowData([...filteredAbove1500])
            }
            else if (Number(e.target.value) === 0) {

                const filteredAbove1500 = initialHoteldata.filter((el) => {

                    return (Number(el.rooms.price) <= 1000)
                })
                setShowData([...filteredAbove1500])
            }

            setPrice(!price)
        }
        else {
            setShowData(initialHoteldata)
        }

    }
    const filterStar = (e) => {

        if (price) {
            const filteredAbove1500 = showData.filter((el) => {

                return (Number(el.rating) === Number(e.target.value))
            })
            setShowData([...filteredAbove1500])
        }

        else {

            const filteredAbove1500 = initialHoteldata.filter((el) => {

                return (Number(el.rating) === Number(e.target.value))
            })
            setShowData([...filteredAbove1500])
        }

        setStar(!star)
    }
    const filterPolicy = (e) => {
        if (star || price) {

            if (e.target.value === "cancellation") {

                const filteredAbove1500 = showData.filter((el) => {

                    return (el.cancellation === "Free")
                })
                setShowData([...filteredAbove1500])
            }
            if (e.target.value === "breakFast") {

                const filteredAbove1500 = showData.filter((el) => {

                    return (el.breakFast === "Included")
                })
                setShowData([...filteredAbove1500])
            }
        }
        else {
            if (e.target.value === "cancellation") {

                const filteredAbove1500 = initialHoteldata.filter((el) => {

                    return (el.cancellation === "Free")
                })
                setShowData([...filteredAbove1500])
            }
            if (e.target.value === "breakFast") {

                const filteredAbove1500 = initialHoteldata.filter((el) => {

                    return (el.breakFast === "Included")
                })
                setShowData([...filteredAbove1500])
            }
        }
    }
    const filterSearch = (search) => {

        const filteredData = initialHoteldata.filter((e) => {
            return (e.name.toLowerCase().includes(search.toLowerCase()))
        })
        setShowData(filteredData)
    }
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
        <div className={styles.serachPageContainer} >
            <div className={styles.left}>
                <SearchRequest filterSearch={filterSearch} query={query} />
                <FilterFeature filterPrice={filterPrice} filterStar={filterStar} filterPolicy={filterPolicy} />
            </div>

            <div className={styles.hotelListContainer}>
                {showData && showData.length <= 0 && <div style={{ fontWeight: "bold", textAlign: "center", marginRight: "100px" }}>
                    No hotels found
                </div>
                }

                {
                   showData && showData.map((e, i) => {
                        return <DataComponent url={e.url}
                        key={e.id}
                        name={e.name} city={e.city} distance={e.distance}
                        bedSize={e.bedSize}
                        facilities={e.facilities}
                        review={e.review}
                        rating={e.rating}
                        breakFast={e.breakFast}
                        availability={e.availability}
                        availableRooms={e.availableRooms}
                        price={e.rooms.price}
                        discount={(Number(e.rooms.price) - Number(e.rooms.discount) * Number(e.rooms.price) / 100)}
                        id={e.id}
                        view={e.view}
                        handleHotelDelete={handleHotelDelete}
                        />


                    })
                }

                {/* </ul> */}

            </div>
        </div>

        <FooterBlue />

    </>
}