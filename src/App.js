import './App.css';
import CityDropdown from './components/CityDropdown';
import EventsDiv from './components/EventsDiv';
import Header from './header/Header';

function App() {
  return (
    <div>
      <Header/>
      <CityDropdown />
      <EventsDiv />
    </div>
  );
}

export default App;
