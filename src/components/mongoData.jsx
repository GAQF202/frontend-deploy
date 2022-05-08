import React, { useEffect, useState,/* setState */} from "react";
import 'c3/c3.css';
import c3 from "c3";  

import '../App.css';

function MongoData() {

  const [logs,setLogs] = useState([]);
  const [top3,setTop3] = useState([]);
  // CONSTANTES PARA GUARDAR A LOS SUSCRIBERS DE GO 
  const [sus1,setSus1] = useState(["Kafka"]);
  const [sus2,setSus2] = useState(["RabbitMQ"]);
  var env = process.env.REACT_APP_RUST_HOST || 'localhost'
  useEffect(()=>{
    setInterval(()=>{
      //fetch("http://localhost:8000/hello",{method:"GET"})
      //fetch("http:"+env+":8000/",{method:"GET"})
      fetch("http://34.123.117.181:8000/hello")
      .then((data)=>data.json())
      .then((json)=>{
        setLogs(json);
        console.log(logs)
      })
    },3000);
  },[])

  useEffect(()=>{
    //setInterval(()=>{
      let gamenames = {}
      logs.forEach(game => gamenames[game.gamename] = (gamenames[game.gamename] ?? 0) +1)
      let topNames = Object.entries(gamenames).sort((gA, gB) => gA[1] - gB[1])//.map(game => ({[game[0]]: game[1]}))
      let [t1, t2, t3] = topNames
      setTop3([t1==undefined?"":t1[0], t2==undefined?"":t2[0], t3==undefined?"":t3[0]])
      //console.log(top3)
      //console.log(t1, t2, t3)

    //},100);
  },[logs,top3])

  useEffect(()=>{
    console.log(logs)
    let kafkaCount = 0
    let rabbitCount = 0
    logs?.map(ver=>{
        if(ver.queue=="KAFKA"){
          kafkaCount++
        }
        if(ver.queue=="RabbitMQ"){
          rabbitCount++
        }
      }
    )
    // GUARDO LOS SUSCRIBERS 
    setSus1(sus1=>[...sus1,kafkaCount])
    setSus2(sus2=>[...sus2,rabbitCount])
    //console.log(kafkaCount,rabbitCount)
  },[logs])

  //console.log(top3)

  useEffect(() => {
    c3.generate({
      bindto: "#chart",
      data: {
        columns: [
          sus1,
          sus2
        ],
        type: "line",
      },
    });
  }, [sus1,sus2]);

  return (
    <div> 
        <div id="chart" />
        <div className="div-bestplayers-mongo"> 
        <table>
        <th className="th-titles">
          <td>Game ID</td>
          <td>Players</td>
          <td>Winner</td>
          <td>Game name</td>
          <td>Suscriber</td>
          <td>Date</td>
        </th>
        <tr>
          {logs?.map(ver=>
            <tr>
              <td>{ver.gameid}</td>
              <td>{ver.players}</td>
              <td>{ver.winner}</td>
              <td>{ver.gamename}</td>
              <td>{ver.queue}</td>
              <td>{ver.fecha}</td>
            </tr>
          )
          }
        </tr>
        </table>
      </div>

      <div className="div-last-games-mongo">
        <table>
          <th>
            <td>3 Más jugados</td>
          </th>
          <tr>
            {
              <tr>
                <tr><td>{top3[0]}</td></tr>
                <tr><td>{top3[1]}</td></tr>
                <tr><td>{top3[2]}</td></tr>
              </tr>
              /*top3?.map(game=>{
                <td>sfdsdfs{game}</td>
              })*/
            }
          </tr>
        </table>
      </div>

    </div>
  );
}

export default MongoData;
