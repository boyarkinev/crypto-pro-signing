import { File } from '@/shared/types';
import { createDetachedSignature, createHash } from 'crypto-pro';

/**
 * Создает открепленную подпись
 *
 * @param thumbprint - отпечаток сертификата
 * @param data - подписываемое сообщение
 * @returns Бинарные данные в формате Blob
 */
export const createSignature = async (
	thumbprint: string,
	data: File
): Promise<ArrayBuffer | undefined> => {
	let byteArray;
	if (data) {
		// Создает хеш сообщения
		const hash = await createHash(data);
		// Создает открепленную подпись по отпечатку сертификата и хешу сообщения
		let signature = await createDetachedSignature(thumbprint, hash);
		// Убирает лишние переносы в подписи
		signature = signature.replace(/(\r\n|\n|\r)/gm, '');
		// Конвертирует строки base64 в бинарные данные
		byteArray = Uint8Array.from(atob(signature), c => c.charCodeAt(0));
	}
	return byteArray;
};
