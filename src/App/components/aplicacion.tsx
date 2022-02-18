import React, { FC, useEffect, useState } from "react"
import { gql, useQuery, useMutation } from "@apollo/client"
import Draggable from 'react-draggable';
import '../estilos/aplicacion.css'
import AgregarGente from "../../AgregarGente/components/AgregarGente";
import { loadavg } from "os";
import CrearTicket from "../../CrearTicket/components/CrearTicket";



const actPos = gql`
      mutation actPos($CIF:String,$input:[IPosicion]){
        actPos(CIF:$CIF,input:$input)
}
`
const getPos = gql`
      query getPos($CIF:String, $diaMes:Int){
        getPos(CIF:$CIF,diaMes:$diaMes){
          id
          x
          y
          src
        }
}
`
const deleteAll = gql`
      mutation deleteAll($CIF:String){
        deleteAll(CIF:$CIF)
}
`




interface Ipaso {
    ver: Function
}

interface IPosicion {
    id: string,
    x: number,
    y: number,
    movido: string
    habilitado: boolean
    src: string
}

const Aplicacion: FC<Ipaso> = ({ ver }) => {
    
    let screenX = window.innerWidth
    let screenY = window.innerHeight

    const [array, setArray] = useState<IPosicion[]>([{ id: "1", x: Math.trunc(0.38 * screenX), y: Math.trunc(0.60 * screenY), movido: "0", habilitado: true, src: "https://img2.freepng.es/20180329/uew/kisspng-mesa-table-drawing-clip-art-flames-5abd96305949c6.9087588915223741923657.jpg" }])
    const [mostrar2, setMostrar2] = useState<String>("")

    const handleStop = (event: any, dragElement: any) => {

        let objeto: IPosicion = {
            id: (parseInt(dragElement.node.id) + 1).toString(),
            x: Math.trunc(0.40 * screenX),
            y: Math.trunc(0.72 * screenY),
            movido: "0",
            habilitado: true,
            src:"https://img2.freepng.es/20180329/uew/kisspng-mesa-table-drawing-clip-art-flames-5abd96305949c6.9087588915223741923657.jpg"
        }

        let objeto2: IPosicion;
        array.forEach((elem: any) => {
            if (dragElement.node.id === elem.id) {
                objeto2 = elem;
            }
        })

        if (objeto2!.movido === "0") {

            const miArray = array.map((value) => {
                if (value.id === objeto2.id) {

                    let objeto3: IPosicion = {
                        id: value.id,
                        x: Math.trunc(Math.round(dragElement.x / 10) * 10),
                        y: Math.trunc(Math.round(dragElement.y / 10) * 10),
                        movido: "1",
                        habilitado: true,
                        src:"https://img2.freepng.es/20180329/uew/kisspng-mesa-table-drawing-clip-art-flames-5abd96305949c6.9087588915223741923657.jpg"
                    }
                    return objeto3;
                }

                return value;
            });
            miArray.push(objeto)
            setArray(miArray)

        } else {
            const miArray = array.map((value) => {
                if (value.id === objeto2.id) {
                    let objeto3: IPosicion = {
                        id: value.id,
                        x: Math.trunc(Math.round(dragElement.x / 10) * 10),
                        y: Math.trunc(Math.round(dragElement.y / 10) * 10),
                        movido: "1",
                        habilitado: true,
                        src:"https://img2.freepng.es/20180329/uew/kisspng-mesa-table-drawing-clip-art-flames-5abd96305949c6.9087588915223741923657.jpg"
                    }
                    return objeto3;
                }

                return value;
            });
            setArray(miArray)
        }
        console.log(array)

    };

 



    async function ejecutarMutation() {
        
        const d = await createLink()
        console.log(d.data)
        if (d.data.actPos === true) {
            setMostrar2("agregar")
            refetch()
    
        }
        
        
    }

    async function ejecutarMutation2() {
        
        const d = await createLink2()
        console.log(d)
        if (d.data.deleteAll === true) {

            refetch()

        }
    
    
}



function ver2(ver:String){
    setMostrar2(ver)
}

    const [createLink] = useMutation(actPos, { variables: { CIF: localStorage.getItem('CIF')?.toString(), input: array } })
    const [createLink2] = useMutation(deleteAll, { variables: { CIF: localStorage.getItem('CIF')?.toString()} })
    
    const { loading, error:error2, data, refetch } = useQuery(getPos, { variables: { CIF: localStorage.getItem("CIF"), diaMes:5 } })
    
    if(loading) return <div>Cargando...</div>
    

    return (
        <div id="appPantalla">
            <div id="componentes">
            <img src="https://previews.123rf.com/images/outchill/outchill1801/outchill180105606/94414876-hot-desking-text-written-on-cyan-lacey-border-round-vintage-textured-badge-stamp-.jpg" alt="" />
                <button onClick={() => { ver("LoginEmpresa") }}>Desconectarte</button>
            </div>
            {mostrar2==="" && <div id="pantalla2">
            
            {mostrar2==="" && data.getPos?.length===0 && <div id="marcoMover">
            
                {array?.map((elem: IPosicion) => (
                    <Draggable defaultClassName="objetos" onStop={handleStop} position={{ x: elem.x, y: elem.y }}>
                        <img draggable="false" src={elem.src} width="25px" height="25px" id={elem.id}/>
                    </Draggable>
                ))}
            </div> }

            {mostrar2 === "" && data.getPos?.length!==0 &&  <div id="marcoMover"> {data.getPos?.map((elem:any)=>(
              <Draggable defaultClassName="objetos" position={{x:elem.x,y:elem.y}}>
                 
                  <img draggable="false" src="https://img2.freepng.es/20180329/uew/kisspng-mesa-table-drawing-clip-art-flames-5abd96305949c6.9087588915223741923657.jpg" id={elem.id}/>
              </Draggable>
          ))
          }</div>}
          <div id="misDatos">

          {mostrar2==="" && <div id="datos">
                <h5>1. ARRASTRA LA MESA HASTA LA POSICION EN LA QUE DESEES COLOCARLA</h5>
                <h5>2. HAZ CLICK EN ENVIAR PARA COMPARTIR ESTA ORGANIZACIÓN</h5>
                <h5>3. PUEDES COLOCAR HASTA 100 MESAS Y ORGANIZARLAS COMO MAS TE GUSTE</h5>
                <h5>4. PUEDES BORRAR LA DISTRIBUCION DE LAS MESAS Y VOLVER A CREARLA</h5>
                
          </div>}

            <div id="botonesApp">
                <button onClick={() => { ejecutarMutation(); }}><b>ENVIAR</b></button>
                <button onClick={() => { refetch();ejecutarMutation2(); }}><b>ELIMINAR</b></button>
                <button onClick={() => { setMostrar2("ticket");}}><b>CREAR TICKET</b></button>
            </div> 

            </div>  

            </div>} 
            
         
            {mostrar2==="agregar" && <AgregarGente ver2={ver2}/>}
            {mostrar2==="ticket" && <CrearTicket ver2={ver2}/>}
            
        </div>
    )
}


export default Aplicacion