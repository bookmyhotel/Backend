export const User = ()=>{
    let user = JSON.parse(localStorage.getItem("login"));
    if(!user){
        user = {
            "email":null,
            "name":null,
            "role":"USER"

        }
    }
    console.log(user, "user");
    return user
}