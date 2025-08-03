import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
// import FullPizza from './pages/FullPizza'
import MainLayouts from './layouts/MainLayouts'
import './scss/app.scss'
import { Suspense, lazy } from 'react'
import Loadable from 'react-loadable'

const FullPizza = Loadable({
  loader: () => import(/* webpackChunkName: "FullPizza" */'./pages/FullPizza'),
  loading: () => <div>Загрузка</div>,
})

const Cart = lazy(() => import(/* webpackChunkName: "cart" */'./pages/Cart'))

function App() {

  return (
    <Routes>
      <Route path='/' element={<MainLayouts />}>
        <Route path='' element={<Home />} />
        <Route path='cart' element={<Suspense fallback={<div>Загрузка...</div>}><Cart /></Suspense>} />
        <Route path='pizza/:id' element={<Suspense fallback={<div>Загрузка...</div>}><FullPizza /></Suspense>} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App

// type SearchContextType = {
//   searchValue: string
//   setSearchValue: (value: string) => void
// }

// export const SearchContext = createContext<SearchContextType>({
//   searchValue: '',
//   setSearchValue: () => { }
// })

// const [searchValue, setSearchValue] = useState<string>('')
// const params = useParams()
{/* <SearchContext.Provider value={{ searchValue, setSearchValue }}> */ }
{/* </SearchContext.Provider> */ }