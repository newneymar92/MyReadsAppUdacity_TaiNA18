import { Suspense } from "react";
import { Helmet } from "react-helmet";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoadingView from "./components/LoadingView";
import ListPage from "./pages/ListPage";
import SearchPage from "./pages/SearchPage";
import "./styles/App.css";

function App() {
  return (
    <>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Helmet>
      <div className="app">
        <Suspense fallback={<LoadingView />}>
          <Router>
            <Routes>
              <Route key="1" path="/" element={<ListPage />} />
              <Route key="2" path="/search" element={<SearchPage />} />
              <Route key="3" path="/*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </Suspense>
      </div>
    </>
  );
}

export default App;
