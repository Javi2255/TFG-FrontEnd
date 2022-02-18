import React, { FC, useEffect, useState } from "react"
import '../estilos/MenuRegistro.css'
import { gql, useQuery, useMutation } from "@apollo/client"

interface IActualizar {
    ver: Function
}

const registro = gql`
    mutation registro($Nombre:String,$CIF:String,$Correo:String,$Password:String,$Pais:String,$Sector:String){
        registro(Nombre:$Nombre,CIF:$CIF,Correo:$Correo,Password:$Password,Pais:$Pais,Sector:$Sector)
    }
`


const RegistroEmpresa: FC<IActualizar> = ({ ver }) => {

    const [error, setError] = useState<boolean>(false)
    const [datos, setDatos] = useState({
        Nombre: '',
        CIF: '',
        Correo: '',
        Password: '',
        Pais: 'España',
        Sector: 'IT'


    })

    const handleInputChange = (event: any) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })

    }

    const enviarDatos = (event: any) => {
        event.preventDefault()
        ejecucionMutation()
    }

    const [createLink] = useMutation(registro, {
        variables: {
            Nombre: datos.Nombre,
            CIF: datos.CIF,
            Correo: datos.Correo,
            Password: datos.Password,
            Pais: datos.Pais,
            Sector: datos.Sector

        }
    })

    async function ejecucionMutation() {
        const d = await createLink()
        if (d.data.registro === true) {
            localStorage.setItem('Correo',datos.Correo)
            localStorage.setItem('CIF',datos.CIF)
            ver("Verificacion")
        } else {
            setError(true)

        }
    }

    return (
        <div id="PantallaRegistro">
            <div id="MarcoRegistro">
                <div id="TituloRegistro">
                    <h1><b>DATOS DE REGISTRO</b></h1>
                </div>
                <div id="CamposRegistro">
                    <form id="Form" name="registro" onSubmit={enviarDatos}>
                        <div className="Campos">
                            <div className="SubCampos">
                                <input type="text" placeholder="Nombre Empresa" name="Nombre" onChange={handleInputChange} required pattern="[A-Za-z]{1,100}"/>
                                <h6>El nombre no debe contener numeros</h6>
                            </div>
                            <div className="SubCampos">
                                <input type="text" id="CIF" placeholder="CIF" name="CIF" onChange={handleInputChange} required minLength="10" maxLength="10" pattern="A-[0-9]{8,8}"/>
                                <h6>El CIF debe ser A- seguido de 8 digitos</h6>
                            </div>
                        </div>

                        <div className="Campos">
                            <div className="SubCampos">
                                <input type="email" placeholder="Correo" name="Correo" onChange={handleInputChange} required />
                                <h6>[nombre]@[dominio]</h6>
                            </div>
                            <div className="SubCampos">
                                <input type="password" placeholder="Password" name="Password" onChange={handleInputChange} required minLength="6"/>
                                <h6>La contraseña debe tener mas de 6 caracteres</h6>
                            </div>

                        </div>
                        <div className="Campos">
                            <div className="SubCampos">
                                <select name="Pais"  className="Selects" onChange={handleInputChange} id="" placeholder="Pais">
                                    <option value="España" >España</option>
                                    <option value="Afganistan">Afganistan</option>
                                    <option value="Albania">Albania</option>
                                    <option value="Alemania">Alemania</option>
                                    <option value="Andorra">Andorra</option>
                                    <option value="Angola">Angola</option>
                                    <option value="Antigua y Barbuda">Antigua y Barbuda</option>

                                    <option value="Arabia Saudita" >Arabia Saudita</option>
                                    <option value="Argelia">Argelia</option>
                                    <option value="Argentina">Argentina</option>
                                    <option value="Armenia">Armenia</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Austria">Austria</option>
                                    <option value="Azerbaiyán">Azerbaiyán</option>

                                    <option value="Bahamas" >Bahamas</option>
                                    <option value="Bangladés">Bangladés</option>
                                    <option value="Barbados">Barbados</option>
                                    <option value="Baréin">Baréin</option>
                                    <option value="Bélgica">Bélgica</option>
                                    <option value="Belice">Belice</option>
                                    <option value="Benín">Benín</option>

                                    <option value="Bielorrusia" >Bielorrusia</option>
                                    <option value="Birmania">Birmania</option>
                                    <option value="Bolivia">Bolivia</option>
                                    <option value="Bosnia">Bosnia</option>
                                    <option value="Botsuana">Botsuana</option>
                                    <option value="Brasil">Brasil</option>
                                    <option value="Brunéi">Brunéi</option>

                                    <option value="Bulgaria" >Bulgaria</option>
                                    <option value="Burkina Faso">Burkina Faso</option>
                                    <option value="Burkina Faso">Burkina Faso</option>
                                    <option value="Bután">Bután</option>
                                    <option value="Cabo Verde">Cabo Verde</option>
                                    <option value="Camboya">Camboya</option>
                                    <option value="Camerún">Camerún</option>

                                    <option value="Canadá" >Canadá</option>
                                    <option value="Catar">Catar</option>
                                    <option value="Chad">Chad</option>
                                    <option value="Chile">Chile</option>
                                    <option value="China">China</option>
                                    <option value="Chipre">Chipre</option>
                                    <option value="Colombia">Colombia</option>

                                    <option value="Comoras" >Comoras</option>
                                    <option value="Congo">Congo</option>
                                    <option value="Corea del Norte">Corea del Norte</option>
                                    <option value="Corea del Sur">Corea del Sur</option>
                                    <option value="Costa de Marfil">Costa de Marfil</option>
                                    <option value="Costa Rica">Costa Rica</option>
                                    <option value="Croacia">Croacia</option>

                                    <option value="Cuba" >Cuba</option>
                                    <option value="Dinamarca">Dinamarca</option>
                                    <option value="Dominica">Dominica</option>
                                    <option value="Ecuador">Ecuador</option>
                                    <option value="Egipto">Egipto</option>
                                    <option value="El Salvador">El Salvador</option>
                                    <option value="Emiratos Árabes Unidos">Emiratos Árabes Unidos</option>

                                    <option value="Eritrea" >Eritrea</option>
                                    <option value="Eslovaquia">Eslovaquia</option>
                                    <option value="Eslovenia">Eslovenia</option>
                                    <option value="Estados Unidos">Estados Unidos</option>
                                    <option value="Estonia">Estonia</option>
                                    <option value="Etiopía">Etiopía</option>
                                    <option value="Filipinas">Filipinas</option>

                                    <option value="Finlandia" >Finlandia</option>
                                    <option value="Fiyi">Fiyi</option>
                                    <option value="Francia">Francia</option>
                                    <option value="Gabón">Gabón</option>
                                    <option value="Gambia">Gambia</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Ghana">Ghana</option>

                                    <option value="Granada" >Granada</option>
                                    <option value="Grecia">Grecia</option>
                                    <option value="Guatemala">Guatemala</option>
                                    <option value="Guinea">Guinea</option>
                                    <option value="Costa de Marfil">Costa de Marfil</option>
                                    <option value="Guinea Ecuatorial">Guinea Ecuatorial</option>
                                    <option value="Guyana">Guyana</option>

                                    <option value="Haití" >Haití</option>
                                    <option value="Honduras">Honduras</option>
                                    <option value="Hungría">Hungría</option>
                                    <option value="India">India</option>
                                    <option value="Indonesia">Indonesia</option>
                                    <option value="Irak">Irak</option>
                                    <option value="Irán">Irán</option>

                                    <option value="Irlanda" >Irlanda</option>
                                    <option value="Islandia">Islandia</option>
                                    <option value="Israel">Israel</option>
                                    <option value="Italia">Italia</option>
                                    <option value="Jamaica">Jamaica</option>
                                    <option value="Japón">Japón</option>
                                    <option value="Jordania">Jordania</option>

                                    <option value="Kazajistán" >Kazajistán</option>
                                    <option value="Kenia">Kenia</option>
                                    <option value="Kirguistán">Kirguistán</option>
                                    <option value="Kiribati">Kiribati</option>
                                    <option value="Kuwait">Kuwait</option>
                                    <option value="Laos">Laos</option>
                                    <option value="Lesoto">Lesoto</option>

                                    <option value="Letonia" >Letonia</option>
                                    <option value="Líbano">Líbano</option>
                                    <option value="Libia">Libia</option>
                                    <option value="Liechtenstein">Liechtenstein</option>
                                    <option value="Lituania">Lituania</option>
                                    <option value="Luxemburgo">Luxemburgo</option>
                                    <option value="Madagascar">Madagascar</option>

                                    <option value="Malasia" >Malasia</option>
                                    <option value="Malaui">Malaui</option>
                                    <option value="Maldivas">Maldivas</option>
                                    <option value="Malta">Malta</option>
                                    <option value="Marruecos">Marruecos</option>
                                    <option value="Mauricio">Mauricio</option>
                                    <option value="Mauritania">Mauritania</option>

                                    <option value="México" >México</option>
                                    <option value="Moldavia">Moldavia</option>
                                    <option value="Mónaco">Mónaco</option>
                                    <option value="Mongolia">Mongolia</option>
                                    <option value="Montenegro">Montenegro</option>
                                    <option value="Mozambique">Mozambique</option>
                                    <option value="Namibia">Namibia</option>

                                    <option value="Nauru" >Nauru</option>
                                    <option value="Nepal">Nepal</option>
                                    <option value="Nicaragua">Nicaragua</option>
                                    <option value="Níger">Níger</option>
                                    <option value="Nigeria">Nigeria</option>
                                    <option value="Noruega">Noruega</option>
                                    <option value="Omán">Omán</option>

                                    <option value="Países Bajos" >Países Bajos</option>
                                    <option value="Pakistán">Pakistán</option>
                                    <option value="Pakistán">Pakistán</option>
                                    <option value="Palaos">Palaos</option>
                                    <option value="Palestina">Palestina</option>
                                    <option value="Panamá">Panamá</option>
                                    <option value="Paraguay">Paraguay</option>

                                    {/*A PARTIR DE AQUI */}

                                    <option value="Perú" >Perú</option>
                                    <option value="Polonia">Polonia</option>
                                    <option value="Portugal">Portugal</option>
                                    <option value="Reino Unido">Reino Unido</option>
                                    <option value="Ruanda">Ruanda</option>
                                    <option value="Rumania ">Rumania </option>
                                    <option value="Rusia">Rusia</option>

                                    <option value="Islas Salomón" >Islas Salomón</option>
                                    <option value="Samoa">Samoa</option>
                                    <option value="San Marino">San Marino</option>
                                    <option value="Senegal">Senegal</option>
                                    <option value="Serbia">Serbia</option>
                                    <option value="Seychelles">Seychelles</option>
                                    <option value="Singapur">Singapur</option>

                                    <option value="Siria" >Siria</option>
                                    <option value="Somalia">Somalia</option>
                                    <option value="Sudáfrica">Sudáfrica</option>
                                    <option value="Sudán">Sudán</option>
                                    <option value="Suecia">Suecia</option>
                                    <option value="Suiza">Suiza</option>
                                    <option value="Surinam">Surinam</option>

                                    <option value="Tailandia" >Tailandia</option>
                                    <option value="Tanzania">Tanzania</option>
                                    <option value="Tayikistán">Tayikistán</option>
                                    <option value="Togo">Togo</option>
                                    <option value="Tonga">Tonga</option>
                                    <option value="Túnez">Túnez</option>
                                    <option value="Turquía">Turquía</option>

                                    <option value="Ucrania" >Ucrania</option>
                                    <option value="Uganda">Uganda</option>
                                    <option value="Uruguay">Uruguay</option>
                                    <option value="Uzbekistán">Uzbekistán</option>
                                    <option value="Venezuela">Venezuela</option>
                                    <option value="Vietnam">Vietnam</option>
                                    <option value="Yemen">Yemen</option>


                                </select>
                                <h6>Selecciona Pais</h6>

                            </div>
                            <div className="SubCampos">
                                <select name="Sector" className="Selects" onChange={handleInputChange} placeholder="Sector">
                                    <option value="IT">IT</option>
                                    <option value="Agricultura">Agricultura</option>
                                    <option value="Comercio">Comercio</option>
                                    <option value="Ganaderia">Ganaderia</option>
                                    <option value="Juridico">Juridico</option>
                                    <option value="Textil">Textil</option>
                                    <option value="Construccion">Construccion</option>

                                </select>
                                <h6>Selecciona Sector</h6>
                            </div>
                        </div>
                        <div id="Submit">
                            <button onClick={()=>{ver("MenuPrincipal")}}><b>VOLVER</b></button>
                                       
                            <input type="submit" value="ENVIAR"/>

                            
                        </div>
                        {error && <div className="error">Esta empresa está ya registrada</div>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegistroEmpresa