//import react
import React, {useEffect, useState} from 'react'
import { BrowserRouter } from 'react-router-dom'

//import components
import SplashScreen from "./pages/Splash Page/Splash";
import AllRoute from './routes/AllRoutes';
import MainMessage from './components/mainMassage/MainMessage';

// import check token request
import { checkToken } from './authorization';

function App() {
	const [splash , setSplash] = useState(true);
	const [message , setMessage] = useState({open: false , type: '' , content: ''});

	useEffect(() => {
		checkToken().then(res => {
			setSplash(false);
		});
	} , [])

	const showMessage = (open , type , content) => {
		setMessage({open , type, content});
		setTimeout(() => {setMessage({...message , open : false})} , 5000);
	}
	
	return (
		<div className="App">
			<BrowserRouter>
				{splash && <SplashScreen />}
				{
					!splash && 
					<AllRoute showMessage={showMessage}/>
				}
				{message.open && <MainMessage open={message.open}  type ={message.type} content = {message.content} />}
			</BrowserRouter>
		</div>
	);
}

export default App;