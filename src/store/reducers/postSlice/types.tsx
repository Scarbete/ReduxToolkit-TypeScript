import { IPost } from '../../../models/IPost.tsx'

export interface PostsState {
    posts: IPost[],
    loading: boolean,
    error: string,
}
