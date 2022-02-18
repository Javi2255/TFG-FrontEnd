import React, { FC, useEffect, useState } from "react"
import { gql, useQuery, useMutation } from "@apollo/client"
import '../estilos/MenuLogin.css'

interface IActualizar{
    ver: Function
}

const loginEmpresa = gql`
    mutation loginEmpresa($CIF:String,$Password:String){
        loginEmpresa(CIF:$CIF,Password:$Password)
    }
`


const LoginEmpresa:FC<IActualizar> = ({ver})=>{

    const [error, setError] = useState<string>("")
    const [datos, setDatos] = useState({
        CIF:'',
        Password:''
    })

    const handleInputChange = (event: any) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }


    const [createLink] = useMutation(loginEmpresa, {
        variables: {
           CIF:datos.CIF,
           Password:datos.Password

        }
    })

    async function ejecucionMutation() {
        const d = await createLink()
        if (d.data.loginEmpresa === "Verificada") {
            localStorage.setItem('CIF',datos.CIF)
            ver("aplicacion")
        } else if(d.data.loginEmpresa === "No Verificada"){
            setError("No Verificada")
        }else if(d.data.loginEmpresa === "Contraseña Incorrecta"){
            setError("Contraseña Incorrecta")
        }
        else {
            setError("No Existe")
        }
    }

    return (
        <div id="PantallaLoginEmpresa">
            <div id="LoginEmpresa">
                <div id="TituloLoginEmpresa">
                    <h1>LOGIN EMPRESA</h1>
                </div>
                <div id="InputsLoginEmpresa">
                    <input type="text" placeholder="CIF" name="CIF" onChange={handleInputChange}/>
                    <input type="password" placeholder="Contraseña" name="Password" onChange={handleInputChange}/>
                </div>
                <div id="BotonLoginEmpresa">
                    <button onClick={()=>{ver("MenuPrincipal")}}><b>VOLVER</b></button>
                    <button onClick={()=>{ejecucionMutation()}}><b>INICIA SESIÓN</b></button>
                </div>
                <div id="LoginNoHayCuenta">
                    <p onClick={()=>{ver("RegistroEmpresa")}}>¿Aun no tienes cuenta? Registrate aquí</p>
                    <p onClick={()=>{ver("LoginEmpleado")}}>Pincha aquí para Iniciar Sesion como empleado</p>
                </div>
                {error==="No Verificada" && <div className="error">No estas verificado. Verifica con tu correo</div>}
                {error==="No Existe" && <div className="error">Esta cuenta no existe. Registrate!</div>}
                {error==="Contraseña Incorrecta" && <div className="error">Contraseña Incorrecta</div>}
                
            </div>
        </div>
    )
}

export default LoginEmpresa