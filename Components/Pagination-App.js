import react, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Components/Pagination'
import './App.css';

const App = () => {}
const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState (false);
const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage, setPostsPerPAge] = useState(10);

useEffect (() =>{
    const fetchPosts = async () =>{
        setLoading(true);
        const res = await axios.get('http://localhost:5001/blogs');
        setPosts(res.data);
        setLoading(false);
    }
    fetchPosts();
}, []);

//Get current posts
const indexOfLastPost = currentPage * PostsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

//Change page
const paginate = (pageNumber)=> setCurrentPage(pageNumber);

return (
    <div className="container mt-5">
    <h1 className="text-primary mb-3">Blogs</h1>
    <Posts posts={currentPosts} loading={loading}/>
    <Pagination 
    postsPerPage={postsPerPage} 
    totalPosts={posts.length} 
    paginate={paginate}
    />
    </div>
)