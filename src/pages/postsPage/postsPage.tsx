import { FC } from 'react'
import classes from './postsPage.module.sass'
import { PostsList } from '../../components/ui/postsList/postsList.tsx'


export const PostsPage: FC = () => {


    return (
        <div className={classes.postsPage}>
            <div className={'container'}>
                <div className={classes.postsPage__inner}>
                    <PostsList/>
                </div>
            </div>
        </div>
    )
}