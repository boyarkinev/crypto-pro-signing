import { FC } from 'react';

import { SignDownLoadButtonProps } from '@/shared/types';

/**
 * Кнопка для скачивания подписи
 *
 * @prop {url} - ссылка на файл
 * @returns JSX
 */
export const SignDownLoadButton: FC<SignDownLoadButtonProps> = ({
	name,
	url,
}) => {
	return (
		<a
			className={`btn btn-success ${!url ? 'disabled' : undefined}`}
			download={`${name}.p7s`}
			href={url}
			role='button'>
			Скачать подпись
		</a>
	);
};
