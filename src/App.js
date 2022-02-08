import './App.css'
import Rskyy from "./Rskyy/Rskyy";
import 'bootstrap/dist/css/bootstrap.css'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import utama from '../src/pages/Home/utama';
import dashboard from '../src/pages/Home/dashboard';
import sidebarDua from '../src/pages/Home/sidebarDua';
import sidebarTiga from '../src/pages/Home/sidebarTiga';
import sidebarUtama from '../src/pages/Home/dasboardUtama';
import contohSatu from '../src/pages/Home/contohSatu';
import biodata from '../src/pages/Home/biodata';
import selectFormik from '../src/pages/Home/selectFormik';
import perpustakaan from '../src/pages/Home/perpustakaan';
import SidebarDua from '../src/pages/sidebar/sidebar_2';

//membuat fungsi
function App (){
  return (
    <div className="box">
      <div className="App">
        {/* <Sidebar_dua/> */}
        {/* <Router>
          <Rskyy />
          <Switch>
            <Route path='/' exact component={sidebarUtama} />
            <Route path='/reports' component={utama} />
            <Route path='/product' component={dashboard} />
            <Route path='/team' component={sidebarDua} />
            <Route path='/messages' component={sidebarTiga} />
            <Route path='/support' component={selectFormik} />
            <Route path='/contoh' component={contohSatu} />
            <Route path='/biodata' component={biodata}/>
            <Route path='/perpus' component={perpustakaan}/>
          </Switch>
        </Router>  */}

        <Router>
          <SidebarDua />
          <Switch>
            <Route path='/' exact component={sidebarUtama} />
            <Route path='/reports' component={utama} />
            <Route path='/product' component={dashboard} />
            <Route path='/team' component={sidebarTiga} />
            <Route path='/messages' component={biodata} />
            <Route path='/support' component={selectFormik} />
          </Switch>
        </Router> 
      </div>
    </div>
  )
}

//mengeksport fungsi diatas
export default App
