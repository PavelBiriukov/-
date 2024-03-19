import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../Posts/Posts';

const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState<Post>();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
                const postData = await response.json();
                setPost(postData);
            } catch (error) {
                console.error('Ошибка загрузки поста:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) {
        return <p>Загрузка...</p>;
    }

    if (!post) {
        return <p>Пост не найден</p>;
    }

    return (
        <div>
            <a href='/'>К постам</a>
            <div>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
            </div>
        </div>
    );
};

export default PostPage;
