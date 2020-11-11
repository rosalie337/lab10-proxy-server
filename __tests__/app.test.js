const { mungedWeather, mungedLocation, mungedHiking, mungedYelp } = require('../utils.js');
const weatherData = require('../data/weather.json');
const yelpData = require('../data/yelp.json');
const locationData = require('../data/location.json');
// const yelpData = require('../data/yelp.js');
const hikingData = require('../data/hiking');

describe('app weather', () => {
  test ('mungedWeather', () => {
  
    // const displayWeather = data.map((item) => item.weather.description);
    const expectation = [{ 'forecast': 'Broken clouds',
      'time': '2020-11-09',
    },
    {
      'forecast': 'Overcast clouds',
      'time': '2020-11-10',
    },
    {
      'forecast': 'Light rain',
      'time': '2020-11-11',
    },
    {
      'forecast': 'Overcast clouds',
      'time': '2020-11-12',
    },
    {
      'forecast': 'Overcast clouds',
      'time': '2020-11-13',
    },
    {
      'forecast': 'Few clouds',
      'time': '2020-11-14',
    },
    {
      'forecast': 'Heavy rain',
      'time': '2020-11-15',
    },
    ];

    const actual = mungedWeather(weatherData);
      
    expect(actual).toEqual(expectation);
  });
  test ('mungedYelp', () => {
  
    const expectation = [{ 
      'image_url': 'https://s3-media4.fl.yelpcdn.com/bphoto/qHrzQy5ih2Sjhn7MdsCASw/o.jpg', 
      'name': 'Voodoo Doughnut - Old Town', 
      'price': '$',
      'rating': 3.5,
      'url': 'https://www.yelp.com/biz/voodoo-doughnut-old-town-portland-2?adjust_creative=hfNg_5sfkuGir-cePTGo8A&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=hfNg_5sfkuGir-cePTGo8A'
    }];

    const actual = mungedYelp(yelpData);
      
    expect(actual).toEqual(expectation);
  });

  test ('mungedWeather', () => {
  
    const expectation = { 'formatted_query': 'Portland, Multnomah County, Oregon, USA',
      'latitude': '45.5202471', 'longitude': '-122.6741949' };

    const actual = mungedLocation(locationData);
      
    expect(actual).toEqual(expectation);
  });

  test ('mungedHiking', () => {
  
    const expectation = [{
      'name': 'Enchantments Traverse',
      'location': 'Leavenworth, Washington',
      'length': 19.1,
      'votes': 77,
      'stars': 4.9,
      'summary': 'An extraordinary hike that takes you through all of the beauty that the Enchantments have to offer!',
      'url': 'https://www.hikingproject.com/trail/7005246/enchantments-traverse',
      'conditions': 'Dry',
      'conditionDate': '2020-10-13 14:06:06', 
    }];

    const actual = mungedHiking(hikingData);
      
    expect(actual).toEqual(expectation);
  });
  
});
