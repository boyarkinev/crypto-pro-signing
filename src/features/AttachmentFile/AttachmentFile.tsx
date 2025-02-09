import { FC } from 'react';

import { AttachmentFileProps } from '@/shared/types';

/**
 * Кнопка загрузки файл на подпись
 *
 * @prop {disabled} - флаг активности кнопки
 * @prop {handler} - обработчик загрузки файла
 * @returns JSX
 */
export const AttachmentFile: FC<AttachmentFileProps> = props => {
	const { disabled, handler } = props;
	return (
		<div className='mb-1'>
			<label className='mb-2 el-label' htmlFor='file-to-be-signed'>
				Файл для подписи
			</label>
			<input
				className='form-control'
				disabled={disabled}
				id='file-to-be-signed'
				onChange={handler}
				type='file'
			/>
		</div>
	);
};
