import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`homepage_settings_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`work_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`homepage_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`work_id\`) REFERENCES \`work\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`homepage_settings_rels_order_idx\` ON \`homepage_settings_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`homepage_settings_rels_parent_idx\` ON \`homepage_settings_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_settings_rels_path_idx\` ON \`homepage_settings_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`homepage_settings_rels_work_id_idx\` ON \`homepage_settings_rels\` (\`work_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`homepage_settings_rels\`;`)
}
