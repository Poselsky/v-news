import { Language } from "../enums/Language";

export default interface Article {
	author?: string;
	clean_url: URL;
	country: string;
	language: Language;
	link: URL;
	media: URL;
	media_content?: any;
	published_date: Date;
	rank: string;
	rights: string;
	summary: string;
	title: string;
	topic: string;
}
