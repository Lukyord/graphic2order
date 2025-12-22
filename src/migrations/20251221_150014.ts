import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`work_type\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`work_type_slug_idx\` ON \`work_type\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`work_type_updated_at_idx\` ON \`work_type\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`work_type_created_at_idx\` ON \`work_type\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`work\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`orientation\` text DEFAULT 'Square',
  	\`date\` text,
  	\`main_media_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`main_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`work_main_media_idx\` ON \`work\` (\`main_media_id\`);`)
  await db.run(sql`CREATE INDEX \`work_updated_at_idx\` ON \`work\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`work_created_at_idx\` ON \`work\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`work_locales\` (
  	\`title\` text,
  	\`content\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`work\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE UNIQUE INDEX \`work_locales_locale_parent_id_unique\` ON \`work_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`work_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	\`locale\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`work\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`work_texts_order_parent_idx\` ON \`work_texts\` (\`order\`,\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`work_texts_locale_parent\` ON \`work_texts\` (\`locale\`,\`parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`work_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`work_type_id\` integer,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`work\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`work_type_id\`) REFERENCES \`work_type\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`work_rels_order_idx\` ON \`work_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`work_rels_parent_idx\` ON \`work_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`work_rels_path_idx\` ON \`work_rels\` (\`path\`);`)
  await db.run(
    sql`CREATE INDEX \`work_rels_work_type_id_idx\` ON \`work_rels\` (\`work_type_id\`);`,
  )
  await db.run(sql`CREATE INDEX \`work_rels_media_id_idx\` ON \`work_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_services\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`site_settings_services_order_idx\` ON \`site_settings_services\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`site_settings_services_parent_id_idx\` ON \`site_settings_services\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`site_settings_services_locale_idx\` ON \`site_settings_services\` (\`_locale\`);`,
  )
  await db.run(sql`CREATE TABLE \`site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`contact_info_address\` text,
  	\`contact_info_email\` text,
  	\`contact_info_phone\` text,
  	\`contact_info_facebook\` text,
  	\`contact_info_instagram\` text,
  	\`contact_info_line\` text,
  	\`contact_info_tiktok\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`homepage_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`about_projects_count\` text,
  	\`about_partners_count\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`homepage_settings_locales\` (
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`homepage_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`homepage_settings_meta_meta_image_idx\` ON \`homepage_settings_locales\` (\`meta_image_id\`,\`_locale\`);`,
  )
  await db.run(
    sql`CREATE UNIQUE INDEX \`homepage_settings_locales_locale_parent_id_unique\` ON \`homepage_settings_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`contact_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`followers_count\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`contact_settings_locales\` (
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contact_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`contact_settings_meta_meta_image_idx\` ON \`contact_settings_locales\` (\`meta_image_id\`,\`_locale\`);`,
  )
  await db.run(
    sql`CREATE UNIQUE INDEX \`contact_settings_locales_locale_parent_id_unique\` ON \`contact_settings_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`work_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`work_settings_locales\` (
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`work_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`work_settings_meta_meta_image_idx\` ON \`work_settings_locales\` (\`meta_image_id\`,\`_locale\`);`,
  )
  await db.run(
    sql`CREATE UNIQUE INDEX \`work_settings_locales_locale_parent_id_unique\` ON \`work_settings_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`about_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`about_settings_locales\` (
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`about_settings_meta_meta_image_idx\` ON \`about_settings_locales\` (\`meta_image_id\`,\`_locale\`);`,
  )
  await db.run(
    sql`CREATE UNIQUE INDEX \`about_settings_locales_locale_parent_id_unique\` ON \`about_settings_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`service_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`service_settings_locales\` (
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`service_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`service_settings_meta_meta_image_idx\` ON \`service_settings_locales\` (\`meta_image_id\`,\`_locale\`);`,
  )
  await db.run(
    sql`CREATE UNIQUE INDEX \`service_settings_locales_locale_parent_id_unique\` ON \`service_settings_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE \`pricing_settings_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pricing_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pricing_settings_faq_order_idx\` ON \`pricing_settings_faq\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pricing_settings_faq_parent_id_idx\` ON \`pricing_settings_faq\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pricing_settings_faq_locale_idx\` ON \`pricing_settings_faq\` (\`_locale\`);`,
  )
  await db.run(sql`CREATE TABLE \`pricing_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`pricing_settings_locales\` (
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pricing_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pricing_settings_meta_meta_image_idx\` ON \`pricing_settings_locales\` (\`meta_image_id\`,\`_locale\`);`,
  )
  await db.run(
    sql`CREATE UNIQUE INDEX \`pricing_settings_locales_locale_parent_id_unique\` ON \`pricing_settings_locales\` (\`_locale\`,\`_parent_id\`);`,
  )
  await db.run(
    sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`work_type_id\` integer REFERENCES work_type(id);`,
  )
  await db.run(
    sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`work_id\` integer REFERENCES work(id);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_work_type_id_idx\` ON \`payload_locked_documents_rels\` (\`work_type_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_work_id_idx\` ON \`payload_locked_documents_rels\` (\`work_id\`);`,
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`work_type\`;`)
  await db.run(sql`DROP TABLE \`work\`;`)
  await db.run(sql`DROP TABLE \`work_locales\`;`)
  await db.run(sql`DROP TABLE \`work_texts\`;`)
  await db.run(sql`DROP TABLE \`work_rels\`;`)
  await db.run(sql`DROP TABLE \`site_settings_services\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`homepage_settings\`;`)
  await db.run(sql`DROP TABLE \`homepage_settings_locales\`;`)
  await db.run(sql`DROP TABLE \`contact_settings\`;`)
  await db.run(sql`DROP TABLE \`contact_settings_locales\`;`)
  await db.run(sql`DROP TABLE \`work_settings\`;`)
  await db.run(sql`DROP TABLE \`work_settings_locales\`;`)
  await db.run(sql`DROP TABLE \`about_settings\`;`)
  await db.run(sql`DROP TABLE \`about_settings_locales\`;`)
  await db.run(sql`DROP TABLE \`service_settings\`;`)
  await db.run(sql`DROP TABLE \`service_settings_locales\`;`)
  await db.run(sql`DROP TABLE \`pricing_settings_faq\`;`)
  await db.run(sql`DROP TABLE \`pricing_settings\`;`)
  await db.run(sql`DROP TABLE \`pricing_settings_locales\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id" FROM \`payload_locked_documents_rels\`;`,
  )
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`,
  )
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`,
  )
}
