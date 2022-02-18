import React, { FC, useEffect, useState } from "react"
import LoginEmpresa from "../../MenuLogin/components/MenuLogin"
import RegistroEmpresa from "../../MenuRegistro/components/MenuRegistro"
import Verificacion from "../../Verificacion/components/Verificacion"
import Aplicacion from "../../App/components/aplicacion"
import VisualizarOficina from "../../VisualizarOficina/components/VisualizarOficina"
import '../estilos/Main.css'
import LoginUsuario from "../../LoginUsuario/components/LoginUsuario"
import Calendar from "react-calendar"
import Calendario from "../../Calendario/components/Calendario"

const MenuPrincipal: FC = () => {

    //Funcion que pasaremos por props
    function ver(ver:String){
        setPantalla(ver)
    }

    //Estado para que pantalla se está viendo
    const [pantalla,setPantalla]=useState<String>("MenuPrincipal")

    //Corresponden a las 3 FAQ
    const [respuesta1,setRespuesta1]=useState<boolean>(false)
    const [respuesta2,setRespuesta2]=useState<boolean>(false)
    const [respuesta3,setRespuesta3]=useState<boolean>(false)

    return (
        <div>
            {pantalla==="MenuPrincipal" && <div id="Pantalla">
                
                {/*Barra blanca donde va el logo*/}
                <div id="BarraSuperior">  
                    <div id="Logo">
                        <img src="https://previews.123rf.com/images/outchill/outchill1801/outchill180105606/94414876-hot-desking-text-written-on-cyan-lacey-border-round-vintage-textured-badge-stamp-.jpg" alt="" />
                    </div>
                </div>

                {/*Zona donde puede verse el texto y el subtexto */}
                <div id="Texto">
                    <div id="Presentacion">
                        <h1><b>ORGANIZA TU ESPACIO DE TRABAJO O RESERVA SITIO</b></h1>
                    </div>
                    <div id="Subpresentacion">
                        <h2><b>WEB PARA DESARROLLAR EL ESPACIO DE TRABAJO Y PERMITIR LA CORRECTA ORGANIZACION DE LOS EQUIPOS</b></h2>
                    </div>
                </div>

                {/*Botones de login y de register */}
                <div id="Botones">
                    <button id="BotonLogin" onClick={()=>{setPantalla("LoginEmpresa")}}><b>INICIA SESION</b></button>
                    <button id="BotonRegistro" onClick={()=>{setPantalla("RegistroEmpresa")}}><b>REGISTRATE</b></button>
                </div>

                {/*Los dos cuadros que pueden verse */}
                <div id="Fotos">     
                    <div id="Imagen1">
                        <h3><b>CREA TU MODELO DE OFICINA EN UNOS SENCILLOS PASOS</b></h3>
                    </div>    
                    <div id="Imagen2">
                        <img src="https://assets.website-files.com/615d559fac36b47d92ba8054/6176be113e2d0d3e9918c55c_[Desky]%20Mobile-poster-00001.jpg" alt="" />
                    </div>
                </div>

                {/*Zona de FAQ y sus 3 preguntas*/}
                <div id="Faq">
                    <div id="Titulo"><b>FAQ</b></div>
                    <div id="Faqs">
                        <div className="MenuPregunta">
                            <div data-testid="prueba1" onClick={()=>{setRespuesta1(!respuesta1)}} className="Preguntas"><b>¿QUIENES SOMOS?</b><button className="Faqboton">+</button></div>
                            {respuesta1===true && <div className="Respuestas"><b>APLICACION REALIZADA POR JAVIER PÉREZ, ALUMNO DE LA UNIVERSIDAD NEBRIJA PARA EL TFG</b></div>}
                        </div>
                        <div className="MenuPregunta">
                            <div className="Preguntas" onClick={()=>{setRespuesta2(!respuesta2)}}><b>¿CUANTO CUESTA?</b><button className="Faqboton">+</button></div>
                            {respuesta2===true && <div className="Respuestas"><b>LA APLICACIÓN ES COMPLETAMENTE GRATUITA</b></div>}
                        </div>
                        <div className="MenuPregunta">
                            <div className="Preguntas" onClick={()=>{setRespuesta3(!respuesta3)}}><b>¿COMO FUNCIONA?</b><button className="Faqboton">+</button></div>
                            {respuesta3===true && <div className="Respuestas" ><b>LA APP ES MUY SENCILLA DE USAR, UNICAMENTE REGISTRATE COMO UNA EMPRESA, CREA TU OFICINA Y COMPARTELO CON TU EQUIPO PARA QUE PUEDAN RESERVAR SITIO</b></div>}
                        </div>
                    </div>
                </div>
            </div>}
            {pantalla==="RegistroEmpresa" && <div><RegistroEmpresa ver={ver}/></div>}
            {pantalla==="LoginEmpresa" && <div><LoginEmpresa ver={ver}/></div>}
            {pantalla==="Verificacion" && <div><Verificacion ver={ver}/></div>}
            {pantalla==="aplicacion" && <div><Aplicacion ver={ver}/></div>}
            {pantalla==="visualizarOficina" && <div><VisualizarOficina ver={ver}/></div>}
            {pantalla==="LoginEmpleado" && <div><LoginUsuario ver={ver}/></div>}
            {pantalla==="Calendario" && <div><Calendario ver={ver}/></div>}
        </div>
    )
}

export default MenuPrincipal