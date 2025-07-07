// src/components/Screens/ResultsScreen.jsx

import React, { useState, useEffect, useMemo } from 'react';
import ResultsHeader from './../Sections/ResultsSections/ResultsHeader';
import HistogramSection from './../Sections/ResultsSections/HistogramSection';
import InterpretationSection from './../Sections/ResultsSections/InterpretationSection';
import LiteratureSection from './../Sections/ResultsSections/LiteratureSection';
import CategoryResultsSection from './../Sections/ResultsSections/CategoryResultsSection';
import { createResultsData } from '../../utils/createResultsData';

const ResultsScreen = ({
	userData,
	answers,
	patternResults,
	categoryResults,
	onDownloadPDF,
	topCategory,
	topPatterns,
	responseType,
	opportunities,
	behaviorModel,
	strengths,
	patternMessage,
}) => {
	const [loading, setLoading] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		fetch('/data/patterns.json')
			.then((res) => res.json())
			.then((data) => {
				setCategories(Array.isArray(data.categories) ? data.categories : []);
			})
			.catch(() => setCategories([]));
	}, []);

	// Мемоизация, чтобы объект не пересчитывался без нужды
	const resultsData = useMemo(
		() => createResultsData({ userData, categories, patternResults }),
		[userData, categories, patternResults]
	);

	const handleDownloadPDF = async () => {
		setLoading(true);
		try {
			if (onDownloadPDF) {
				await onDownloadPDF();
			}
			setShowSuccess(true);
		} finally {
			setLoading(false);
		}
	};


	return (
		<div className="result">
			<ResultsHeader
				loading={loading}
				showSuccess={showSuccess}
				handleDownloadPDF={handleDownloadPDF}
				setShowSuccess={setShowSuccess}
				resultsData={resultsData}
			/>
			<div className="result-main">
				<h2 className="result-main__subtitle">Результаты вашего тестирования</h2>
				<HistogramSection categories={categories} patternResults={patternResults || []} />
				<InterpretationSection
					topCategory={topCategory}
					patternMessage={patternMessage}
					topPatterns={topPatterns}
					responseType={responseType}
					opportunities={opportunities}
					behaviorModel={behaviorModel}
					strengths={strengths}
				/>
				<LiteratureSection />
			</div>
			<CategoryResultsSection categories={categories} patternResults={patternResults} />


		</div>
	);
};

export default ResultsScreen;