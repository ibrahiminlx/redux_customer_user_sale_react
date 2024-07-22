import {createBrowserRouter,createRoutesFromElements,Route} from 'react-router-dom'
import { Login } from '../app/screens/Login.screen'
import { NotFound } from '../app/screens/NotFound.screen'
import App from '../App'
import { Landing } from '../app/screens/Landing.screen'
import { Content } from '../app/components/Content'
import { Sales } from '../app/components/Sales'
import { Customers } from '../app/components/Customers'


export const webRouter=createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App/>}>
            <Route path='/' element={<Landing/>}>
                <Route path='/' element={<Content/>} />
                <Route path='/sales' element={<Sales/>} />
                <Route path='/customers' element={<Customers/>} />
                
            </Route>
            <Route path='/login' element={<Login/>} />
            <Route path='*' element={<NotFound/>} />
        </Route>
    )
)