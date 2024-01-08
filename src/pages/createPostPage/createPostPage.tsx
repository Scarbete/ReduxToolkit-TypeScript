import { FC, FormEvent } from 'react'

import classes from './createPostPage.module.sass'
import { IPost } from '../../models/IPost.tsx'
import { useAppDispatch, useAppSelector } from '../../hooks/redux.tsx'
import { asyncCreatePost, createPostAction } from '../../store/reducers/createPost/createPostSlice.tsx'


export const CreatePostPage: FC = () => {
    const { title, body, price, loading, error } = useAppSelector(state => state.createPostReducer)
    const dispatch = useAppDispatch()

    const handleCreatePost = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        if (title.trim() && body.trim() && Number(price) > 0) {
            const newPost: IPost = {
                image: 'https://loremflickr.com/640/480/food',
                price: Number(price),
                id: Date.now(),
                title: title,
                body: body
            }
            dispatch(asyncCreatePost(newPost)).then(() => alert('Post is created!'))
        }
        else alert('title && body is empty or price is 0!')
    }

    return (
        <div className={classes.createPostPage}>
            <div className={'container'}>
                <div className={classes.createPostPage__inner}>

                    <form onSubmit={handleCreatePost} className={classes.postForm}>
                        <h2>Create Post</h2>
                        {error && <p>{error}</p>}
                        <input
                            value={title}
                            onChange={e => dispatch(createPostAction.setTitle(e.target.value))}
                            type="text"
                            placeholder={'Enter title'}
                        />
                        <input
                            value={body}
                            onChange={e => dispatch(createPostAction.setBody(e.target.value))}
                            type="text"
                            placeholder={'Enter body'}
                        />
                        <input
                            value={price}
                            onChange={e => {
                                const sanitizedValue = e.target.value.replace(/[^0-9]/g, '')
                                dispatch(createPostAction.setPrice(sanitizedValue))
                            }}
                            type="text"
                            maxLength={7}
                            placeholder={'Enter price'}
                        />
                        <button>{loading ? 'LOADING...' : 'Create'}</button>
                    </form>

                </div>
            </div>
        </div>
    )
}