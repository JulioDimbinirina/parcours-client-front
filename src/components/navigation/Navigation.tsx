/* eslint-disable jsx-a11y/anchor-is-valid */
import { useStyles } from './styles';
import accueilImage from '../../images/accueilIcon.png';
import personDollard from '../../images/personDollars.png';
import dashboard from '../../images/dashboard.png';
import nouvelleVente from '../../images/nouvelleVente.png';
import iconAdmin from '../../images/iconAdmin.png';
import {  Clear, Menu } from '@material-ui/icons'
import { Link } from 'react-router-dom';
import ResponsiveMenu from 'react-responsive-navbar';
import './styleNative.css';

// const Navigation: FC<NavigationProps> = ({
//     nameUser,
//     role,
// }) => {
//     const classes = useStyles();

//     return (
//         <div className={classNames('w3-bar', 'w3-center', classes.root)}>
//             <a href="#" style={{ width: '9.66%' }} className="w3-bar-item w3-mobile">
//                 <div className={classes.homeIconContainer}>
//                     <img src={accueilImage} alt="statEudIcon" />
//                 </div>
//             </a>
//             <a href="#" style={{ width: '20.66%' }} className="w3-bar-item  w3-mobile">
//                 <div className={classes.navItem}>
//                     <span>Statistiques études et lancements en prod</span>
//                     <img src={personDollard} alt="statEudIcon" />
//                 </div>
//             </a>
//             <a href="#" style={{ width: '16.66%' }} className="w3-bar-item  w3-mobile">
//                 <div className={classes.navItem}>
//                     <span>Tableau de bord resp indus</span>
//                     <img src={dashboard} alt="dashboard" />
//                 </div>
//             </a>
//             <Link to="/qualification_vente" className="w3-bar-item  w3-mobile">
//                 <div className={classes.navItem}>
//                     <span>Créer nouvelle vente</span>
//                     <img src={nouvelleVente} alt="dashboard" />
//                 </div>
//             </Link>
//             <a href="#" style={{ width: '13.66%' }} className="w3-bar-item  w3-mobile">
//                 <div className={classes.navItem}>
//                     <span>Administration</span>
//                     <img src={iconAdmin} alt="dashboard" />
//                 </div>
//             </a>
//             <a href="#" style={{ width: '17.66%' }} className="w3-bar-item  w3-mobile">
//                 <div className={classes.navItem}>
//                     <div className={classes.userInformations}>
//                         <div>{nameUser}</div>
//                         <div>{role}</div>
//                     </div>
//                     <div>
//                         <Avatar>
//                             <AccountCircle />
//                         </Avatar>
//                     </div>
//                 </div>
//             </a>
//             <a href="#" style={{ width: '4%' }} className={classNames('w3-bar-item', 'w3-mobile', classes.logoutBtn)}>
//                 <PowerSettingsNew />
//             </a>
//         </div>
//     )
// }

const Navigation2 = () => {
    const classes = useStyles();
    return (
        <ResponsiveMenu
            menuOpenButton={
                <Menu />
            }
            menuCloseButton={
                <Clear />
            }
            changeMenuOn="900px"
            menu={
                <ul className="menu-list">
                    <li>
                        <a href="#" className="menu-link">
                            <img className={classes.img} src={accueilImage} alt="statEudIcon" />
                        </a>
                    </li>
                    <li>
                        <a href="#" className="menu-link">
                            <div className={classes.navItem}>
                                <span>Statistiques études et lancements en prod</span>
                                <img src={personDollard} className={classes.img}  alt="statEudIcon" />
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="menu-link">
                            <div className={classes.navItem}>
                                <span>Tableau de bord resp indus</span>
                                <img src={dashboard} className={classes.img}  alt="dashboard" />
                            </div>
                        </a>
                    </li>
                    <li>
                        <Link to="/qualification_vente" className="menu-link">
                            <div className={classes.navItem}>
                                <span>Créer nouvelle vente</span>
                                <img src={nouvelleVente} className={classes.img}  alt="newVente" />
                            </div>
                        </Link>
                    </li>
                    <li>
                        <a href="#" className="menu-link">
                            <div className={classes.navItem}>
                                <span>Administration</span>
                                <img src={iconAdmin} className={classes.img}  alt="admin" />
                            </div>
                        </a>
                    </li>
                </ul>
            }
        />
    )
}

export default Navigation2;