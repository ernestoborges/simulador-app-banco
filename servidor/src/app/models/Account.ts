import {Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn} from "typeorm"
import { Transaction } from "./Transaction";
import { User } from "./User";

@Entity("accounts")
export class Account {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column({type: "decimal", precision: 11, scale: 2})
    balance: Number;

    @OneToOne(() => User, (user)=> user.account)
    user: User 

    @OneToMany(() => Transaction, (transaction) => transaction.debitedAccount)
    @JoinColumn()
    debitedTransactions: Transaction[]

    @OneToMany(() => Transaction, (transaction) => transaction.creditedAccount)
    @JoinColumn()
    creditedTransactions: Transaction[]
}
