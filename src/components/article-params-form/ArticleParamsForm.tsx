import { useEffect, useState } from 'react';

import { ArrowButton } from 'src/components/arrow-button';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Button } from 'src/components/button';


import styles from './ArticleParamsForm.module.scss';
import { ArticleStateType, backgroundColors, contentWidthArr, fontColors, fontFamilyOptions, fontSizeOptions, OptionType } from 'src/constants/articleProps';

type TArticleParamsFormProps = {
	toggleOpen: () => void;
	isOpen: boolean;
	updateSideBarState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
	onReset: () => void;

}

export const ArticleParamsForm = ({toggleOpen, isOpen, updateSideBarState, onApply, onReset}:TArticleParamsFormProps) => {
	const [formState, setFormState] = useState(updateSideBarState);

	useEffect(() =>{
		setFormState(updateSideBarState);
	}, 
[updateSideBarState]);

const handleSubmit = (e: React.FormEvent) => {
	e.preventDefault();
	onApply(formState);
}

const handleReset = (e: React.FormEvent) => {
	e.preventDefault();
	onReset();
}

const handleChange = (name: keyof ArticleStateType, value: OptionType) => {
	setFormState(prev => ({
		...prev,
		[name]: value
	}));
}

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleOpen} />
			<aside className={styles.container}>
				<form 
				className={styles.form}
				onSubmit={handleSubmit}
				onReset={handleReset}
				>
					<Text
					as='h1'					
					dynamic 
					size={31} 
					weight={800}						
					uppercase={true}
					align='center'
					>
						Задайте параметры						
					</Text>
					<Select
					 title='Шрифт'
					selected={formState.fontFamilyOption}
					onChange={(value) => handleChange('fontFamilyOption', value)}
					options={fontFamilyOptions}					
					>	
					</Select>
					<RadioGroup
						title='Размер шрифта'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(value) => handleChange('fontSizeOption', value)}
						name='font-size'
						>				
						</RadioGroup>
						<Select
					 title='Цвет шрифта'
					selected={formState.fontColor}
					onChange={(value) => handleChange('fontColor', value)}
					options={fontColors}					
					>	
					</Select>
					<Separator />
					<Select
					 title='Цвет фона'
					selected={formState.backgroundColor}
					onChange={(value) => handleChange('backgroundColor', value)}
					options={backgroundColors}					
					>	
					</Select>
					<Select
					 title='Ширина контента'
					selected={formState.contentWidth}
					onChange={(value) => handleChange('contentWidth', value)}
					options={contentWidthArr}					
					>	
					</Select>					
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
