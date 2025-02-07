import { FC } from 'react';

import { SignGenerateButtonProps } from '@/shared/types';

/**
 * Кнопка для генерации подписи
 *
 * @prop {disabled} - флаг активности кнопки
 * @prop {handler} - обработчик
 * @prop {repeat} - флаг для изменения подписи
 * @returns JSX
 */
export const SignGenerateButton: FC<SignGenerateButtonProps> = props => {
	const { disabled, handler, repeat } = props;

	return (
		<button
			type='button'
			className='btn btn-primary'
			disabled={disabled}
			onClick={handler}>
			Подписать сообщение {repeat ? 'снова' : ''}
		</button>
	);
};
