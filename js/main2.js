 const api = {
    key: '740c733b54ed7e74c05425ea9b453b08',
    // url:'http://api.openweathermap.org/data/2.5/weather'}
    url:`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`}
 
    const card = document.getElementById('card')

    const city = document.getElementById('city');
    const date = document.getElementById('date');
    const tempImg = document.getElementById('temp-img');
    const temp = document.getElementById('temp');
    const weather = document.getElementById('weather');
    const range = document.getElementById('range');
    
    function updateImages(data) {
      const temp = toCelsius(data.main.temp);
      let src = 'img/tempmiddleTermometro.jpg';
      if (temp > 26) {
        src = 'img/hottemprature.jpg';
      } else if (temp < 20) {
        src = 'img/coldtemperaure.jpg';
      }
      tempImg.src = src;
    }
    
    async function search(query) {
      try {
        const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=en`);
        const data = await response.json();
       
        city.innerHTML = `${data.name}, ${data.sys.country}`;
        data.innerHTML = (new Date()).toLocaleDateString();
        temp.innerHTML = `${toCelsius(data.main.temp)}c`;
        weather.innerHTML = data.weather[0].description;
        range.innerHTML = `${toCelsius(data.main.temp_min)}c / ${toCelsius(data.main.temp_max)}c`;
        updateImages(data);
      } catch (err) {
        console.log(err);
        alert('Hubo un error');
      }
    }
    
    function toCelsius(kelvin) {
      return Math.round(kelvin - 273.15);
    }
    
    function onSubmit(event) {
      event.preventDefault();
      search(searchbox.value);
    }
    
    const searchform = document.getElementById('search-form');
    const searchbox = document.getElementById('searchbox');
    searchform.addEventListener('submit', onSubmit, true);
    
    