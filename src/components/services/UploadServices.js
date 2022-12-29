import axios from 'axios';
import {urlApi} from '../../global';

class UploadServices {
    getImage(){
        return axios.get(urlApi+"get-profile-picture");
    };
    async sendImage (name,file){
        const form = new FormData();
        form.append('name',name);
        form.append('file', file, 'form-data');
        
        return await axios.post(`${urlApi}upload-profile-picture`, form,{
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
    }
};
export default new UploadServices();