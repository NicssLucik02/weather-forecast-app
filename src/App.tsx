import "./App.scss";
import "./colors.scss";
import { WeatherApp } from "./components/WeatherApp";
import { WeatherProvider } from "./context/WeatherContext";

function App() {
  return (
    <WeatherProvider>
      <WeatherApp />
    </WeatherProvider>
  );
}

export default App;
