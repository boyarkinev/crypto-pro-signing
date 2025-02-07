import { FC } from 'react';

import { DEFAULT_CERT_VALUE } from '@/shared/constants';
import { CertSelectProps } from '@/shared/types';

/**
 * Выпадающий список сертификатов пользователя
 *
 * @prop {options} - список сертификатов
 * @prop {handler} - обработчик выбора
 * @returns JSX
 */
export const CertSelect: FC<CertSelectProps> = props => {
	const { options, handler } = props;
	return (
		<select
			className='form-select'
			defaultValue={DEFAULT_CERT_VALUE}
			onChange={handler}>
			<option>Выбрать сертификат</option>
			{options.map(cert => (
				<option key={cert.label} value={cert.value}>
					{cert.label}
				</option>
			))}
		</select>
	);
};
