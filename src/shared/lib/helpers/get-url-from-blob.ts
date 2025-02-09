/**
 * Создает ссылку для скачивания файла
 *
 * @param data - сообщение или подпись
 * @returns Ссылка для скачивания файла
 */
export const getUrlFromBlob = (data: string | ArrayBuffer) => {
	// Создает файл из подписи
	const blob = new Blob([data]);
	// Возвращает ссылку для скачивания
	return URL.createObjectURL(blob);
};
