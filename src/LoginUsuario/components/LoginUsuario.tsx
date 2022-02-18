import React, { FC, useEffect, useState } from "react"
import { gql, useQuery, useMutation } from "@apollo/client"


interface IActualizar{
    ver: Function
}

const loginUsuario = gql`
    mutation loginUsuario($CIF:String,$CorreoEmpleado:String){
        loginUsuario(CIF:$CIF,CorreoEmpleado:$CorreoEmpleado)
    }
`


const LoginUsuario:FC<IActualizar>=({ver})=>{

    const [error, setError] = useState<string>("")
    const [datos, setDatos] = useState({
        CIF:'',
        CorreoEmpleado:''
    })

    const handleInputChange = (event: any) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const [createLink] = useMutation(loginUsuario, {
        variables: {
           CIF:datos.CIF,
           CorreoEmpleado:datos.CorreoEmpleado

        }
    })

    async function ejecucionMutation() {
        const d = await createLink()
        if (d.data.loginUsuario === true) {
            localStorage.setItem('CIF',datos.CIF)
            localStorage.setItem('Correo',datos.CorreoEmpleado)
            ver("Calendario")    //PANTALLA SIGUIENTE
        }else{
            setError("No existe")
        }
    }


    return(
        
            <div id="PantallaLoginEmpresa">
            <div id="LoginEmpresa">
                <div id="TituloLoginEmpresa">
                    <h1>LOGIN USUARIO</h1>
                </div>
                <div id="InputsLoginEmpresa">
                    <input type="text" placeholder="CIF" name="CIF" onChange={handleInputChange}/>
                    <input type="email" placeholder="Correo" name="CorreoEmpleado" onChange={handleInputChange}/>
                </div>
                <div id="BotonLoginEmpresa">
                    <button onClick={()=>{ver("MenuPrincipal")}}>VOLVER</button>
                    <button onClick={()=>{ejecucionMutation()}}>INICIA SESIÓN</button>
                </div>
                {error==="No existe" && <div>No estas registrado en esta empresa</div>}
                <div id="LoginNoHayCuenta">
                    <p onClick={()=>{ver("LoginEmpresa")}}>Pincha aquí para Iniciar Sesion como empresa</p>
                </div>
              
            </div>
        </div>
        
    )
}

export default LoginUsuario