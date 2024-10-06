import { Outlet } from "react-router-dom";
import NavigationBarComponent from "./components/NavigationBarComponent";
import FooterComponent from "./components/FooterComponent";

function App() {
  return (
    <div>
      <NavigationBarComponent />
      <Outlet />
      <FooterComponent />
    </div>
  );
}

export default App;
