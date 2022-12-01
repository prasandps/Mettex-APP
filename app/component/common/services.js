import axios from 'axios';
import { BASEURL } from '../../config';

export const getMethod = async (url) => {
    return await axios.get(BASEURL + url);
}

export const postMethod = async (obj) => {
    var formData = new FormData();
    for (const property in obj.data) {
        formData.append(property, obj.data[property]);
    }
    return await axios({
        url: BASEURL + obj.url,
        method: "POST",
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}