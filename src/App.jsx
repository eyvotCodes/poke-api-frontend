import './App.css';
import PokemonListPage from "@/pages/PokemonListPage.jsx";
import PokemonDetailsPage from "@/pages/PokemonDetailsPage.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<PokemonListPage />} />
                    <Route path="/pokemon/:id" element={<PokemonDetailsPage />} />
                </Routes>
            </Router>
        </>
    );

}


export default App;
