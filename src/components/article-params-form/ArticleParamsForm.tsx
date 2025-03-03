import { useEffect, useState } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/components/arrow-button';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Button } from 'src/components/button';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

type TArticleParamsFormProps = {
	toggleOpen: () => void;
	isOpen: boolean;
	updateSideBarState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	toggleOpen,
	isOpen,
	updateSideBarState,
	onApply,
	onReset,
}: TArticleParamsFormProps) => {
	const [formState, setFormState] = useState(updateSideBarState);

	useEffect(() => {
		setFormState(updateSideBarState);
	}, [updateSideBarState]);

	const handleSubmit = (e: React.FormEvent) => {
		console.log(formState);
		e.preventDefault();
		onApply(formState);
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		onReset();
	};

	const handleChange = (articleName: string) => {
		console.log(articleName);
		return (value: OptionType) => {
			setFormState((currentFormState) => ({
				...currentFormState,
				[articleName]: value,
			}));
		};
	};

	const asideClasses = clsx(styles.container, {
		[styles.container_open]: isOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleOpen} />
			<div
				onClick={toggleOpen}
				className={clsx(styles.overlay, isOpen && styles.overlay_open)}
			/>
			<aside className={asideClasses}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='div' size={31} weight={800} uppercase={true} align='left'>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						onChange={(value) => handleChange('fontFamilyOption')(value)}
						options={fontFamilyOptions}></Select>
					<RadioGroup
						title='Размер шрифта'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleChange('fontSizeOption')}
						name='fontSizeOption'></RadioGroup>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						onChange={handleChange('fontColor')}
						options={fontColors}></Select>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						onChange={handleChange('backgroundColor')}
						options={backgroundColors}></Select>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						onChange={handleChange('contentWidth')}
						options={contentWidthArr}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
