import React, { useEffect, useState,/* setState */} from "react";
import io from 'socket.io-client';

//var node_env =  process.env.REACT_APP_NODEJS_HOST || 'localhost'
//const socket = io("http://"+node_env+":8080")
const socket = io("http://34.136.221.182:8080/")

function RedisData() {

  // VARIABLES PARA GUARDAR LOS MEJORES 10 Y ULTIMOS 10
  const [topTen,setTopTen] = useState([]);
  const [lastTen,setLastTen] = useState([]);
  const [allPlayers,setAllPlayers] = useState([]);
  //var node_env =  process.env.REACT_APP_NODEJS_HOST || 'localhost'
  //const socket = io("https://sopes1-342703.uc.r.appspot.com/")
  //const socket = io("http://localhost:8080")
  //const socket = io("http//"+node_env+":8080")
  const [mensajes,setMensajes] = useState([]);

  // DATOS EN TIEMPO REAL
  useEffect(()=>{
    socket.on('message',mensaje => {
      setMensajes(JSON.parse(mensaje))
      console.log(mensaje)
    })
    return () => {socket.off()}
  },[/*mensajes*/])

  // MEJORES JUGADORES
  useEffect(()=>{
    socket.on('playersRedis',mensaje => {
      setTopTen(mensaje)
    })
    /*socket.on('lastRedis',mensaje => {
      setLastTen(mensaje)
    })
    socket.on('allPlayersR',mensaje => {
      setAllPlayers(mensaje)
    })*/
    return () => {socket.off()}
  },[/*topTen,lastTen*/])

  useEffect(()=>{
    socket.on('lastRedis',mensaje => {
      setLastTen(mensaje)
    })
    return () => {socket.off()}
  },[])

  //console.log(topTen)
  //console.log("estooo",lastTen)
  //console.log(allPlayers)

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
  
  export default RedisData;
  