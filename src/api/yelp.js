import axios from 'axios';

//base URL - we can now import this file in multiple locations 
export default axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses',

});
