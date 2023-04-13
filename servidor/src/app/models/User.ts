import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, BeforeInsert, BeforeUpdate} from "typeorm"
import { Account } from "./Account";
import bcrypt from "bcryptjs"

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column()
    username: string;

    @Column()
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    hashpassword() {
        this.password = bcrypt.hashSync(this.password, 8)
    }

    @OneToOne(() => Account, (account)=> account.user, {
        cascade: true,
    })
    @JoinColumn()
    account: Account
}