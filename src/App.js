import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';

import MongoData from './components/mongoData';
import TidbData from './components/tidbData';
import RedisData from './components/redisData';
import Navigate from './components/navigate';

/*<Route path='/mongo' component={MongoData} />
<Route path='/tidb' component={MongoData} />
<Route path='/redis' component={MongoData} />*/

function App() {
  return (
    <div>
      <Router>
        <Navigate/>
        <Routes>
          <Route path='/mongo' element={<MongoData/>} />
          <Route path='/tidb' element={<TidbData/>} />
          <Route path='/redis' element={<RedisData/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
