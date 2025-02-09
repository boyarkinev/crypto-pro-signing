import './App.css';

import { getCertificate, getUserCertificates } from 'crypto-pro';
import { ChangeEvent, useEffect, useState } from 'react';

import {
	AttachmentFile,
	CertSelect,
	Message,
	MessageToFileButton,
	SignDownLoadButton,
	SignGenerateButton,
} from '@/features';
import { File, Option } from '@/shared/types';
import { DEFAULT_CERT_VALUE } from '@/shared/constants';
import { createSignature, getUrlFromBlob } from '@/shared/lib';

export const App = () => {
	const [certsOptions, setCertsOptions] = useState<Option[]>([]);
	const [message, setMessage] = useState('');
	const [file, setFile] = useState<File>(null);
	const [fileName, setFileName] = useState('');
	const [thumbprint, setThumbprint] = useState('');
	const [url, setUrl] = useState('');

	useEffect(() => {
		// Получает сертификаты пользователя
		getUserCertificates().then(certs => {
			// Сохраняет имя и отпечаток сертификатов
			// для выпадающего списка
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

	useEffect(() => {
		// Если для подписи введен текст
		if (message) {
			// Записывает имя файла,
			// который будет сохранен для проверки подписи
			setFileName(`${Date.now()}.xml`);
		}
	}, [message]);

	// Обработчик выбора сертификата
	const handleCertChange = async (e: ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target;
		// Очищает хранилище, если в списке сертификатов
		// выбрано значение по умолчанию
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

	// Обработчик загрузки файла
	const handleFileLoad = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files as FileList;
		if (files.length) {
			// Записывает объект файла
			const file = files[0];
			// Записывает имя файла в хранилище компонента
			setFileName(file.name);
			const reader = new FileReader();
			// Получает доступ к файлу в формате ArrayBuffer
			reader.readAsArrayBuffer(file);
			reader.onload = () => setFile(reader.result as File);
			reader.onerror = () => console.error(reader.error);
		}
	};

	// Обработчик текстового поля
	const handleChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(e.target.value);
	};

	// Обработчик кнопки генерации подписи
	const handleGenerateSignature = async () => {
		const byteArray = await createSignature(thumbprint, file ?? message);
		if (byteArray) {
			// Записывает ссылку в хранилище компонента
			setUrl(getUrlFromBlob(byteArray));
		}
	};

	return (
		<div className='sign-data'>
			<h3>Открепленная электронная подпись</h3>
			{/* Список сертификатов */}
			<CertSelect handler={handleCertChange} options={certsOptions} />
			{/* Загрузить файл для подписи */}
			<AttachmentFile disabled={Boolean(message)} handler={handleFileLoad} />
			{/* Сообщение на подпись */}
			<Message
				handler={handleChangeMessage}
				message={message}
				disabled={Boolean(file)}
			/>
			{/* Кнопка для сохранения сообщения в файл */}
			<MessageToFileButton message={message} name={fileName} />
			{/* Кнопка для генерации подписи */}
			<SignGenerateButton
				disabled={!thumbprint || !(message || file)}
				handler={handleGenerateSignature}
				repeat={Boolean(url)}
			/>
			{/* Кнопка для скачивания подписи */}
			<SignDownLoadButton url={url} name={fileName} />
		</div>
	);
};
