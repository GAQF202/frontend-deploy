import React, { useEffect, useState,/* setState */} from "react";
import io from 'socket.io-client';
import '../App.css';

function TidbData() {

  // VARIABLES PARA GUARDAR LOS MEJORES 10 Y ULTIMOS 10
  const [topTen,setTopTen] = useState([]);
  const [lastTen,setLastTen] = useState([]);
  const [allPlayers,setAllPlayers] = useState([]);

  //const socket = io("https://sopes1-342703.uc.r.appspot.com/")
  //const socket = io("http://localhost:8080")
  const socket = io("https://avian-safeguard-342704.uc.r.appspot.com")
  const [mensajes,setMensajes] = useState([]);

  // DATOS EN TIEMPO REAL
  useEffect(()=>{
    socket.on('message1',mensaje => {
      //setMensajes([...mensajes,mensaje])
      setMensajes(JSON.parse(mensaje))
      /*let myJson = JSON.parse(mensaje)

      for(let i=1; i<myJson.players+1; i++){
        setAllPlayers(allPlayers=>[...allPlayers,{"name":"Jugador"+i,"state":"Jugador"+i==myJson.winner?"Ganador":"Perdedor","game":myJson.game_n}])
      }*/
    })
    return () => {socket.off()}
  },[/*mensajes*/])
  //console.log("Estooooo",mensajes)

  // MEJORES JUGADORES
  useEffect(()=>{
    socket.on('playersTidis',mensaje => {
      //setMensajes([...mensajes,mensaje])
      setTopTen(mensaje)
    })
    socket.on('lastTidis',mensaje => {
      setLastTen(mensaje)
    })
    socket.on('allPlayersT',mensaje => {
      setAllPlayers(mensaje)
    })
    return () => {socket.off()}
  },[/*topTen,lastTen*/])

  //console.log("yeaa",topTen)
  //console.log("mimiiir",lastTen)
  //console.log(allPlayers)

  /*// ULTIMOS 10 JUEGOS
  useEffect(()=>{
    socket.on('lastTidis',mensaje => {
      //setMensajes([...mensajes,mensaje])
      setLastTen(mensaje)
    })
    return () => {socket.off()}
  },[lastTen])
  console.log("mimiiir",lastTen)*/

    return (
      <div>  
        <h1 className="h1-top">Top 10 <br/> Jugadores</h1>
        <div className="div-bestplayers">
          <table>
            <thead>
              <th>Jugador</th>
              <th>Ganados</th>
            </thead>
            {
              topTen?.map(gamer=>(
                <tr>
                  <td>{gamer.name}</td>
                  <td>{gamer.amount}</td>
                </tr>
              ))
            }
          </table>
        </div>

        <h1 className="h1-last-title">Ultimos 10 <br/> Juegos</h1>
        <div className="div-last-games">
          <table>
            <thead>
              <th>Id</th>
              <th>Jugadores#</th>
              <th>Ganador</th>
              <th>Nombre</th>
            </thead>
            {
              lastTen?.map(gamer=>(
                <tr>
                  <td>{gamer.game_id}</td>
                  <td>{gamer.players}</td>
                  <td>{gamer.winner}</td>
                  <td>{gamer.game_n}</td>
                </tr>
              ))
            }
          </table>
        </div>


        <h1 className="h1-all-title">Jugadores</h1>
        <div className="div-all-players">
          <table>
            <thead>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Juego</th>
            </thead>
            {
              allPlayers?.map(gamer=>(
                <tr>
                  <td>{gamer.name}</td>
                  <td>{gamer.state}</td>
                  <td>{gamer.game}</td>
                </tr>
              ))
            }
          </table>
          </div>
      </div>
    );
  }
  
  export default TidbData;
  