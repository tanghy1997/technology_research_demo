import axios from 'axios';
axios.defaults.withCredentials = true;
/**
 * 获取blobURL 的原始Blob对象
 * @param {*} url 
 * @param {*} callback 
 */
export function getBlob(url) { 
    // var xhr = new XMLHttpRequest()
    // xhr.open('GET', url)
    // xhr.responseType = 'blob'
    // xhr.onload = () => {
    //     callback(xhr.response)
    // }
    // xhr.send()
    return new Promise((resolve,reject) => {
        axios({
            method:'get',
            url:url,
            responseType:'blob'
        })
        .then((response) => {
            resolve( response.data );
        })
        .catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
            reject(error);
        });
    })
}

