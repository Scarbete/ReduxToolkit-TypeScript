import { FC, useEffect } from 'react'

import classes from './postsList.module.sass'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.tsx'
import { asyncGetAllPosts } from '../../../store/reducers/postSlice/postsSlice.tsx'
import { PostsCard } from '../postsCard/postsCard.tsx'
import {NavLink} from "react-router-dom";
import {links} from "../../../links/links.tsx";


export const PostsList: FC = () => {
    const { posts, loading, error } = useAppSelector(state => state.postsReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(asyncGetAllPosts())
    }, [])

    return loading ? <h2>Загрузка данных</h2> : (
        <div className={classes.postsList}>
            {error && <h2>{error}</h2>}
            {posts.length > 0
                ? posts && posts.map(item => <PostsCard key={item.id} item={item}/>)
                : <div className={classes.nullPosts}>
                    <p>Posts is null</p>
                    <NavLink to={links.createPostPage}>
                        nav to create post form page
                    </NavLink>
                </div>
            }
        </div>
    )
}