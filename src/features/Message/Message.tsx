import { ChangeEvent, FC } from 'react';

type MessageProps = {
	message: string;
	handler: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

/**
 * Поле для ввода сообщения
 * @prop {message} - сообщение
 * @prop {handler} - обработчик ввода
 * @returns JSX
 */
export const Message: FC<MessageProps> = props => {
	const { message, handler } = props;

	return (
		<div className='mb-3'>
			<label
				className='form-label'
				htmlFor='sign-message'
				style={{ marginLeft: 10 }}>
				Сообщение на подпись
			</label>
			<textarea
				className='form-control'
				id='sign-message'
				onChange={handler}
				placeholder='Введите текст'
				rows={3}
				value={message}
			/>
		</div>
	);
};
