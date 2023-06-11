// import logo from './logo.svg';
import "./App.css";
import Main from "./component/Main";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import NavBar from './component/Main/NavBar';
import Home from "./component/Main/Home";
import Login from "./component/Main/Login";
import Signup from "./component/Main/Signup";
import Admin from "./component/Admin";
import AdminProfile from "./component/Admin/AdminProfile";
import User from "./component/User";
import ImageModelTrainer from "./component/User/ImageModelTrainer";
import PoseTrainer from "./component/User/PoseTrainer";
import ModelBrowser from "./component/Main/ModelBrowser";
import PoseModelTrainer from "./component/User/PoseModelTrainer";
import AdminDashbord from "./component/Admin/AdminDashbord";
import ToxicityTrainer from "./component/User/ToxicityTrainer";
import Contact from "./component/Main/Contact";
import AudioModelTrainer from "./component/User/AudioModelTrainer";
import TeachablePoseNet from "./component/User/TeachablePosenet";
import TextClassifier from "./component/User/TextClassifier";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/main/home/" />} />
          <Route path="main" element={<Main />}>
            <Route path="home" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="browser" element={<ModelBrowser />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          <Route path="admin" element={<Admin />}>
            <Route path="admin" element={<Navigate to="/admin/admindashboard" />} />
            <Route path="adminDashbord" element={<AdminDashbord />} />
            <Route path="adminProfile" element={<AdminProfile />} />
          </Route>

          <Route path="user" element={<User />}>
            <Route path="imageModelTrainer" element={<ImageModelTrainer />} />
            <Route path="poseModelTrainer" element={<PoseModelTrainer />} />
            <Route path="PoseTrainer" element={<PoseTrainer />} />
            <Route path="ToxicityTrainer" element={<ToxicityTrainer />} />
            <Route path="TextModelTrainer" element={<TextClassifier />} />
            <Route path="AudioTrainer" element={<AudioModelTrainer />} />
            <Route path="teachableposenet" element={<TeachablePoseNet />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
