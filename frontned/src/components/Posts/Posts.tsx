import React, { useEffect, useRef, useState } from 'react';
import styles from './Posts.module.css';
import { Link } from 'react-router-dom';
export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}
const Posts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    const endOfPageRef = useRef<HTMLDivElement>(null);
    const [limit, setLimit] = useState<number>(10);

    useEffect(() => { 
        const storedLimit = window.localStorage.getItem('limit') 
        const storedPage = window.localStorage.getItem('page') 
        console.log(storedLimit);
        console.log(storedPage);
        
        if (!storedLimit) { 
            fetchPosts(limit); 
        }
        setPage(Number(storedPage)) 
        setLimit(Number(storedLimit)) 
        fetchPosts(Number(storedLimit)); 
    }, []);
    useEffect(() => {
        fetchPosts(limit)
    },[])
    //основная функция добавления постов
    const fetchPosts = async (limit: number) => {
        try {
            setLoading(true);
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);
            const data = await response.json();
            setPosts([...data]);
            setPage(page + 1);
            setLimit(limit + 10);
            window.localStorage.setItem('page', JSON.stringify(page));
            window.localStorage.setItem('limit', JSON.stringify(limit)); // Записываем новое значение лимита в хранилище
        } catch (error) {
            console.error('Ошибка загрузки постов:', error);
        } finally {
            setLoading(false);
        }
    };
    //при первом вызове

    //для отслеживания скрола 
    const handleScroll = () => {
        if (limit > 0) {
            if (page <= 5 && endOfPageRef.current && window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                fetchPosts(limit);
            }
        }

    };
    useEffect(() => {
        document.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [window.scrollY]);

    //функция добавления при нажатии на кнопку
    const handleLoadMoreClick = () => {
        fetchPosts(limit);
    };

    return (
        <div className={styles.container}>
            <h1>Посты</h1>
            <ul>
                {posts.map((post, index) => (
                    <Link to={`/posts/${post.id}`} key={post.id}> {/* Используем Link для создания ссылки */}
                        <li>
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                        </li>
                    </Link>
                ))}
            </ul>
            {loading && <p>Загрузка...</p>}
            <div ref={endOfPageRef}>
                {page <= 5 && <p>Прокрутите вниз для автоматической загрузки следующих постов</p>}
                {page > 5 && <button onClick={handleLoadMoreClick}>Загрузить еще</button>}
            </div>
        </div>
    );
};

export default Posts;