import React, { useEffect, useState,/* setState */} from "react";
import io from 'socket.io-client';
import '../App.css';

  //const socket = io("http://localhost:8080")

  //var node_env =  process.env.REACT_APP_NODEJS_HOST || 'localhost'
  //const socket = io("http://"+node_env+":8080")
  const socket = io("http://34.136.221.182:8080/")

function TidbData() {

  // VARIABLES PARA GUARDAR LOS MEJORES 10 Y ULTIMOS 10
  const [topTen,setTopTen] = useState([]);
  const [lastTen,setLastTen] = useState([]);
  const [allPlayers,setAllPlayers] = useState([]);
  //var node_env =  process.env.REACT_APP_NODEJS_HOST || 'localhost'
  //const socket = io("https://sopes1-342703.uc.r.appspot.com/")

  //const socket = io("http//"+node_env+":8080")
  const [mensajes,setMensajes] = useState([]);

  console.log(topTen, lastTen, allPlayers, mensajes)

  /*// DATOS EN TIEMPO REAL
  useEffect(()=>{
    setInterval(() => {
      
    socket.on('message1',mensaje => {
      if (JSON.parse(mensaje).length !== mensajes.length)
        setMensajes(JSON.parse(mensaje))
      console.log(mensaje)
    })
    //return () => {socket.off()}
    }, 3000);
  }, [mensajes.length])*/


  // MEJORES JUGADORES
  useEffect(()=>{
    socket.on('playersTidis',mensaje => {
    if(mensaje.length !== topTen.length)
      console.log(mensaje)
      setTopTen(mensaje)
    })
    /*socket.on('lastTidis',mensaje => {
    if(mensaje.length !== lastTen.length)
      setLastTen(mensaje)
    })
    socket.on('allPlayersT',mensaje => {
      if (mensaje.length !== allPlayers.length)
      setAllPlayers(mensaje)
    })*/
    return () => {socket.off()}
  }, [/*topTen.length, lastTen.length, allPlayers.length,mensajes.length*/])


  useEffect(()=>{
    socket.on('lastTidis',mensaje => {
    if(mensaje.length !== lastTen.length)
      setLastTen(mensaje)
    })
    return () => {socket.off()}
  },[])

  /*useEffect(()=>{
    socket.on('allPlayersT',mensaje => {
      if (mensaje.length !== allPlayers.length)
      setAllPlayers(mensaje)
    })
  },[])*/

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
  