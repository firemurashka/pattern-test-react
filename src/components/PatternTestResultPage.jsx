
//PatternTestResultPage
import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import ResultsScreen from "./Screens/ResultsScreen";
import { createResultsData } from "../utils/createResultsData";

export default function PatternTestResultPage() {
  const { id } = useParams();
  const [resultData, setResultData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Загружаем категории паттернов
  useEffect(() => {
    // ВАЖНО: используем относительный путь, если приложение в подкаталоге!
    fetch(process.env.PUBLIC_URL + "/data/patterns.json")
      .then(res => res.json())
      .then(data => setCategories(Array.isArray(data.categories) ? data.categories : []))
      .catch(() => setCategories([]));
  }, []);

  // Загружаем результаты по id: сперва из localStorage, затем (если нужно) с сервера
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(false);
    setResultData(null);

    // 1. Пробуем достать из localStorage (клиентский режим)
    const localData = localStorage.getItem(`test-result-${id}`);
    if (localData) {
      setResultData(JSON.parse(localData));
      setError(false);
      setLoading(false);
      return;
    }

    // 2. Пробуем запросить с сервера (если серверная часть реализована)
    fetch(`/api/results/${id}`)
      .then(response => {
        if (!response.ok) throw new Error("No result");
        return response.json();
      })
      .then(data => {
        setResultData(data);
        setError(false);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  // Тестовые данные подставляем, если ошибка и есть категории, но нет результата
  useEffect(() => {
    if (error && categories.length && !resultData) {
      setResultData({
        user: {
          fullName: "Иван Иванов",
          phone: "+79998887766",
          telegram: "@ivanov",
          email: "ivan@example.com"
        },
        answers: [
          "Дефицит времени",
          "Изобилие времени",
          "Изобилие времени",
          "Изобилие времени",
          "Изобилие времени",
          "Изобилие времени",
          "Изобилие времени",
          "Монохронность",
          "Полихронность",
          "Прошлое",
          "Краткосрочная мотивация",
          "Индивидуализм",
          "Стабильность",
          "Индивидуализм",
          "Коллективизм",
          "Быть",
          "Быть",
          "Быть",
          "Делать",
          "Коллективизм",
          "Конкуренция",
          "Конкуренция",
          "Сотрудничество",
          "Делиться ресурсами",
          "Прошлое",
          "Настоящее",
          "Будущее",
          "Защищать границы",
          "Контроль",
          "Гармония",
          "Прямая коммуникация",
          "Прямая коммуникация",
          "Прямая коммуникация",
          "Непрямая коммуникация",
          "Эмоциональная коммуникация",
          "Эмоциональная коммуникация",
          "Нейтральная коммуникация",
          "Нейтральная коммуникация",
          "Нейтральная коммуникация",
          "Формальная коммуникация",
          "Неформальная коммуникация",
          "Неформальная коммуникация",
          "Неформальная коммуникация",
          "Неформальная коммуникация",
          "Аналитичное мышление",
          "Аналитичное мышление",
          "Аналитичное мышление",
          "Аналитичное мышление",
          "Полезависимость",
          "Полезависимость",
          "Полезависимость",
          "Поленезависимость",
          "Принятие",
          "Рефлексивность",
          "Принятие",
          "Импульсивность",
          "Импульсивность",
          "Импульсивность",
          "Импульсивность",
          "Высокий контекст",
          "Низкий контекст",
          "Дедуктивное мышление",
          "Индуктивное мышление"
        ]
      });
      // Не сбрасываем error специально!
    }
  }, [error, categories, resultData]);

  // patternResults приводим к массиву строк
  const patternResultsStrings = useMemo(() => {
    if (!Array.isArray(resultData?.answers)) return [];
    return resultData.answers.map(
      a => typeof a === "string" ? a : (a.pattern || "")
    );
  }, [resultData]);

  if (loading || !categories.length || !resultData) {
    // Показываем загрузку до полной готовности
    return <div>Загрузка...</div>;
  }

  const resultsData = createResultsData({
    userData: resultData.user,
    categories,
    patternResults: patternResultsStrings
  });

  return (
    <ResultsScreen
      {...resultsData}
      answers={resultData.answers}
      categories={categories}
      patternResults={patternResultsStrings}
    />
  );
}