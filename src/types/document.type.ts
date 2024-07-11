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

export type CustomFile = {
	name: string;
	type: string;
	size?: bigint;
};

// id: uuid('id').primaryKey().defaultRandom(),
// createdBy: uuid('created_by')
// 	.notNull()
// 	.references(() => UserTable.id),
// fileName: varchar('file_name', { length: 255 }).notNull(),
// fileType: varchar('file_type', { length: 50 }).notNull(),
// mimeType: varchar('mime_type', { length: 100 }).notNull(),
// fileSize: bigint('file_size', { mode: 'bigint' }).notNull(),
// createdAt: timestamp('created_at').defaultNow(),
// updatedAt: timestamp('updated_at').defaultNow(),
// lastAccessedAt: timestamp('last_accessed_at').defaultNow(),
// deletedAt: timestamp('deleted_at')
// 	.default(sql`NULL`)
// 	.$type<Date | null>(),
// fileS3key: varchar('file_s3_key', { length: 255 }).notNull(),
// category: varchar('category', { length: 100 }).notNull(),
// parentId: uuid('parent_id')
// 	.default(sql`NULL`)
// 	.references((): AnyPgColumn => DocumentTable.id),
// isDirectory: boolean('is_directory').default(false),
