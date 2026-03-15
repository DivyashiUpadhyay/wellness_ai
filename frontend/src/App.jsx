import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";  
import Login from "./pages/Login";
import Chat from "./pages/employee/Chat";
import AdminDashboard from "./pages/admin/AdminDashboard";
import BehaviorMonitoring from "./pages/admin/BehaviorMonitoring";
import WellnessDashboard from "./pages/employee/WellnessDashboard";
import StressInsights from "./pages/employee/StressInsights";
function App() {

  return (

    <Router>

     <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

  <Route
    path="/employee/chat"
    element={
      <ProtectedRoute role="employee">
        <Chat />
      </ProtectedRoute>
    }
  />

  <Route
    path="/admin/dashboard"
    element={
      <ProtectedRoute role="admin">
        <AdminDashboard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/admin/behavior"
    element={
      <ProtectedRoute role="admin">
        <BehaviorMonitoring />
      </ProtectedRoute>
    }
  />
  <Route
  path="/employee/wellness"
  element={
    <ProtectedRoute role="employee">
      <WellnessDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/employee/stress"
  element={
    <ProtectedRoute role="employee">
      <StressInsights />
    </ProtectedRoute>
  }
/>

</Routes>

    </Router>

  );

}

export default App;