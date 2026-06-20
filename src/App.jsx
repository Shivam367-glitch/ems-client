import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventsPage from "./pages/EventsPage";
import CreateEventPage from "./pages/CreateEventPage";
import EventDetailsPage from "./pages/EventsDetailPage";
import EditEventPage from "./pages/EditEventPage";
import { Bounce, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<EventsPage />} />
        <Route
          path="/create-event"
          element={<CreateEventPage />}
        />
        <Route path="/events/:id" element={<EventDetailsPage />} />
        <Route path="/edit-event/:id" element={<EditEventPage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        draggable
        theme="light"
        transition={Bounce}
      />

    </BrowserRouter>
  );
}

export default App;

