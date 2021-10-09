const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class UserROle1633751312210 {
    name = 'UserROle1633751312210'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`nestjs\`.\`user\` ADD \`roles\` enum ('ROLE_USER', 'ROLE_ADMIN') NOT NULL DEFAULT 'ROLE_USER'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`nestjs\`.\`user\` DROP COLUMN \`roles\``);
    }
}
