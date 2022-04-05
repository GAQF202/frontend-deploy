import { Link } from "react-router-dom";
import '../App.css';

function Navigate() {
    return (
      <div>
          <nav>
            <ul>
              <li>
                <Link className="button-nav" to="/mongo">
                  Reportes de Mongo
                </Link>
              </li>
              <li>
                <Link className="button-nav" to="/tidb">
                  Reportes de TIDB
                </Link>
              </li>
              <li>
                <Link className="button-nav" to="/redis">
                  Reportes de Redis
                </Link>
              </li>
            </ul>
          </nav>
      </div>
    );
  }
  
  export default Navigate;
  