import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap'

const urlEndpoint = 'http://localhost:5001/blogs';

export default function BlogCard() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        axios.get(`${urlEndpoint}/all`).then((response) => {
            setBlogs(response.data.blogs);
        });
    }, []);

    return (

        <div className='blogCard'>
          {blogs.map((blog) => (
            <div
            key={blog.id}>
            <Card style={{ width: '18rem' }}>
            <Card.Body>
            <Card.Title className="cardTitle">{blog.title}</Card.Title>
            <Card.Text className="cardText">{blog.author}</Card.Text>
            <Card.Text className="cardText">Created: {blog.createdAt}</Card.Text>
            <Card.Text className="cardTextScroll">{blog.text}</Card.Text>
            </Card.Body>
            </Card>
                </div>
            ))}
        </div>
    );
};