import fetch from 'isomorphic-fetch';

// This method gets the filters data from the server
function getFilterObj(callback) {
    fetch('/api/filters', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
    .then((response) => {
        return response.json().then((data) => {
            if (response.ok) {
                callback(null, data);
            } else {
                callback({});
            }
        });
    })
    .catch((error) => {
       callback(error);
    });
}

// This methods gets jobs from the server
function getJobs(filters, callback) {
    callback(null, {});
}



export default {
    getFilterObj,
    getJobs
}