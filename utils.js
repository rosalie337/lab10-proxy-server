function mungedWeather(weatherData) {

  const weather = weatherData.data.map(item => {
        
    return {
      forecast: item.weather.description,
      time: item.valid_date

    }; 

  }); 
  return weather.slice(0, 7); // weather forecast for 7-days
}

function mungedLocation(location) {
  return {

    formatted_query: location[0].display_name,
    latitude: location[0].lat,
    longitude: location[0].lon
  };
}

function mungedHiking(trails) {
  let hikingArray = trails.trails.map((trail) => {

    return {
      
      name: trail.name,
      location: trail.location,
      length: trail.length,
      stars: trail.stars,
      votes: trail.starVotes,
      summary: trail.summary,
      url: trail.url,
      conditions: trail.conditionDetails,
      conditionDate: trail.conditionDate
    };
    
  });
  return hikingArray.slice(0, 1);
}

module.exports = {
  mungedWeather, mungedLocation, mungedHiking
};
