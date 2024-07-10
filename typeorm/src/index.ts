
// docker run --name=mysql1 -e MYSQL_ALLOW_EMPTY_PASSWORD=yes -e MYSQL_DATABASE=test -p 5432:3306 -d mysql
// If this doesn't work, check your existing containers

import {
  BaseEntity,
  Column,
  DataSource,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}

const dataSource = new DataSource({
  type: "mysql",
  port: 5432,
  username: "root",
  password: "",
  database: "test",
  synchronize: true,
  entities: [User],
});

const user = new User();
user.firstName = "John";
user.lastName = "Doe";

dataSource.initialize().then(async () => {
  await dataSource.manager.save(user);
  console.log(await dataSource.manager.find(User));
});
