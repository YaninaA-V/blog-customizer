import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../../constants/articleProps';

import styles from './app.module.css';

export const App = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [articleParams, setArticleParams] = useState(defaultArticleState);

	const handleApply = (params: typeof defaultArticleState) => {
		setArticleParams(params);
		setIsOpen(false);
	};	

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleParams.fontFamilyOption.value,
					'--font-size': articleParams.fontSizeOption.value,
					'--font-color': articleParams.fontColor.value,
					'--container-width': articleParams.contentWidth.value,
					'--bg-color': articleParams.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isOpen}
				toggleOpen={() => setIsOpen(!isOpen)}
				articleState={articleParams}
				setArticleState={handleApply}			
			/>
			<Article />
		</main>
	);
};
