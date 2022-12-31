import axios from 'axios';
import { urlApi } from '../../global';
export const getUserID =async()=>{
    try {
        if(localStorage.getItem('token')){
            const getUserID = await axios.get(urlApi + 'get-user-id', { headers: { 'Authorization': localStorage.getItem('token') } })

            if (getUserID && getUserID.data.code !== 401) {
                return {...getUserID.data, status: 200};
    
            } else if (getUserID.data.code === 401) {
               
                return {status: 401}
            };
        }else{
            return{status: 401}
        }
       
    } catch (err) {
       return err
    }
};