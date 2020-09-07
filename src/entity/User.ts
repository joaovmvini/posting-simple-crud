import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Post } from "./Post";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  name: string;

  @Column({ type: "int" })
  age: number;

  @Column({ length: 120 })
  email: string;

  @Column({ length: 40 })
  password: string;

  @OneToMany((target) => Post, (post) => post.user)
  posts: Post[];
}
