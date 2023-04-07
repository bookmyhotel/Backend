
import { Switch, Route } from "react-router"
import { EditHotel } from "../Components/EditHotelDetails/EditHotel"
import { HotelDetails } from "../Components/HotelDetails/Components/HotelDetails"
import Login from "../Components/Login/Login"
import SignUp from "../Components/Login/Signup"
import { SearchPage } from "../Components/SearchPage/SearchPage"
import { Home } from "./Home"
import { AllHotels } from "../Components/Hotels/AllHotel"
import { Booking } from "../Components/Booking/Booking"

export const Routes = () => {

    return <>
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>

            <Route exact path="/register">
                <SignUp />
            </Route>

            <Route exact path="/search">
                <SearchPage />
            </Route>

            <Route path="/search/:id">
                <HotelDetails />
            </Route>

            <Route exact path="/allhotels">
                <AllHotels />
            </Route>

            <Route path="/edit/:id">
                <EditHotel />
            </Route>

            <Route path="/booking">
                <Booking />
            </Route>
        </Switch>

    </>

}