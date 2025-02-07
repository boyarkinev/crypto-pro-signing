import './App.css';

import { getCertificate, getUserCertificates } from 'crypto-pro';
import { ChangeEvent, useEffect, useState } from 'react';

import {
	CertSelect,
	Message,
	SignDownLoadButton,
	SignGenerateButton,
} from '@/features';
import { create } from '@/shared/lib';
import { Option } from '@/shared/types';
import { DEFAULT_CERT_VALUE } from '@/shared/constants';

export const App = () => {
	const [certsOptions, setCertsOptions] = useState<Option[]>([]);
	const [message, setMessage] = useState('');
	const [thumbprint, setThumbprint] = useState('');
	const [url, setUrl] = useState('');

	useEffect(() => {
		// Получает сертификаты пользователя
		getUserCertificates().then(certs => {
			// Сохраняет имя и отпечаток сертификатов в списке
			const options = certs.map(cert => {
				return {
					label: cert.name.replace(/^"|"$/g, '').replace(/""/g, '"'),
					value: cert.thumbprint,
				};
			});
			// Записывает в хранилище компонента
			setCertsOptions(options);
		});
	}, []);

	// Обработчик выбора сертификата
	const handleCertChange = async (e: ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target;
		if (value === DEFAULT_CERT_VALUE) {
			setThumbprint('');
			setUrl('');
			return;
		}
		// Получает отпечаток выбранного сертификата
		const { thumbprint } = await getCertificate(value);
		// Записывает отпечаток в хранилище компонента
		setThumbprint(thumbprint);
	};

	// Обработчик текстового поля
	const handleChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(e.target.value);
	};

	// Обработчик кнопки генерации подписи
	const handleGenerateSignature = async () => {
		const blob = await create(thumbprint, message);
		// Создает ссылку для скачивания
		const url = URL.createObjectURL(blob);
		// Записывает ссылку в хранилище компонента
		setUrl(url);
	};

	return (
		<div className='sign-data'>
			<h3>Открепленная электронная подпись</h3>
			{/* Список сертификатов */}
			<CertSelect handler={handleCertChange} options={certsOptions} />
			{/* Сообщение на подпись */}
			<Message handler={handleChangeMessage} message={message} />
			{/* Кнопка для генерации подписи */}
			<SignGenerateButton
				disabled={!thumbprint || !message}
				handler={handleGenerateSignature}
				repeat={Boolean(url)}
			/>
			{/* Кнопка для скачивания подписи */}
			<SignDownLoadButton url={url} />
		</div>
	);
};
