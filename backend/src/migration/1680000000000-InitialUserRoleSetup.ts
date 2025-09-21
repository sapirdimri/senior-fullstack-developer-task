import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialUserRolesSetup1680000000000 implements MigrationInterface {
  name = 'InitialUserRolesSetup1680000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(`
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT NOT NULL UNIQUE,
                    roles JSON NOT NULL DEFAULT '["User"]',
                    status TEXT NOT NULL DEFAULT 'Enabled'
                )
            `);

      await queryRunner.query(`
                INSERT OR IGNORE INTO users (username, roles, status) VALUES
                ('admin_user', ["Admin", "User"], 1),
                ('regular_user', ["User"], 1),
                ('editor_user', ["Editor"], 1),
                ('sapir_user', ["Admin", "User","Editor"], 1)
            `);
    } catch (error) {
      console.error('Migration up error:', error);
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(`DROP TABLE IF EXISTS users`);
    } catch (error) {
      console.error('Migration down error:', error);
      throw error;
    }
  }
}
