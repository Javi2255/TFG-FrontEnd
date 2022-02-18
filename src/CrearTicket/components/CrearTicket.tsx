import React, { FC, useEffect, useState } from "react"
import { gql, useQuery, useMutation } from "@apollo/client"
import '../estilo/CrearTicket.css'
interface Ipaso {
    ver2: Function
}


const crearTicket = gql`
      mutation crearTicket($CIF:String,$TipoIncidencia:String,$Descripcion:String){
        crearTicket(CIF:$CIF,TipoIncidencia:$TipoIncidencia,Descripcion:$Descripcion)
}
`


const CrearTicket: FC<Ipaso> = ({ ver2 }) => {

    const [datos, setDatos] = useState({
        TipoIncidencia:'',
        Descripcion:''


    })

    const handleInputChange = (event: any) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })

    }

    const enviarDatos = (event: any) => {
        event.preventDefault()
        ejecutarMutation()
    }
    async function ejecutarMutation() {
        
        await createLink3()
        ver2("")
    }

    const [createLink3] = useMutation(crearTicket, { variables: { CIF: localStorage.getItem('CIF')?.toString(), TipoIncidencia:datos.TipoIncidencia,Descripcion:datos.Descripcion  } })
    return(
        <div id="PantallaTicketGeneral">
            <div id="PantallaTicket">
                <div>
                    <h1>TICKET</h1>
                </div>
            <form id="Form" name="registro" onSubmit={enviarDatos}>
                <div id="Campos">
                <select name="TipoIncidencia" id="" onChange={handleInputChange}>
                    <option value="Anulacion Reserva">Anulacion Reserva</option>
                    <option value="Usuario">Eliminar Usuario</option>
                    <option value="Cierre Cuenta">Eliminar Cuenta</option>
                </select>
                <textarea id="textarea" name="Descripcion" onChange={handleInputChange} maxLength={250} placeholder="Descripcion (caracteres maximos: 250)"/>
                </div>
                <div id="botonesTicket">
                    <button onClick={()=>{ver2("")}}>VOLVER</button>
                    <input type="submit" value="ENVIAR"/>
                </div>
                 </form>
            </div>
           
        </div>
    )
}

export default CrearTicket