//src/components/Charts/PatternBarChart.jsx
import React from "react";

function getSubcategoryPatternStats(patternResults, subcategory) {
	const patternNames = (subcategory.patterns || []).map(
		(p) => (p.pattern.ru || p.pattern.en || '').trim().toLowerCase()
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

const PatternBarChart = ({
	categories,
	patternResults,
	strongThreshold = 75
}) => {
	const categoryWrappers = (categories || []).map((cat) => {
		const strongPatterns = [];
		(cat.subcategories || []).forEach((subcat) => {
			const stats = getSubcategoryPatternStats(patternResults, subcat);
			(subcat.patterns || []).forEach((pat) => {
				const nameRaw = pat.pattern?.ru || pat.pattern?.en || '';
				const name = nameRaw.trim().toLowerCase();
				const percent = stats[name] || 0;
				if (percent >= strongThreshold) {
					strongPatterns.push({
						name: nameRaw, // для красивого вывода
						abbr: pat.pattern.abbreviation || "",
						percent,
						cssClass: cat.cssClass || "",
					});
				}
			});
		});
		return {
			category: cat.title?.ru || cat.title?.en,
			description: cat.description?.ru || cat.description?.en || "",
			cssClass: cat.cssClass || "",
			strongPatterns,
		};
	});

	const visibleCategoryWrappers = categoryWrappers.filter(
		(cat) => cat.strongPatterns.length > 0
	);

	const legendItems = [];
	visibleCategoryWrappers.forEach((cat) => {
		cat.strongPatterns.forEach((p) => {
			if (p.abbr && !legendItems.find((l) => l.abbr === p.abbr)) {
				legendItems.push({ abbr: p.abbr, name: p.name });
			}
		});
	});

	const testPatternPercents = [];
	(categories || []).forEach((cat) => {
		(cat.subcategories || []).forEach((subcat) => {
			const stats = getSubcategoryPatternStats(patternResults, subcat);
			(subcat.patterns || []).forEach((pat) => {
				const name = (pat.pattern?.ru || pat.pattern?.en || '').trim();
				const key = name.toLowerCase();
				if (stats[key] > 0) {
					testPatternPercents.push({ name, percent: stats[key] });
				}
			});
		});
	});
	console.log("patternResults:", patternResults);
	console.log("первая категория:", categories?.[0]);
	return (


		<div className="histogram__container">
			<div className="histogram__body">
				<h3 className="histogram__title">Явно проявленные паттерны</h3>
				<div className="histogram__content">
					{visibleCategoryWrappers.map((cat, i) => (
						<div
							key={cat.category}
							className={"histogram__category-wrapper" + (i === 0 ? " border" : "")}
						>

							<div className="histogram__category-row">
								<div className="histogram__category">{cat.category}</div>
								<div className="histogram__columns">
									{cat.strongPatterns.map((p) => (
										<div className="histogram__column strong-pattern" key={p.name}>
											<span className="histogram__pattern">{p.name}</span>
											<span className="histogram__pattern-abr">{p.abbr}</span>
											<div className="histogram__bar-container">
												<div
													className={"histogram__bar " + p.cssClass}
													style={{ width: `${p.percent}%` }}
												></div>
											</div>
											<span
												className={"histogram__percentage" + (p.percent === 100 ? " maximum" : "")}
											>
												{p.percent}%
											</span>
										</div>
									))}
								</div></div>


							{cat.description && (
								<div className="histogram__category-description">{cat.description}</div>
							)}
						</div>
					))}
					<div className="legend">
						<h4>Условные обозначения:</h4>
						<div className="legend__grid">
							{legendItems.map((l) => (
								<div className="legend__item" key={l.abbr}>
									<span className="abbreviation">{l.abbr}</span> <span>-</span> {l.name}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>

	);
};

export default PatternBarChart;