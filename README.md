# Weather App

A simple weather application built with React and Material UI. It fetches real-time weather data based on your current location using the [WeatherAPI.com](https://www.weatherapi.com/) service.

## Features

- Detects your current location using the browser's geolocation API
- Displays current weather, temperature, and forecast
- Responsive and modern UI with Material UI components

## Getting Started

### Prerequisites

- Node.js (v14 or above recommended)
- npm

### Installation

1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd weather-app
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up your WeatherAPI key in a `.env` file:
   ```
   REACT_APP_API_KEY=your_weatherapi_key
   ```

### Running the App

Start the development server:
```sh
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```sh
npm run build
```

## Testing

Run tests with:
```sh
npm test
```

## Credits

- Weather data provided by [WeatherAPI.com](https://www.weatherapi.com/)
- Built with [React](https://reactjs.org/) and [Material UI](https://mui.com/)

## License

This project is licensed under the MIT