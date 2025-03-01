import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../../constants/articleProps';

import styles from './app.module.css';

export const App = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [articleState, setArticleState] = useState(defaultArticleState);

	const handleApply = (state: typeof defaultArticleState) => {
		setArticleState(state);
		setIsOpen(false);
	};

	const handleReset = () => {
		setArticleState(defaultArticleState);
		setIsOpen(false);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isOpen}
				toggleOpen={() => setIsOpen(!isOpen)}
				updateSideBarState={articleState}
				onApply={handleApply}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};
