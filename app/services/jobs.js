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
        response.json().then((data) => {
            if (response.ok) {
                callback(null, data);
            } else {
                callback('error');
            }
        });
    })
    .catch((error) => {
       console.log(error);
    });
}

// This methods gets jobs from the server
function getJobs(pageInfo, callback) {
    console.log(pageInfo);
    fetch(buildJobsUrl(pageInfo), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
    .then((response) => {
        response.json().then((data) => {
            if (response.ok) {
                callback(null, data);
            } else {
                callback({});
            }
        });
    })
    .catch((error) => {
       console.log(error);
    });
}

//This method builds the url for getting jobs
function buildJobsUrl(pageInfo) {
    let baseUrl = '/api/jobs?';

    //Append filters query to the end of the url
    Object.keys(pageInfo.filters).forEach((filterKey) => {
        if(filterKey == 'categories') {
            pageInfo.filters[filterKey] = JSON.stringify(pageInfo.filters[filterKey]);
        }
        let query = `${filterKey}=${pageInfo.filters[filterKey]}&`;
        baseUrl += query;
    });

    // Remove the last '&'
    baseUrl = baseUrl.substr(0, baseUrl.length - 1);

    //append pagination query to the url stringify
    Object.keys(pageInfo.pagination).forEach((key) => {
        if(key != 'totalItems') {
            let query = `&${key}=${pageInfo.pagination[key]}`;
            baseUrl += query;
        }
    });
    console.log(baseUrl);
    return baseUrl;
}



export default {
    getFilterObj,
    getJobs
}