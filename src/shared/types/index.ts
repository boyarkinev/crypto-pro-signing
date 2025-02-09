import { ChangeEvent } from 'react';

export type Option = {
	label: string;
	value: string;
};

export type File = string | ArrayBuffer | null;

export type CertSelectProps = {
	options: Option[];
	handler: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export type MessageProps = {
	disabled: boolean;
	message: string;
	handler: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export type MessageToFileButtonProps = {
	message: string;
	name: string;
};

export type AttachmentFileProps = {
	disabled: boolean;
	handler: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type SignGenerateButtonProps = {
	disabled: boolean;
	handler: () => void;
	repeat: boolean;
};

export type SignDownLoadButtonProps = { name: string; url: string };
