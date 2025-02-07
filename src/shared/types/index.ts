import { ChangeEvent } from 'react';

export type Option = {
	label: string;
	value: string;
};

export type CertSelectProps = {
	options: Option[];
	handler: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export type SignGenerateButtonProps = {
	disabled: boolean;
	handler: () => void;
	repeat: boolean;
};

export type SignDownLoadButtonProps = { url: string };
