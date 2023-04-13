import "./styles.css"
import AuthContext from "../../context/AuthProvider"
import {BiRefresh} from "react-icons/bi"
import { useState, useContext, useEffect } from "react"

export function TransactionsSection({refreshUserData}){
    const auth = useContext(AuthContext)

    const [filter, setFilter] = useState("all")
    const [allTransactions, setAllTransactions] = useState([])
    const [creditTransactions, setCreditTransactions] = useState([])
    const [debitTransactions, setDebitTransactions] = useState([])

    function convertDate(dateStr){
        const [datetime, trim] = dateStr.split(".");
        const [date, time] = datetime.split("T");
        const [yyyy, mm, dd] = date.split("-");
        const [hour, min, sec] = time.split(":");
 
        return (`${dd}/${mm}/${yyyy} - ${hour}:${min}`)
    }
    function convertMoney(valueStr){
        
        const [integer, decimal] = valueStr.split(".");
        return (`R$ ${integer},${decimal}`)
    }

    function transactionOptionSwitch(){
        switch(filter){
            case "all":
                return (
                    <ul>
                        {allTransactions.map(transaction => 
                            <li>
                                <div>{convertDate(transaction.createdAt)}</div>
                                <div>
                                    {
                                        `${transaction.type === "credit"
                                        ? "de"
                                        :"para"}: `
                                    }
                                    <span>
                                        {
                                            transaction.type === "credit"
                                            ?transaction.debtee
                                            :transaction.creditee
                                        }
                                    </span>
                                </div>
                                <div className={transaction.type === "credit"?"increase":"decrease"}>
                                    {convertMoney(transaction.value)}
                                </div>
                            </li>
                        )}
                    </ul>
                )
            case "credits":
                return (
                    <ul>
                        {creditTransactions.map(transaction => 
                            <li>
                                <div>{convertDate(transaction.createdAt)}</div>
                                <div>
                                    {
                                        `${transaction.type === "credit"
                                            ? "de"
                                            :"para"}: `
                                        }
                                    <span>
                                        {
                                            transaction.type === "credit"
                                            ?transaction.debtee
                                            :transaction.creditee
                                        }
                                    </span>
                                </div>
                                <div className={transaction.type === "credit"?"increase":"decrease"}>
                                    {convertMoney(transaction.value)}
                                </div>
                            </li>
                        )}
                    </ul>
                )
            case "debts":
                return (
                    <ul>
                        {debitTransactions.map(transaction => 
                            <li>
                                <div>{convertDate(transaction.createdAt)}</div>
                                <div>
                                    {
                                        `${transaction.type === "credit"
                                            ? "de"
                                            :"para"}: `
                                        }
                                    <span>
                                        {
                                            transaction.type === "credit"
                                            ?transaction.debtee
                                            :transaction.creditee
                                        }
                                    </span>
                                </div>
                                <div className={transaction.type === "credit"?"increase":"decrease"}>
                                    {convertMoney(transaction.value)}
                                </div>
                            </li>
                        )}
                    </ul>
                )
            default:
                break;
        }
    }

    const sortArray = (arr) => {
        arr.sort((a,b) => (a.createdAt < b.createdAt) ? 1 : ((b.createdAt < a.createdAt) ? -1 : 0))
        return arr
    }
    const getTransactions = async () => {
        const result = await auth.transaction()
        if(result){
            setCreditTransactions(sortArray(result.creditsResponse))
            setDebitTransactions(sortArray(result.debitsResponse))
            setAllTransactions(sortArray(result.creditsResponse.concat(result.debitsResponse)))
        }
    }
    const refreshData = () => {
        getTransactions();
        refreshUserData();
    }

    useEffect(()=>{
        getTransactions();
    },[])
    return <article className="transactions-container">
        <header>
            <h2>Minhas Transações</h2>
            <button className="refresh" onClick={refreshData}><BiRefresh /></button>
        </header>
        <div>
            <button className={filter === "all"? "all" : ""} onClick={()=>setFilter("all")}>todas</button>
            <button className={filter === "credits"? "credit" : ""} onClick={()=>setFilter("credits")}>recebidas</button>
            <button className={filter === "debts"? "debt" : ""} onClick={()=>setFilter("debts")}>realizadas</button>
        </div>
        <section>
            <ul>
                {transactionOptionSwitch()}
            </ul>
        </section>
    </article>
}