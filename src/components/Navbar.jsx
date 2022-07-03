import classes from './Navbar.module.css';
import Link from "next/link";
import Image from "next/image";
import favicon from '../../public/favicon.png'
import {useSelector} from "react-redux";

const Navbar = () => {
    const fieldCount = useSelector(state => state.ui.fieldCount);
    
    return (
        <nav>
            <div className={classes.navbar}>
                <div className={classes.brand}>
                    <Image src={favicon}  width={100} height={100} />
                    <p>Ankimate</p>
                </div>
                <div className={classes['field-count']}>
                    <p>Words: {fieldCount}</p>
                </div>
                <div className={classes.options}>
                    <Link href={'/ankimate'}>Add Cards</Link>
                    <Link href={'/user'}>Stats</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;