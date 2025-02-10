import { FC, useEffect, useState } from 'react';

import { MessageToFileButtonProps } from '@/shared/types';
import { getUrlFromBlob } from '@/shared/lib';

/**
 * Сохраняет сообщение в файл на диске
 *
 * @prop {message} - сообщение для сохранения
 * @prop {name} - имя для файла
 * @returns JSX
 */
export const MessageToFileButton: FC<MessageToFileButtonProps> = ({
	message,
	name,
}) => {
	const [messageUrl, setMessageUrl] = useState('');

	useEffect(() => {
		if (message) {
			// Получает локальную ссылку для скачивания файла с текстом
			const url = getUrlFromBlob(message)
			// Записывает ссылку в хранилище компонента
			setMessageUrl(url);
		}
	}, [message]);

	return (
		<a
			className={`btn btn-warning ${!message ? 'disabled' : undefined}`}
			download={name}
			href={messageUrl}
			role='button'>
			Сохранить сообщение для проверки подписи
		</a>
	);
};
