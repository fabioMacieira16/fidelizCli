import './Main.css';
import Header from './Header';
import Avata from './Avata';
import Nav from './Nav';
import Footer from './Footer';

export default function Main(props) {
    return (
        <div className='app'>
            <Header {...props} />
            <Nav />
            <Avata />
            <Footer />
            <main className="content container-fluid">
                <div className="p-3 mt-3">
                    {props.children}
                </div>
            </main>
        </div>
    )
}