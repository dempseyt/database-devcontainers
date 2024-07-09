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
