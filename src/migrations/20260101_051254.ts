import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`package_summary\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`package\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`package_summary_order_idx\` ON \`package_summary\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`package_summary_parent_id_idx\` ON \`package_summary\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`package_summary_locale_idx\` ON \`package_summary\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`package_details\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`content\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`package\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`package_details_order_idx\` ON \`package_details\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`package_details_parent_id_idx\` ON \`package_details\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`package_details_locale_idx\` ON \`package_details\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`package\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`main_media_id\` integer,
  	\`code\` text,
  	\`price\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`main_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`package_main_media_idx\` ON \`package\` (\`main_media_id\`);`)
  await db.run(sql`CREATE INDEX \`package_updated_at_idx\` ON \`package\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`package_created_at_idx\` ON \`package\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`package_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`package\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`package_locales_locale_parent_id_unique\` ON \`package_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`package_id\` integer REFERENCES package(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_package_id_idx\` ON \`payload_locked_documents_rels\` (\`package_id\`);`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`package_summary\`;`)
  await db.run(sql`DROP TABLE \`package_details\`;`)
  await db.run(sql`DROP TABLE \`package\`;`)
  await db.run(sql`DROP TABLE \`package_locales\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`work_type_id\` integer,
  	\`work_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`work_type_id\`) REFERENCES \`work_type\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`work_id\`) REFERENCES \`work\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id", "work_type_id", "work_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id", "work_type_id", "work_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_work_type_id_idx\` ON \`payload_locked_documents_rels\` (\`work_type_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_work_id_idx\` ON \`payload_locked_documents_rels\` (\`work_id\`);`)
}
