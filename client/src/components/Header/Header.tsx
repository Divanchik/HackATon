import {FC} from 'react';

import s from './Header.module.scss';

import logoUrl from '../../assets/svg/dog-svgrepo-com.svg';
import {Link} from 'react-router-dom';
import {
    CONSTRUCTOR,
    SOURCE_EDIT,
    UPLOAD_DATA
} from '../../pathes';

const Header: FC = () => {
    return (
        <header className={s.header}>
            <img alt="Перейти в дашбоард" src={logoUrl}/>
            <nav>
                <li>
                    <ul>
                        <Link to={UPLOAD_DATA}>Загрузить данные</Link>
                    </ul>
                    <ul>
                        <Link to={SOURCE_EDIT}>Управление исходными данными</Link>
                    </ul>
                    <ul>
                        <Link to={CONSTRUCTOR}>Констркутор</Link>
                    </ul>
                </li>
            </nav>
        </header>
    );
};

export {Header};
