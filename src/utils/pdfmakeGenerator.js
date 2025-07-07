import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import logoBase64 from "./logo";
import { makeIntroBlock } from "./makeIntroBlock";
import { makeDominantPatternsBlock } from "./makeDominantPatternsBlock";
import { makeCategoryPatternsBlock } from "./makeCategoryPatternsBlock";
import { makeContactsBlock, makeRepeatTestBlock, makeAuthorBlock, makeDominantPatternsDescriptionsBlock } from "./makeContactsBlock"; // или другой файл, если разделишь


import pdfmakeStyles from "./pdfmakeStyles";

pdfMake.vfs = pdfFonts.vfs;

function isTelegramWebView() {
  return /Telegram/i.test(navigator.userAgent);
}

export function downloadPDF(resultsData) {
  if (!resultsData) {
    alert("Нет данных для создания PDF!");
    return;
  }

  const docDefinition = {
    content: [
      ...makeIntroBlock(resultsData, logoBase64),
      ...makeDominantPatternsBlock(resultsData.categories, resultsData.patternResults),
      ...makeCategoryPatternsBlock(resultsData.categories, resultsData.patternResults),
      ...makeContactsBlock(),
      ...makeRepeatTestBlock(),
      ...makeAuthorBlock(),
      ...makeDominantPatternsDescriptionsBlock(resultsData.categories, resultsData.patternResults),
      // ... другие блоки будут добавляться сюда по мере реализации
    ],
    styles: pdfmakeStyles,
    footer: (currentPage, pageCount) => ({
      text: `Страница ${currentPage} из ${pageCount}`,
      alignment: "center",
      margin: [0, 10],
      style: "pages",
    }),
    pageMargins: [40, 80, 40, 60],
  };

  if (isTelegramWebView()) {
    alert("В браузере Telegram автоматическая загрузка PDF не поддерживается.\nPDF откроется в новом окне — сохраните его вручную через меню браузера.");
    pdfMake.createPdf(docDefinition).open();
  } else {
    pdfMake.createPdf(docDefinition).download("results.pdf");
  }
}
