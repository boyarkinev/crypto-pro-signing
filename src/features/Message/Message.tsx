import { FC } from 'react';

import { MessageProps } from '@/shared/types';

/**
 * Поле для ввода сообщения
 *
 * @prop {message} - сообщение
 * @prop {handler} - обработчик ввода
 * @returns JSX
 */
export const Message: FC<MessageProps> = props => {
	const { disabled, message, handler } = props;

	return (
		<div className='mb-3'>
			<label className='form-label el-label' htmlFor='sign-message'>
				Сообщение на подпись
			</label>
			<textarea
				className='form-control'
				disabled={disabled}
				id='sign-message'
				onChange={handler}
				placeholder='Введите текст'
				rows={3}
				value={message}
			/>
		</div>
	);
};
