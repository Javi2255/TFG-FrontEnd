import React, { FC, useEffect, useState } from "react"
import { gql, useQuery, useMutation } from "@apollo/client"
import '../estilos/Verificacion.css'

const comprobarCodigo = gql`
      mutation comprobarCodigo($CIF:String,$codigo:Int){
        comprobarCodigo(CIF:$CIF,codigo:$codigo)
}
`

interface Ipaso {
    ver: Function
}


const Verificacion: FC<Ipaso> = ({ver}) => {

 

    const [numero1,setCodigo1]=useState<number>(0)
    const [numero2,setCodigo2]=useState<number>(0)
    const [numero3,setCodigo3]=useState<number>(0)
    const [numero4,setCodigo4]=useState<number>(0)
    const [numero,setNumero]=useState<number>()
    const [err,setErr]=useState<number>(1)
    const [estado3,setEstado]=useState<number>(1)

    async function obtenerCodigo(){
        let numeros=numero1.toString()+numero2.toString()+numero3.toString()+numero4.toString()
        console.log(parseInt(numeros))
        await setNumero(parseInt(numeros))
        console.log(numero)
        ejecutarMutation()
      }

      async function ejecutarMutation() {
        const d = await createLink()
        console.log(d.data)
        if (d.data.comprobarCodigo === true) {
            setEstado(2)
            setTimeout(()=>{
                ver("MenuPrincipal")
            },3000)  
            
        }else{
            setErr(2)
        }
    }


    
    

    const [createLink] = useMutation(comprobarCodigo, { variables: { CIF: localStorage.getItem('CIF')?.toString(), codigo: numero } })

    return(
        <div id="General">
            {estado3===1 &&<div id="verificacion">
                <div id="texto"><h1><b>CODIGO VERIFICACION</b></h1></div>
                <div id="numeros">
                    <input type="text" maxLength="1" onChange={(e)=>{setCodigo1(parseInt(e.target.value))}}/>
                    <input type="text" maxLength="1" onChange={(e)=>{setCodigo2(parseInt(e.target.value))}}/>
                    <input type="text" maxLength="1" onChange={(e)=>{setCodigo3(parseInt(e.target.value))}}/>
                    <input type="text" maxLength="1" onChange={(e)=>{setCodigo4(parseInt(e.target.value))}}/>
                </div>
                {err==2 && <div>
                    <div id="errorCodigo">Codigo incorrecto</div>
                </div> }
                <div id="subtexto">Introduce el código de 4 digitos recibido en el email de registro: {localStorage.getItem("Correo")}</div>
                <div id="botonValidar" >
                    
                    <button onClick={()=>{obtenerCodigo()}}><b>VALIDAR</b></button>
                </div>
            </div>}
            {estado3===2 && <div id="Redirigir"> 
                <div id="LogoRedirigir">
                    <img src="https://previews.123rf.com/images/outchill/outchill1801/outchill180105606/94414876-hot-desking-text-written-on-cyan-lacey-border-round-vintage-textured-badge-stamp-.jpg" alt="" />
                </div>
                <div>
                    <h1 id="">Tu cuenta esta siendo validada...</h1>
                </div>
            </div>}
        </div>
    )
}


export default Verificacion