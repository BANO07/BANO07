import { join } from "path";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOption : DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'auth',
    entities: [join(__dirname, "../**/*.entity.js")],
    migrations: ["src/migrations/done/*.js"],
    synchronize: true,
    logging : true,
}

const dataSource = new DataSource(dataSourceOption);
export default dataSource;