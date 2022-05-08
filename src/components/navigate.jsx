import { Link } from "react-router-dom";
import '../App.css';

function Navigate() {
    return (
      <div>
          <nav>
            <ul>
              <li>
                <Link className="button-nav" to="/front/mongo">
                  Reportes de Mongo
                </Link>
              </li>
              <li>
                <Link className="button-nav" to="/front/tidb">
                  Reportes de TIDB
                </Link>
              </li>
              <li>
                <Link className="button-nav" to="/front/redis">
                  Reportes de Redis
                </Link>
              </li>
            </ul>
          </nav>
      </div>
    );
  }
  
  export default Navigate;
  