import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`work\` ADD \`list_hover_media_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`work_list_hover_media_idx\` ON \`work\` (\`list_hover_media_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_work\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`orientation\` text DEFAULT 'Square',
  	\`date\` text,
  	\`main_media_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`main_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_work\`("id", "orientation", "date", "main_media_id", "updated_at", "created_at") SELECT "id", "orientation", "date", "main_media_id", "updated_at", "created_at" FROM \`work\`;`)
  await db.run(sql`DROP TABLE \`work\`;`)
  await db.run(sql`ALTER TABLE \`__new_work\` RENAME TO \`work\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`work_main_media_idx\` ON \`work\` (\`main_media_id\`);`)
  await db.run(sql`CREATE INDEX \`work_updated_at_idx\` ON \`work\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`work_created_at_idx\` ON \`work\` (\`created_at\`);`)
}
