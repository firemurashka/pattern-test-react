import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PatternTestEntry from "./components/PatternTestEntry";
import PatternTestResultPage from "./components/PatternTestResultPage";
import FileManager from "./components/FileManager";

function App() {
  return (
    <Router>
      <Routes>
        {/* Главная страница теста: интро, форма, вопросы, переход к результату */}
        <Route path="/pattern-test.html" element={<PatternTestEntry />} />

        {/* Страница просмотра результата по уникальному id */}
        <Route path="/pattern-test/results/:id" element={<PatternTestResultPage />} />

        {/* (опционально) Служебный менеджер файлов */}
        <Route path="/files" element={<FileManager />} />

        {/* Любой другой путь ведет на старт теста */}
        <Route path="*" element={<Navigate to="/pattern-test.html" />} />
      </Routes>
    </Router>
  );
}

export default App;