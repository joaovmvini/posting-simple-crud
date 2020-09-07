import { MigrationInterface, QueryRunner } from "typeorm";

export class createDb1599318467497 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("CREATE DATABASE socialnetwork");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP DATABASE IF EXISTS socialnetwork");
  }
}
