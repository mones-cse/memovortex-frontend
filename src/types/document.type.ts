export type TDocument = {
	id: string;
	createdBy: string;
	fileName: string;
	fileType: string;
	mimeType: string;
	fileSize: bigint;
	createdAt: string;
	updatedAt: string;
	lastAccessedAt: string;
	deletedAt: string;
	fileS3key: string;
	category: string;
	parentId: string | null;
	isDirectory: boolean;
};

export type TCreateDocument = Pick<
	TDocument,
	| "fileName"
	| "fileType"
	| "mimeType"
	| "fileSize"
	| "fileS3key"
	| "category"
	| "parentId"
	| "isDirectory"
>;

export type TDisplayDocument = Partial<TCreateDocument> & Pick<TDocument, "id">;

export type CustomFile = {
	name: string;
	type: string;
	size?: bigint;
};
