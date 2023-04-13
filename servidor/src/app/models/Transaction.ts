import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne} from "typeorm"
import { Account } from "./Account";

@Entity("transactions")
export class Transaction {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @ManyToOne(() => Account, (account) => account.id)
    debitedAccount: Account;
    
    @ManyToOne(() => Account, (account) => account.id)
    creditedAccount: Account;

    @Column({type: "decimal", precision: 11,scale: 2})
    value: number;

    @CreateDateColumn({type: "timestamp", default: ()=> "CURRENT_TIMESTAMP"})
    createdAt: Date;
}