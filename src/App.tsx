import {Route, Routes} from 'react-router-dom'
import {Page404} from './01_Components/Pages/PageNotFound404/Page404'
import {MainPage} from './01_Components/Pages/Main/MainPage'
import { Header } from './01_Components/Chunks/Header/Header'

const App = () => {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />}/>
                <Route path="/*" element={<Page404 />}/>
            </Routes>
        </div>
    )
}

export default App
