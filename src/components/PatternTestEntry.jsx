import React, { useState } from "react";
import OfferIntroSection from "./Sections/IntroSections/OfferIntroSection";
import PatternsIntroSection from "./Sections/IntroSections/PatternsIntroSection";
import InstructionIntroSection from "./Sections/IntroSections/InstructionIntroSection";
import ContactsIntroSection from "./Sections/IntroSections/ContactsIntroSection";
import StartTestIntroSection from "./Sections/IntroSections/StartTestIntroSection";
import FormScreen from "./Screens/FormScreen";
import QuestionsScreen from "./Screens/QuestionsScreen";

const PatternTestEntry = () => {
  // possible steps: intro → form → questions → loading → resultLink
  const [step, setStep] = useState("intro");
  const [userData, setUserData] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [resultId, setResultId] = useState(null);
  const [error, setError] = useState("");

  // 1. Стартовая страница (интро)
  if (step === "intro") {
    return (
      <div>
        <OfferIntroSection />
        <PatternsIntroSection />
        <InstructionIntroSection />
        <ContactsIntroSection />
        <StartTestIntroSection onStart={() => setStep("form")} />
      </div>
    );
  }

  // 2. Форма контактов
  if (step === "form") {
    return (
      <FormScreen
        onSubmit={(formData) => {
          setUserData(formData);
          setStep("questions");
        }}
        onBack={() => setStep("intro")}
      />
    );
  }

  // 3. Вопросы
  if (step === "questions") {
    return (
      <QuestionsScreen
        userData={userData}
        onComplete={({ answers }) => {
          setAnswers(answers);
          setStep("loading");
          // Отправляем ответы на сервер!
          sendResults({ userData, answers });
        }}
        onBack={() => setStep("form")}
      />
    );
  }

  // 4. Индикатор загрузки
  if (step === "loading") {
    return <div style={{ textAlign: "center", marginTop: 40 }}>Сохраняем ваши результаты...</div>;
  }

  // 5. Ссылка на результат или сообщение об ошибке
  if (step === "resultLink") {
    if (error) {
      return (
        <div style={{ color: "red", textAlign: "center", marginTop: 40 }}>
          Ошибка при сохранении: {error}
          <br />
          <button onClick={() => setStep("questions")}>Попробовать ещё раз</button>
        </div>
      );
    }
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <h2>Спасибо за прохождение теста!</h2>
        <p>Ваши результаты сохранены. Вы можете просмотреть их по ссылке:</p>
        <a
          href={`/pattern-test/results/${resultId}`}
          style={{ fontSize: 18, color: "#1976d2", textDecoration: "underline" }}
        >
          {window.location.origin + `/pattern-test/results/${resultId}`}
        </a>
        <br />
        <button style={{ marginTop: 30 }} onClick={() => setStep("intro")}>Пройти тест ещё раз</button>
      </div>
    );
  }

  // ------- UTILS -------
  // Функция отправки результатов на сервер
  function sendResults({ userData, answers }) {
    setError("");
    setResultId(null);
    fetch("/api/pattern-test/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: userData, answers })
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Ошибка сервера");
        const data = await res.json();
        if (!data.id) throw new Error("Не получен ID результата");
        setResultId(data.id);
        setStep("resultLink");
      })
      .catch((err) => {
        setError(err.message || "Ошибка отправки");
        setStep("resultLink");
      });
  }

  // ------- /UTILS -------

  // fallback
  return null;
};

export default PatternTestEntry;