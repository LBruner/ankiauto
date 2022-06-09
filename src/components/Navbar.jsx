import classes from './Navbar.module.css';
import Link from "next/link";
import Image from "next/image";
import favicon from '../../public/favicon.png'

const Navbar = () => {
    return (
        <nav>
            <div className={classes.navbar}>
                <div className={classes.brand}>
                    <Image src={favicon}  width={100} height={100} />
                    <p>Ankimate</p>
                </div>
                <div className={classes.options}>
                    <Link href={'/ankimate'}>Add Cards</Link>
                    <Link href={'/stats'}>Stats</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;