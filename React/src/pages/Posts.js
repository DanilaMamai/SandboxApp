import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { Container } from 'react-bootstrap';
import { api } from '../tools/api';
import Animate from 'react-smooth';

export const Posts = withRouter((props) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetch = async function () {
            try {
                const respose = await api.getPosts();
                setPosts(respose.data);
            }
            catch (error) {
                console.log(error.message);
            }
        }

        fetch();
    }, [props.history.location])


    return (
        <Container>
            {
                posts.map((post, index) => {
                    const seconds = (index + 1) * 300;
                    const steps = [{
                        style: {
                            opacity: 0,
                        },
                        duration: seconds,
                    }, {
                        style: {
                            opacity: 1,
                            transform: 'translate(0, 10px)',
                        },
                        duration: seconds,
                    }];
                

                    return (
                        <Animate key={post.id} steps={steps}>
                            <div className="post">
                                <h2>{post.title}</h2>
                                <div className="content">
                                    <a href={post.url} target="_blank" rel="noopener noreferrer">{post.url}</a>
                                    <p>{post.description}</p>
                                </div>
                            </div>
                        </Animate>)
                })
            }
        </Container>
    )
})