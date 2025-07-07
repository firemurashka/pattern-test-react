//src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import IntroScreen from "./components/Screens/IntroScreen";
import TestPage from "./pages/TestPage.jsx"; // ваш контейнер для формы, вопросов, результата
import ResultPage from "./pages/ResultPage.jsx"; // отдельная страница для просмотра результатов по ID

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroScreen />} />
        {/* Весь тест на одной странице-контейнере */}
        <Route path="/test" element={<TestPage />} />
        {/* Страница результатов по уникальному ID (например, для Telegram-бота) */}
        <Route path="/results/:id" element={<ResultPage />} />
        {/* Перенаправление на главную по неизвестному адресу */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;