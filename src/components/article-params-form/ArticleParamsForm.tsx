import { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Text } from '../../ui/text';
import { Select } from '../../ui/select';
import { RadioGroup } from '../../ui/radio-group';
import { Separator } from '../../ui/separator';
import { Button } from 'src/ui/button';

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
	articleState: ArticleStateType;
	setArticleState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	toggleOpen,
	isOpen,
	articleState,
	setArticleState,
}: TArticleParamsFormProps) => {
	const [formState, setFormState] = useState(articleState);
	const asideRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (e: MouseEvent) => {		
			if (
				asideRef.current &&
				!asideRef.current.contains(e.target as Node)
			) {
				toggleOpen();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen, toggleOpen]);

	const handleSubmit = (e: React.FormEvent) => {		
		e.preventDefault();
		setArticleState(formState);
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		setFormState(defaultArticleState);
	};

	const handleChange = (name: keyof ArticleStateType) => (value: OptionType) => {
		setFormState(prev => ({ ...prev, [name]:value}));
	};

	const asideClasses = clsx(styles.container, {
		[styles.container_open]: isOpen,
	});

	const handleArrowClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		toggleOpen();
	  };

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleOpen} />
			<aside ref={asideRef} className={asideClasses}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase={true} align='left'>
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
