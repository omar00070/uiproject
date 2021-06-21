import axios from 'axios';


const URL_PATH = "http://127.0.0.1:8000/uploadfile/"

export const get_string = (imageFormData) => {
    return axios.post(URL_PATH, imageFormData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
