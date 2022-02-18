import React, { FC, useEffect, useState } from "react"
import { gql, useQuery, useMutation } from "@apollo/client"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../estilo/Calendario.css'

interface Ipaso {
    ver: Function
  }

  const getPos2 = gql`
      query getPos2($CIF:String,$Correo:String,$diaMes:Int){
        getPos2(CIF:$CIF,Correo:$Correo,diaMes:$diaMes){
          id
          x
          y
          src
        }
}
`
const getComprobacionReserva = gql`
      query getComprobacionReserva($CIF:String,$Correo:String,$diaMes:Int){
        getComprobacionReserva(CIF:$CIF,Correo:$Correo,diaMes:$diaMes)
}
`
  const Calendario: FC<Ipaso> = ({ver}) =>{

    const [value, setDateState] = useState(new Date());
    
    const changeDate = (e:any) => {
        setDateState(e);
        
      }
      let maxDate:Date= new Date(new Date().getFullYear(), new Date().getMonth()+1, 0);
      const { loading, error:error2, data, refetch } = useQuery(getPos2, { variables: { CIF: localStorage.getItem("CIF"),Correo:localStorage.getItem('Correo'),diaMes: value!.getDate()} })
      const { loading:loading2, error:error3, data:data2, refetch:refetch2 } = useQuery(getComprobacionReserva, { variables: { CIF: localStorage.getItem("CIF"),Correo:  localStorage.getItem("Correo"), diaMes:(parseInt(localStorage!.getItem("diaSeleccionado")!))} })
      return(
          <div id="Calendario">
              <div id="Calendario2">
                <Calendar value={value} onChange={changeDate} minDate={new Date()} maxDate={maxDate}/>
                <div id="botonAceptar">
                  <button id="Aceptar" onClick={()=>{localStorage.setItem('diaSeleccionado',value.getDate().toString()); refetch();refetch2();ver("visualizarOficina")}}><b>ACEPTAR</b></button>
                </div>
            </div>
          </div>
      )
  }

  export default Calendario