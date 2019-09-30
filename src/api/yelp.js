import axios from 'axios';

//base URL - we can now import this file in multiple locations 
export default axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: 'Bearer _Siv6nlm299r4PJjwMd9oa5pQFRN1kZaqpdoFtOIxp9sAsQnL4OOZXAvgSQNNMLDO9ggmYaGsoIPRMHL6NHTv3KuoAM3TVUWLeJU2_FAUppH9cvegapANdkvwS2OXXYx'
    }
});
