import { FC } from 'react'

import classes from './postsCard.module.sass'
import { IPost } from '../../../models/IPost.tsx'
import { useAppDispatch } from '../../../hooks/redux.tsx'
import { asyncRemovePost } from '../../../store/reducers/postsSlice.tsx'
import { NavLink } from 'react-router-dom'
import { links } from '../../../links/links.tsx'


interface PostsCardProps {
    item: IPost
}


export const PostsCard: FC<PostsCardProps> = ({ item }) => {
    const randomNumber = Math.floor(Math.random() * 1000) + 1
    const imageUrl = `${item.image}?random=${randomNumber}`
    const dispatch = useAppDispatch()

    const handleRemovePost = (item: IPost) => {
        dispatch(asyncRemovePost(item.id))
    }

    return (
        <div className={classes.postsCard}>
            <div className={classes.cardImage}>
                <NavLink to={`${links.postPage}/${item.id}`}>
                    <img src={imageUrl} alt="itemImage"/>
                </NavLink>
            </div>
            <div>
                <h3>title: {item.title}</h3>
                <p>Price: {item.price}</p>
            </div>
            <div>
                <button onClick={() => handleRemovePost(item)}>
                    remove
                </button>
            </div>
        </div>
    )
}