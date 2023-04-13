import "./styles.css"
import { Button } from "../Button/Button"
import AuthContext from "../../context/AuthProvider"
import { useState, useContext, useEffect } from "react"

export function PaymentSection({refreshUserData}){
    const auth = useContext(AuthContext)

    const [creditee, setCreditee] = useState("");
    const [value, setValue] = useState("");

    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");


    async function handdlePayment(e){
        e.preventDefault();
        try{
            await auth.payment(creditee, value)
            refreshUserData()
            setSuccessMsg("Transação realizada com sucesso");
          } catch (err) {
            setErrorMsg(err.response.data.error);
          }
    }

    useEffect(()=>{
        setErrorMsg("")
        setSuccessMsg("")
    }, [creditee, value] )

    return <article className="payment-container">
        <header>
            <h2>Realizar Pagamento</h2>
        </header>
        <section>
            <form onSubmit={handdlePayment}>
                <label>
                    usuario
                    <input
                    type="text" 
                    value={creditee}
                    onChange={(e)=>setCreditee(e.target.value)}
                    placeholder="usuario que receberá o pagamento"/>
                </label>
                <label>
                    valor
                    <input
                    type="number" 
                    value={value}
                    onChange={(e)=>setValue(e.target.value)}
                    placeholder="valor do pagamento"/>
                </label>
                <p className={errorMsg?"":"hidden"}>{errorMsg}</p>
                <p className={successMsg?"":"hidden"}>{successMsg}</p>
                <Button classe="green-btn" text="pagar" />
            </form>
        </section>

    </article>
}