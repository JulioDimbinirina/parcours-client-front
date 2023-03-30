import { MenuItemProps } from "../menu-item";
import contactImg from '../../images/contacts.png';
import activite from '../../images/activite.png';
import stat from '../../images/statistique.png'

export const menuItems: MenuItemProps[] = [
    {
        info: {
            url: '/#',
            name: 'CONTACT'
        },
        icon: contactImg,
        background: '#828181',

    },
    {
        info: {
            url: '/#',
            name: 'ACTIVITE'
        },
        icon: activite,
        background: '#e75113',

    },
    {
        info: {
            url: '/#',
            name: 'STATISTIQUE'
        },
        icon: stat,
        background: '#0088c1',

    },
    {
        info: {
            url: '/#',
            name: 'OUTILS'
        },
        icon: contactImg,
        background: '#121212',

    }
]