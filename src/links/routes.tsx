import { ReactElement } from 'react'
import { links } from './links.tsx'
import { PostsPage } from '../pages/postsPage/postsPage.tsx'
import { CreatePostPage } from '../pages/createPostPage/createPostPage.tsx'
import { PostPage } from '../pages/postPage/postPage.tsx'


interface IRouter {
    path: string,
    element: ReactElement
}


export const routes: IRouter[] = [
    {
        path: links.postsPage,
        element: <PostsPage/>
    },
    {
        path: links.createPostPage,
        element: <CreatePostPage/>
    },
    {
        path: links.postPage + '/:id',
        element: <PostPage/>
    }
]