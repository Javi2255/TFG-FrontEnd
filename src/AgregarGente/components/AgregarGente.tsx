import React, { FC, useEffect, useState } from "react"
import { gql, useQuery, useMutation } from "@apollo/client"
import '../estilo/AgregarGente.css'


interface Ipaso {
    ver2: Function
}



const insertarEmpleados = gql`
      mutation insertarEmpleados($CIF:String,$empleados:[IEmpleados]){
        insertarEmpleados(CIF:$CIF,empleados:$empleados)
}
`


const AgregarGente: FC<Ipaso> = ({ ver2 }) => {

    const [valor, setValor] = useState<any>()
    const [array, setArray] = useState<any>([])

    async function ejecutarMutation() {
        const d = await createLink()
        if(d.data.insertarEmpleados===true){
            ver2("")
        }
        
        
    }

    const [createLink] = useMutation(insertarEmpleados, { variables: { CIF: localStorage.getItem('CIF'), empleados: array } })



    return (
        <div id="agregar">
            <div id="personas">
                <div id="textoAgregar">
                    <h3>INSERTA EMPLEADOS PARA RESERVAR MESAS</h3>
                </div>
                <div>
                    <input type="text"  onChange={(e)=>{setValor(e.target.value)}} />
                    {array.length===0 && <button onClick={() => { 
                        let reserva:any[]=[]
                        let objeto={
                            Correo:valor,
                            reservas:reserva
                        }
                        array.push(objeto);
                        setArray(array);
                        setValor("")
                    }}><b>+</b></button>}
                </div>
                {array.map((elem: any, key:any) => (
                    <div id="correos">
                    <input type="text"  onChange={(e)=>{setValor(e.target.value)}} />
                    {key===array.length-1 && <button onClick={() => { 
                        let reserva:any[]=[]
                        let objeto={
                            Correo:valor,
                            reservas:reserva
                        }
                        array.push(objeto);
                        setArray(array);
                        setValor("")
                    }}><b>+</b></button>}
                    </div>
                ))}

            <div id="agregarBoton">
                <button id="button" onClick={() => {ver2("")}}><b>VOLVER</b></button>
                <button id="button" onClick={() => {ejecutarMutation()}}><b>ENVIAR</b></button>
            </div>
            </div>
            
            
        </div>
    )

}

export default AgregarGente