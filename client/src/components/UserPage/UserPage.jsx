import "./styles.css"
import {Button} from "../Button/Button"
import { useState, useEffect, useContext } from "react"
import AuthContext from "../../context/AuthProvider"
import { PaymentSection } from "../PaymentSection/PaymentSection"
import { TransactionsSection } from "../TransactionsSection/TransactionsSection"
import {useNavigate} from "react-router-dom"

export function UserPage() {
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  const [userData, setUserData] = useState();
  const [appOption, setAppOption] = useState("main");

  const auth = useContext(AuthContext)
  const navigate = useNavigate();

  async function handdleLogut() {
    await auth.logout()
    navigate("/login")
  }

  function optionsSwitch(){
    switch(appOption){
      case "main":
        return <>
          <div>
            <Button classe="green-btn" text="pagar" click={()=> setAppOption("payment")} />
            <Button classe="purple-btn" text="transações" click={()=> setAppOption("transactions")}/>
          </div>
        </>
      case "payment":
        return <>
          <div>
            <Button classe="purple-btn return-btn" text="x" click={()=> setAppOption("main")} />
          </div>
          <PaymentSection refreshUserData={refreshUserData} />
        </>
      case "transactions":
        return <>
          <div>
            <Button classe="purple-btn return-btn" text="x" click={()=> setAppOption("main")} />
          </div>
          <TransactionsSection refreshUserData={refreshUserData} />
        </>
      default:
        break
    }
  }
  const refreshUserData = async() => {
    try{
      const data = await auth.getUserData()
      setUserData(data)
    } catch(err) {
      console.log(err)
    }
  }
  useEffect(()=>{
    refreshUserData();
  },[])
  return (<section className="user-section">
    <div className="content-container">
      <div>
        <Button classe="purple-brn" text="sair" click={handdleLogut} />
        <button className="hide-input-btn" onClick={() => setIsBalanceHidden(!isBalanceHidden)}>
          <div className={`eye-open ${isBalanceHidden ? "" : "hidden" }`}>
            <div>
              <div></div>
            </div>
          </div>
          <div className={`eye-close ${isBalanceHidden ? "hidden" : "" }`}>
            <div></div>
            <div></div>
            <div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </button>
      </div>
      <div>
        <output>R$ {isBalanceHidden? userData.balance : "----"}</output>
      </div>
      <section className="options-section">
        { optionsSwitch(appOption) }
      </section>
      
    </div>
  </section>)
}
