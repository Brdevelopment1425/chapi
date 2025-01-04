const axios = require('axios');

const API_KEY = 'e6635573ada6cccbffccd3d7e429e1f9';

const weatherApi = async (req, res) => {
    const { city, postalCode, countryCode = 'tr' } = req.query;

    if (!city && !postalCode) {
        return res.status(400).json({ error: 'Lütfen şehir ismi veya posta kodu sağlayın.' });
    }

    const queryParams = city
        ? { query: city, access_key: API_KEY, units: 'm', language: 'tr' }
        : { query: `${postalCode},${countryCode}`, access_key: API_KEY, units: 'm', language: 'tr' };

    try {
        const response = await axios.get(`http://api.weatherstack.com/current`, {
            params: queryParams,
        });

        const weatherData = response.data;

        if (!weatherData.current) {
            return res.status(404).json({ error: 'Geçersiz şehir veya posta kodu.' });
        }

        const weatherIcon = weatherData.current.weather_icons ? weatherData.current.weather_icons[0] : null;

        return res.status(200).json({
            city: weatherData.location.name,
            country: weatherData.location.country,
            temperature: weatherData.current.temperature,
            feels_like: weatherData.current.feelslike,
            description: weatherData.current.weather_descriptions[0],
            humidity: weatherData.current.humidity,
            wind_speed: weatherData.current.wind_speed,
            pressure: weatherData.current.pressure,
            precipitation: weatherData.current.precip,
            icon: weatherIcon,
        });
    } catch (error) {
        return res.status(500).json({ error: 'API isteği sırasında bir hata oluştu.' });
    }
};

module.exports = {
    premium: false,
    function: (req, res) => {
        weatherApi(req, res);
    }
};
