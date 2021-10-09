const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class UsersTable1633746475526 {
    name = 'UsersTable1633746475526'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`nestjs\`.\`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` tinytext NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`nestjs\`.\`user\``);
    }
}
