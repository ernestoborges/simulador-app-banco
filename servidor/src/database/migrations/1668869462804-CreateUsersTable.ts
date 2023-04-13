import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersTable1668869462804 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

        await queryRunner.createTable( new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()",
                },
                {
                    name: "username",
                    type: "varchar",
                    isUnique: true,
                },
                {
                    name: "password",
                    type: "varchar",
                },
                {
                    name: "account",
                    type: "uuid"
                }
            ],
            foreignKeys: [
                {
                    name: "fk_account",
                    columnNames: ["account"],
                    referencedTableName: "accounts",
                    referencedColumnNames: ["id"]
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }
}
