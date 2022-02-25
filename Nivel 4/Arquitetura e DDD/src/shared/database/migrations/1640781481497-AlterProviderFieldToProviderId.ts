import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export default class AlterProviderFieldToProviderId1640781481497
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("appointments", "provider");

    await queryRunner.addColumn(
      "appointments",
      new TableColumn({
        name: "provider_id",
        type: "uuid",
        isNullable: true, //cascade
      })
    );

    await queryRunner.createForeignKey(
      "appointments",
      new TableForeignKey({
        name: "AppointmentProvider",
        columnNames: ["provider_id"], // coluna que recebe a chave estrabgeira
        referencedColumnNames: ["id"], // qual é a coluna da outra tabelaque vai conter esse id
        referencedTableName: "users",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("appointments", "AppointmentProvider");

    await queryRunner.dropColumn("appointments", "provider_id");

    await queryRunner.addColumn(
      "appointments",
      new TableColumn({
        name: "provider",
        type: "varchar",
        isNullable: false,
      })
    );
  }
}
