import { createDetachedSignature, createHash } from 'crypto-pro';

/**
 * Создает открепленную подпись
 *
 * @param thumbprint - отпечаток сертификата
 * @param data - подписываемое сообщение
 * @returns Бинарные данные в формате Blob
 */
export const create = async (
	thumbprint: string,
	data: string
): Promise<Blob> => {
	// Создает хеш сообщения
	const hash = await createHash(btoa(data));
	// Создает открепленную подпись по отпечатку сертификата и хешу сообщения
	let signature = await createDetachedSignature(thumbprint, hash);
	// Убирает лишние переносы в подписи
	signature = signature.replace(/(\r\n|\n|\r)/gm, '');
	// Конвертирует строки base64 в бинарные данные
	const byteArray = Uint8Array.from(atob(signature), c => c.charCodeAt(0));
	// Создает файл из подписи
	const blob = new Blob([byteArray], {
		type: 'application/pkcs7-signature',
	});

	return blob;
};
