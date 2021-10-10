const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class UserInfo1633867734465 {
    name = 'UserInfo1633867734465'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`nestjs\`.\`user\` ADD \`address\` tinytext NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`nestjs\`.\`user\` ADD \`education\` tinytext NULL`);
        await queryRunner.query(`ALTER TABLE \`nestjs\`.\`user\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`nestjs\`.\`user\` ADD \`updatedAt\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`nestjs\`.\`user\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`nestjs\`.\`user\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`nestjs\`.\`user\` DROP COLUMN \`education\``);
        await queryRunner.query(`ALTER TABLE \`nestjs\`.\`user\` DROP COLUMN \`address\``);
    }
}
