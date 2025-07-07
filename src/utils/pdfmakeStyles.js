const pdfmakeStyles = {
  // 1 Блок Шапка документа---------------------------------
  clientInfo: {
    fontSize: 14,
    bold: false,
    margin: [0, 0, 0, 5],
  },
  mainLogo: {
    fontSize: 22,
    bold: true,
    color: "#ff008a",
  },
  mainTitle: {
    fontSize: 22,
    bold: true,
  },
  descriptionText: {
    fontSize: 16,
  },
  descriptionTextAccent: {
    fontSize: 16,
    bold: true,
  },
  mainListTitle: {
    fontSize: 16,
    alignment: "center",
    bold: true,
    margin: [0, 0, 0, 20],
  },
  mainListText: {
    fontSize: 14,
    margin: [0, 0, 0, 10],
  },
  // 2 Блок "Явно проявленные паттерны"------------------
  dominantTitle: {
    fontSize: 18,
    bold: true,
    alignment: "center",
    margin: [0, 0, 0, 5],
  },
  dominantSubTitle: {
    fontSize: 14,
    bold: true,
    alignment: "left",
    margin: [0, 20, 0, 10],
  },
  abbreviationLabel: {
    fontSize: 12,
    alignment: "left",
    margin: [0, 5, 0, 5],
    color: "#505050",
    bold: false,
  },
  // 3 Блок "Паттерны по категориям" -------------------
  categoryTitle: {
    fontSize: 18,
    bold: true,
    alignment: "center",
    margin: [0, 0, 0, 5],
  },
  categoryHeader: {
    fontSize: 16,
    bold: true,
    alignment: "center",
    margin: [0, 0, 0, 10],
  },
  categoryDescription: {
    fontSize: 14,
    alignment: "left",
    color: "#71717a",
    margin: [0, 5, 0, 20],
  },
  subCategoryHeader: {
    fontSize: 12,
    bold: true,
    margin: [0, 5, 0, 5],
  },
  dominantPattern: {
    fontSize: 12,
    bold: true,
    color: "#71717a",
    margin: [0, 10, 0, 15],
  },
  noQuestions: {
    fontSize: 14,
    italics: true,
    color: "#ff0000",
    margin: [0, 10, 0, 15],
  },
  sectionTitle: {
    fontSize: 18,
    bold: true,
    alignment: "center",
    margin: [0, 0, 0, 10],
  },
  descriptionPatternTitle: {
    fontSize: 14,
    color: "#000",
    bold: true,
    alignment: "center",
    margin: [0, 10, 0, 5],
  },
  patternTitle: {
    fontSize: 12,
    color: "#71717a",
    bold: true,
    decoration: "underline",
    alignment: "left",
    margin: [20, 0, 0, 2],
  },
  descriptionPattern: {
    fontSize: 12,
    color: "#71717a",
    alignment: "left",
    margin: [0, 2, 0, 5],
  },
  percentageCell: {
    fontSize: 12,
    alignment: "left",
    margin: [0, 3, 0, 3],
  },
  percentageText: {
    fontSize: 10,
    color: "#505050",
    alignment: "center",
    margin: [0, 0, 0, 10],
  },
  abbreviationText: {
    fontSize: 12,
    alignment: "center",
    color: "#505050",
  },
  percentageTextGreen: {
    color: "#03d666",
    fontSize: 10,
    bold: true,
    margin: [0, 0, 0, 10],
  },
  secondTitle: {
    fontSize: 18,
    bold: true,
    alignment: "center",
  },
  secondText: {
    fontSize: 14,
    alignment: "left",
  },
  secondTextLink: {
    fontSize: 12,
    alignment: "left",
  },
  secondLink: {
    color: "blue",
    fontSize: 12,
    width: "auto",
  },
  secondList: {
    fontSize: 12,
    margin: [0, 0, 0, 5],
  },
  pages: {
    fontSize: 10,
    color: "#505050",
  },
};

export default pdfmakeStyles;