import { IPost } from '../../../models/IPost.tsx'

export interface EditPostArgs {
    postID: number,
    newPost: IPost
}

export interface onePostState {
    post: IPost | null,
    loading: boolean,
    error: string,
    editLoading: boolean
}