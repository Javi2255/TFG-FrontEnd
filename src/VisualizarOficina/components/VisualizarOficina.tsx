import React, { FC, useEffect, useState } from "react"
import { gql, useQuery, useMutation } from "@apollo/client"
import Draggable from 'react-draggable';
import '../estilo/VisualizarOficina.css'
import Reserva from "../../Reservas/components/Reservas";


const actImg = gql`
      mutation actImg($CIF:String,$id:String,$Correo:String,$diaMes:Int){
        actImg(CIF:$CIF,id:$id,Correo:$Correo,diaMes:$diaMes)
}
`

const cancelarReserva = gql`
      mutation cancelarReserva($CIF:String,$CorreoEmpleado:String,$diaMes:Int){
        cancelarReserva(CIF:$CIF,CorreoEmpleado:$CorreoEmpleado,diaMes:$diaMes)
}
`
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

const getReservas = gql`
query getReservas($CIF:String,$Correo:String){
  getReservas(CIF:$CIF,Correo:$Correo){
    mesa
    Correo
    diaMes
  }
}
`

interface Ipaso {
  ver: Function
}


const VisualizarOficina: FC<Ipaso> = ({ver}) => {

  

    const [id,setId]=useState<any>()
    const [cambios,setCambios] = useState<number>(0)
    const [pulsado, setPulsado] = useState<any>(true)
    const [error,setError]=useState<number>(0)
    const [comprobacion,setComprobacion]=useState<number>(0)
    const [visualizarPantalla,setVisualizarPantalla] = useState<any>("reservar")

    function ver2(ver:number){
      setCambios(ver)
  }

    function modificar(id:string,src:string) {
      refetch2();
      if(data2.getComprobacionReserva===true){
        
        if(src==="https://fondosmil.com/fondo/32052.jpg" || src==="https://fondosmil.com/fondo/21398.jpg"){
          setError(1)
        }else{
          if(cambios===0){
            document!.getElementById(id)!.setAttribute('src',"https://fondosmil.com/fondo/21398.jpg")
            setCambios(cambios+1)
            setId(id)
        }else{

            setError(1)
          }
          
          
        }
        
        
    }else{
      setError(1)
    }
  }


    async function ejecutarMutation2() {
      if(data2.getComprobacionReserva===true){
      const d = await createLink()
      console.log(d.data)
      if(d.data.actImg===true){
        setComprobacion(1)
        refetch()
        refetch2()
        refetch3()
      }
    }else{
      setError(1)
    }
      
  }
  async function ejecutarMutation3() {
    const d = await createLink2()
    console.log(d.data)
    if(d.data.cancelarReserva===true){
      //setComprobacion(1)
      console.log("Bien")
      refetch()
      refetch2()
      refetch3()  //getReservas
      setCambios(0)
      setComprobacion(2)
      setError(0)
    }
    
}
  const [createLink] = useMutation(actImg, { variables: { CIF: localStorage.getItem('CIF')?.toString(), id: id, Correo:localStorage.getItem('Correo'), diaMes:(parseInt(localStorage!.getItem("diaSeleccionado")!)) } })
  const [createLink2] = useMutation(cancelarReserva, { variables: { CIF: localStorage.getItem('CIF')?.toString(), CorreoEmpleado:localStorage.getItem('Correo'), diaMes:(parseInt(localStorage!.getItem("diaSeleccionado")!)) } })

  const { loading, error:error2, data, refetch } = useQuery(getPos2, { variables: { CIF: localStorage.getItem("CIF"),Correo:localStorage.getItem('Correo'),diaMes: (parseInt(localStorage!.getItem("diaSeleccionado")!)) } })
  const { loading:loading2, error:error3, data:data2, refetch:refetch2 } = useQuery(getComprobacionReserva, { variables: { CIF: localStorage.getItem("CIF"),Correo:  localStorage.getItem("Correo"), diaMes:(parseInt(localStorage!.getItem("diaSeleccionado")!))} })
  const { loading:loading3, error:error4, data:data3, refetch:refetch3 } = useQuery(getReservas, { variables: { CIF: localStorage.getItem("CIF"),Correo:  localStorage.getItem("Correo")} })
 
  if (loading) return <div>Cargando</div>
  if (loading2) return <div>Cargando</div>
  if (loading3) return <div>Cargando</div>

    return (
      <div id="appPantalla2"> 
       <div id="componentes2">
            <img src="https://previews.123rf.com/images/outchill/outchill1801/outchill180105606/94414876-hot-desking-text-written-on-cyan-lacey-border-round-vintage-textured-badge-stamp-.jpg" alt="" />
            <div id="desplegable">
              <button id="BotonPrincipal" onClick={() => {setPulsado(!pulsado);console.log(data3.getReservas) }}>☰</button>
              {pulsado===false && <div id="desplegable2">
                <button onClick={()=>{refetch3();setVisualizarPantalla("misreservas");setPulsado(!pulsado);}}>Mis Reservas</button>
                <button onClick={()=>{if(visualizarPantalla==="reservar"){ver("Calendario")}else{refetch();refetch2();refetch3();setComprobacion(0);setVisualizarPantalla("reservar");setPulsado(!pulsado)}}}>Atras</button>
                
              </div>}
            </div>
        </div> 
        {visualizarPantalla==="reservar" && <div id="pantalla3">
        <div id="marcoMover2">

          {data.getPos2?.map((elem:any)=>(
              <Draggable defaultClassName="objetos2" position={{x:elem.x,y:elem.y}}>
                 
                  <img className="objetos3" draggable="false" src={elem.src} id={elem.id} onClick={()=>{refetch2();modificar(elem.id,elem.src)}}/>
              </Draggable>
          ))}
        </div>
      
          <div id="lateralVisualizar" >
            <div id="botonesVisualizar">
              <button onClick={()=>{refetch2();ejecutarMutation2();refetch3();refetch2();refetch();}}><b>RESERVAR</b></button>
              <button onClick={()=>{ejecutarMutation3();refetch();refetch2()}}><b>CANCELAR RESERVA</b></button> 
              <button onClick={()=>{ver("MenuPrincipal")}}><b>SALIR</b></button>
              
            </div>
            
          
            
            <div id="mensajesVisualizar">
              {error===1  && <h1>ERROR</h1>}
              {comprobacion===1 && <h1>HAS RESERVADO EL DIA {(parseInt(localStorage!.getItem("diaSeleccionado")!))}/{new Date().getMonth()+1}</h1>}  
            </div>
          
          </div>
          </div>}

          {visualizarPantalla==="misreservas" && <div><Reserva ver2={ver2}/></div>}
         
      
      </div>
    )

}

export default VisualizarOficina