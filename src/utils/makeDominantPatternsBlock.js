const pageWidth = 595; // A4

function createCenteredLine(lineWidth = 180, yPosition = 0) {
  return {
    canvas: [
      {
        type: "rect",
        x: (pageWidth - lineWidth) / 2,
        y: yPosition,
        w: lineWidth,
        h: 1,
        color: "#ff008a",
      },
    ],
    margin: [0, 0, 0, 20],
    relativePosition: { x: -50, y: 0 },
  };
}

export function makeDominantPatternsBlock(categories, patternResults, strongThreshold = 75) {
  // Безопасно приводим к массиву
  if (!Array.isArray(categories)) {
    categories = Object.values(categories || {});
  }

  // Собираем явно проявленные паттерны
  let dominantPatterns = [];
  (categories || []).forEach((cat) => {
    (cat.subcategories || []).forEach((subcat) => {
      (subcat.patterns || []).forEach((pat) => {
        const patName = pat.pattern?.ru || pat.pattern?.en || pat.name || "";
        const abbr = pat.pattern?.abbreviation || pat.abbreviation || "";
        const result = (patternResults || []).find(
          (r) =>
            (typeof r.name === "string" && r.name.trim().toLowerCase() === patName.trim().toLowerCase()) ||
            (typeof r.pattern?.ru === "string" && r.pattern.ru.trim().toLowerCase() === patName.trim().toLowerCase())
        );
        const percent = result?.percent || result?.percentage || 0;
        if (percent >= strongThreshold) {
          dominantPatterns.push({
            name: patName,
            abbr: abbr,
            percent,
            color: cat.color || "#71717a",
          });
        }
      });
    });
  });

  // Гистограмма
  function makeBarChart(patterns) {
    // Графика
    const barWidth = 24;
    const barGap = 18;
    const chartHeight = 120;
    const startX = 20;
    const maxBarHeight = chartHeight - 30;
    let canvas = [];
    patterns.forEach((pat, i) => {
      const barHeight = Math.round((pat.percent / 100) * maxBarHeight);
      const x = startX + i * (barWidth + barGap);
      const y = 10 + (maxBarHeight - barHeight);

      // Фон
      canvas.push({
        type: "rect",
        x,
        y: 10,
        w: barWidth,
        h: maxBarHeight,
        color: "#e0e0e0",
        r: 5,
      });
      // Цветная полоса
      canvas.push({
        type: "rect",
        x,
        y,
        w: barWidth,
        h: barHeight,
        color: pat.color,
        r: 5,
      });
      // % над полосой
      canvas.push({
        type: "text",
        x: x + barWidth / 2 - 10,
        y: y - 18,
        text: `${pat.percent}%`,
        fontSize: 11,
        color: "#000",
      });
      // Аббревиатура под полосой
      canvas.push({
        type: "text",
        x: x + barWidth / 2 - 10,
        y: 10 + maxBarHeight + 8,
        text: pat.abbr,
        fontSize: 12,
        color: "#505050",
      });
    });
    return {
      canvas,
      margin: [0, 10, 0, 10],
      height: chartHeight + 36,
    };
  }

  // Аббревиатуры: 2 столбца
  function makeAbbreviationTable(patterns) {
    const abbrs = patterns.filter((pat) => pat.abbr).map((pat) => ({ abbr: pat.abbr, name: pat.name }));
    if (!abbrs.length) return null;
    const half = Math.ceil(abbrs.length / 2);
    const col1 = abbrs.slice(0, half);
    const col2 = abbrs.slice(half);
    const rows = [];
    for (let i = 0; i < col1.length; i++) {
      rows.push([
        { text: `${col1[i]?.abbr}: ${col1[i]?.name}`, style: "abbreviationLabel" },
        { text: col2[i] ? `${col2[i].abbr}: ${col2[i].name}` : "", style: "abbreviationLabel" },
      ]);
    }
    return {
      table: {
        widths: ["50%", "50%"],
        body: rows,
      },
      layout: "noBorders",
      margin: [0, 4, 0, 16],
    };
  }

  // --- Формируем блок контента ---

  const content = [
    {
      text: "Явно проявленные паттерны",
      style: "dominantTitle",
      margin: [0, 10, 0, 0],
    },
    createCenteredLine(300, 0),
  ];

  if (dominantPatterns.length) {
    content.push(makeBarChart(dominantPatterns));
    content.push({
      text: "Условные обозначения",
      style: "dominantSubTitle",
      margin: [0, 16, 0, 5],
    });
    const abbrTable = makeAbbreviationTable(dominantPatterns);
    if (abbrTable) content.push(abbrTable);
  } else {
    content.push({
      text: "Нет явно проявленных паттернов",
      style: "noQuestions",
      alignment: "center",
      margin: [0, 20, 0, 20],
    });
  }

  // Разрыв страницы
  content.push({ text: "", pageBreak: "after" });

  return content;
}
