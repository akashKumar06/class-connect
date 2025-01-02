import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dasboard";
import Profile from "./pages/Profile";
import DashboardHeroSection from "./components/DashboardHeroSection";
import Resources from "./pages/Resources";
import JoinClass from "./pages/JoinClass";
import ChatRoom from "./pages/ChatRoom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHeroSection />} />
          <Route path="profile" element={<Profile />} />
          <Route path="resources" element={<Resources />} />
          <Route path="join-class" element={<JoinClass />} />
          <Route path="chat-room" element={<ChatRoom />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
