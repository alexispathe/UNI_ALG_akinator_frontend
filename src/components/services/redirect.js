export const redirectPage = (route)=>{
    localStorage.clear();
    window.location.href = route;
};