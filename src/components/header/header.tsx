import classes from './header.module.sass'
import headerLogo from '../../assets/images/vite.svg'
import { NavLink } from 'react-router-dom'
import { links } from '../../links/links.tsx'
import { FC } from 'react'


export const Header: FC = () => {

    return (
        <div className={classes.header}>
            <div className={'container'}>
                <div className={classes.header__inner}>
                    <NavLink to={links.postsPage}>
                        <img src={headerLogo} alt="headerLogo"/>
                    </NavLink>
                    <nav>
                        <NavLink to={links.postsPage}>mainPage</NavLink>
                        <NavLink to={links.createPostPage}>createPost</NavLink>
                    </nav>
                </div>
            </div>
        </div>
    )
}