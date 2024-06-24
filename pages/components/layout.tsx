import Navbar from './Header'
import Foooter from './Foooter'

export default function Layout(props: { children: JSX.Element }): JSX.Element {
    return (
        <main className='dark'>
            <Navbar/>
            <main>{props.children}</main>
            <Foooter />
        </main>
    )
}