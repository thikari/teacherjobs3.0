const osmosis = require('osmosis');
const host = 'https://jobs.theguardian.com/';
const scrapPath = 'jobs/schools/africa/';
const helper = require ('./helper')();

module.exports = (database, saveData) => {
    const JobList = database.model('JobList');

    return {
        scrape: () => {

            osmosis
                .get('https://jobs.theguardian.com/jobsrss/?Industry=600350&LocationId=1&countrycode=GB')
                .find('item')


                .set({
                    'position': "title",
                    'location': "",
                    'description': "description",
                    'apply': "guid"
                })


                .data(function (data) {
                    let categories = [];
                    data.description = data.description || 'No description provided';
                    categories = helper.getTags(data.description && data.position);
                    data.category = categories.length > 0 ? categories : [];
                    return data;
                })
                .then(function (err, data) {
                    saveData(data);
                });
        }
    }
}