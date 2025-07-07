
//src/pages/TestPage.jsx
import React, { useState } from "react";
import FormScreen from "../components/Screens/FormScreen";
import QuestionsScreen from "../components/Screens/QuestionsScreen";
import ResultsScreen from "../components/Screens/ResultsScreen";
import { useNavigate } from "react-router-dom";

export default function TestPage() {
	const [step, setStep] = useState("form");
	const [userData, setUserData] = useState(null);
	const [answers, setAnswers] = useState([]);
	const [patternResults, setPatternResults] = useState([]);
	const navigate = useNavigate();

	const handleFormSubmit = (formData) => {
		setUserData(formData);
		setStep("questions");
	};

	const handleTestComplete = ({ answers, patterns }) => {
		// 1. Генерируем уникальный id
		const id = crypto.randomUUID ? crypto.randomUUID() : String(Date.now());

		// 2. Сохраняем результат (пример с localStorage, можно отправлять на сервер)
		const resultData = {
			user: userData,
			answers,
			patternResults: patterns
		};
		localStorage.setItem(`test-result-${id}`, JSON.stringify(resultData));

		// 3. Навигируем на страницу результата
		navigate(`/results/${id}`);
	};


	const handleRestart = () => {
		setStep("form");
		setUserData(null);
		setAnswers([]);
		setPatternResults([]);
	};

	return (
		<>
			{step === "form" && <FormScreen onSubmit={handleFormSubmit} />}
			{step === "questions" && (
				<QuestionsScreen
					userData={userData}
					fullName={userData?.fullName || ''}
					timeDisplay={new Date().toLocaleDateString('ru-RU')}
					onComplete={handleTestComplete}
				/>
			)}
			{step === "results" && (
				<ResultsScreen
					userData={userData}
					answers={answers}
					patternResults={patternResults}
					onRestart={handleRestart}
				/>
			)}
		</>
	);
}