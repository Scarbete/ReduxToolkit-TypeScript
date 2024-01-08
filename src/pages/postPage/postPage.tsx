import { FC, FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import classes from './postPage.module.sass'
import { IPost } from '../../models/IPost.tsx'
import { useAppDispatch, useAppSelector } from '../../hooks/redux.tsx'
import { asyncEditPost, asyncGetOnePost } from '../../store/reducers/onePostSlice.tsx'


export const PostPage: FC = () => {
    const { post, loading, editLoading, error } = useAppSelector(state => state.onePostReducer)
    const dispatch = useAppDispatch()
    const { id } = useParams()

    const [ newTitle, setNewTitle ] = useState<string>('')
    const [ newBody, setNewBody ] = useState<string>('')
    const [ newPrice, setNewPrice ] = useState<string>('')

    useEffect(() => {
        dispatch(asyncGetOnePost(Number(id)))
    }, [dispatch, id])

    useEffect(() => {
        if (post) {
            setNewTitle(post.title)
            setNewBody(post.body)
            setNewPrice(`${post.price}`)
        }
    }, [post])

    const handleEditPost = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        if (post) {
            const newPost: IPost = {
                image: post.image,
                title: newTitle,
                body: newBody,
                price: Number(newPrice),
                id: post.id
            }
            const postID = Number(id)
            dispatch(asyncEditPost({ postID, newPost }))
                .then(() => alert('Успешное изменение!'))
        }
        else alert('Неизвестная ошибка пон да?')
    }

    if (error) return <h2>{error}</h2>
    return loading ? <h2>Загрузка</h2> : (
        <div className={classes.postPage}>
            <div className={'container'}>
                <div className={classes.postPage__inner}>

                    <div className={classes.postInfo}>
                        <div className={classes.postImage}>
                            <img src={post?.image} alt="postImage"/>
                        </div>
                        <div className={classes.postDescriptionInfo}>
                            <h2>post Info</h2>
                            <h3>ID: {post?.id}</h3>
                            <p>title: {post?.title}</p>
                            <p>body: {post?.body}</p>
                            <p>price: {post?.price}</p>
                        </div>
                    </div>

                    <div className={classes.postEdit}>
                        <form className={classes.postEdit__form} onSubmit={handleEditPost}>
                            <h2>Edit post</h2>
                            <input
                                value={newTitle}
                                onChange={e => setNewTitle(e.target.value)}
                                type="text"
                            />
                            <input
                                value={newBody}
                                onChange={e => setNewBody(e.target.value)}
                                type="text"
                            />
                            <input
                                value={newPrice}
                                onChange={e => setNewPrice(e.target.value)}
                                type="text"
                            />
                            <button>{editLoading ? 'LOADING...' : 'Save'}</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}