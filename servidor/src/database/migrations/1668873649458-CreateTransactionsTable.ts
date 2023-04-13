import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTransactionsTable1668873649458 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: "transactions",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "debitedAccount",
                        type: "uuid"
                    },
                    {
                        name: "creditedAccount",
                        type: "uuid"
                    },
                    {
                        name: "value",
                        type: "numeric"
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "now()"
                    }
            ],
            foreignKeys: [
                {
                    name: "fk_debitedAccount",
                    columnNames: ["debitedAccount"],
                    referencedTableName: "accounts",
                    referencedColumnNames: ["id"]
                },
                {
                    name: "fk_creditedAccountId",
                    columnNames: ["creditedAccountId"],
                    referencedTableName: "accounts",
                    referencedColumnNames: ["id"]
                }
            ]
        })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("transactions");
        // await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }

}
