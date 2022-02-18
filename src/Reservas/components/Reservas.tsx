import React, { FC, useEffect, useState } from "react"
import { gql, useQuery, useMutation } from "@apollo/client"
import '../estilo/Reserva.css'

  interface Reservas{
    mesa:string
    Correo:string
    diaMes:number
}

interface IPaso2{
  ver2:Function
}

  const getReservas = gql`
  query getReservas($CIF:String,$Correo:String){
    getReservas(CIF:$CIF,Correo:$Correo){
      mesa
      Correo
      diaMes
    }
}
`
const cancelarReserva = gql`
      mutation cancelarReserva($CIF:String,$CorreoEmpleado:String,$diaMes:Int){
        cancelarReserva(CIF:$CIF,CorreoEmpleado:$CorreoEmpleado,diaMes:$diaMes)
}
`
const getComprobacionReserva = gql`
      query getComprobacionReserva($CIF:String,$Correo:String,$diaMes:Int){
        getComprobacionReserva(CIF:$CIF,Correo:$Correo,diaMes:$diaMes)
}
`
  
  const Reserva:FC<IPaso2>=({ver2})=>{
    const [diaMes,setDia]=useState<any>(0)
    const { loading, error, data, refetch } = useQuery(getReservas, { variables: { CIF: localStorage.getItem("CIF"),Correo: localStorage.getItem("Correo")} })
    const [createLink2] = useMutation(cancelarReserva, { variables: { CIF: localStorage.getItem('CIF')?.toString(), CorreoEmpleado:localStorage.getItem('Correo'), diaMes:diaMes} })
    const { loading:loading2, error:error3, data:data2, refetch:refetch2 } = useQuery(getComprobacionReserva, { variables: { CIF: localStorage.getItem("CIF"),Correo:  localStorage.getItem("Correo"), diaMes:diaMes} })
    useEffect(()=>{
      console.log("hola ")
      ejecutarMutation4();
    },[diaMes])

    async function ejecutarMutation4(){
      const d = await createLink2()
      if(d.data.cancelarReserva===true){
        refetch();
        refetch2()
        ver2(0)
      }

    }


    if(loading){return <div>Cargando...</div>}

    
    return(
       
        <div id="Reservas"> 
            
            {data.getReservas?.length===0 && <div>
                <h1>NO HAY RESERVAS ACTUALMENTE</h1> 
            </div>}

            {data.getReservas?.length>0 && 
              
                data.getReservas?.map((elem:Reservas)=>(
                  <div id="Mesas">
                    <div><b>MESA:</b> {elem.mesa}</div>
                    <div><b>CORREO:</b> {elem.Correo}</div>
                    <div><b>DIA RESERVA:</b> {elem.diaMes}</div>
                    <button onClick={()=>{setDia(elem.diaMes);refetch();}}>Borrar</button>
                    </div>)
                )

            
        }

        </div>
    )
  }

  export default Reserva