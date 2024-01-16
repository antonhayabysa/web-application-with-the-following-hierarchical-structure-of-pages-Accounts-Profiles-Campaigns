import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccountsTable from "./components/AccountsTable";
import ProfilesTable from "./components/ProfilesTable";
import CampaignsTable from "./components/CampaignsTable";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AccountsTable />} />
        <Route path="/profiles/:accountId" element={<ProfilesTable />} />
        <Route path="/campaigns/:profileId" element={<CampaignsTable />} />
      </Routes>
    </Router>
  );
}

export default App;
