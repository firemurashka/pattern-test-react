const pageWidth = 595;
function createCenteredLine(lineWidth = 180, yPosition = 0) {
  return {
    canvas: [
      {
        type: "rect",
        x: (pageWidth - lineWidth) / 2,
        y: yPosition,
        w: lineWidth,
        h: 2,
        color: "#ff008a",
      },
    ],
    margin: [0, 4, 0, 16],
  };
}

// Аналог getSubcategoryPatternStats
function getSubcategoryPatternStats(patternResults, subcategory) {
  const patternNames = (subcategory.patterns || []).map(
    (p) => (p.pattern?.ru || p.pattern?.en || '').trim().toLowerCase()
  );
  const counts = {};
  let total = 0;
  (patternResults || []).forEach((pat) => {
    const patNorm = (pat || '').trim().toLowerCase();
    if (patternNames.includes(patNorm)) {
      counts[patNorm] = (counts[patNorm] || 0) + 1;
      total++;
    }
  });
  const stats = {};
  patternNames.forEach((name) => {
    stats[name] = total > 0 ? Math.round(((counts[name] || 0) / total) * 100) : 0;
  });
  return stats;
}

// Аналог getScaleStatus
function getScaleStatus(stats, patterns) {
  const percents = patterns.map(
    (p) => stats[(p.pattern?.ru || p.pattern?.en || '').trim().toLowerCase()] || 0
  );
  const maxIndex = percents.findIndex((percent) => percent >= 75);
  if (maxIndex !== -1) {
    return `ЯВНО ${patterns[maxIndex].pattern?.ru || patterns[maxIndex].pattern?.en}`;
  }
  const medIndex = percents.findIndex((percent) => percent > 50);
  if (medIndex !== -1) {
    return `УМЕРЕННО ${patterns[medIndex].pattern?.ru || patterns[medIndex].pattern?.en}`;
  }
  return "НЕЙТРАЛЬНО";
}

// pdfmake bar
function patternBar(percent, color, width = 120, height = 10) {
  return {
    canvas: [
      {
        type: "rect",
        x: 0,
        y: 0,
        w: width,
        h: height,
        color: "#e0e0e0",
        r: 3,
      },
      {
        type: "rect",
        x: 0,
        y: 0,
        w: Math.round((percent / 100) * width),
        h: height,
        color: color,
        r: 3,
      },
    ],
    margin: [0, 2, 0, 8],
    height,
    width,
  };
}

export function makeCategoryPatternsBlock(categories = [], patternResults = []) {
  if (!Array.isArray(categories)) {
    categories = Object.values(categories || {});
  }

  const content = [
    {
      text: "Паттерны по категориям",
      style: "categoryTitle",
      margin: [0, 10, 0, 0],
    },
    createCenteredLine(180, 0),
  ];

  // Для каждой категории
  categories.forEach((cat) => {
    const catTitle = cat.title?.ru || cat.title?.en || cat.name || "";
    content.push({
      text: catTitle,
      style: "categoryHeader",
      margin: [0, 10, 0, 0],
    });

    // Для каждой подкатегории
    (cat.subcategories || []).forEach((subcat) => {
      const subcatTitle = subcat.title?.ru || subcat.title?.en || subcat.name || "";
      content.push({
        text: subcatTitle,
        style: "subCategoryHeader",
        margin: [0, 8, 0, 2],
      });

      // Аналитика шкалы (ЯВНО/УМЕРЕННО/НЕЙТРАЛЬНО)
      const patterns = subcat.patterns || [];
      const stats = getSubcategoryPatternStats(patternResults, subcat);
      content.push({
        text: getScaleStatus(stats, patterns),
        style: "dominantPattern",
        margin: [0, 0, 0, 4],
      });

      // Для каждого паттерна внутри подкатегории
      patterns.forEach((pat) => {
        const name = pat.pattern?.ru || pat.pattern?.en || "";
        const percent = stats[(name || '').trim().toLowerCase()] || 0;
        const color = cat.color || "#71717a";
        const description = pat.description?.ru || pat.description?.en || "";

        content.push({
          columns: [
            { text: name, style: "patternTitle", width: "auto" },
            { text: `${percent}%`, style: "percentageText", width: 40, alignment: "right" },
            { width: 130, stack: [patternBar(percent, color)] },
          ],
          columnGap: 16,
          margin: [0, 0, 0, 2],
        });

        // Описание паттерна (можно убрать если не надо)
        if (description) {
          content.push({
            text: description,
            style: "descriptionPattern",
            margin: [0, 0, 0, 10],
          });
        }
      });
    });
  });

  // Разрыв страницы
  content.push({ text: "", pageBreak: "after" });

  return content;
}