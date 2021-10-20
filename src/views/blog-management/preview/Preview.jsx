import React, { useEffect, useState } from 'react'
import { PageHeader, Descriptions, Row, Tag } from 'antd';
import axios from 'axios';
import './preview.css'
export default function Preview(props) {
    const [blogContent, setBlog] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:3000/posts/?id=${props.match.params.id}`).then(
            res => {
                setBlog(res.data[0])
            }
        )

    }, [props.match.params.id])
    return (
        <div className='preview-warapper'>
            {
                // header
                blogContent &&
                <PageHeader
                    className="site-page-header"
                    onBack={() => props.history.goBack()}
                    title={blogContent.title}
                >
                    <Descriptions size="small" column={3}>
                        <Descriptions.Item label="Created Date">{blogContent.date}</Descriptions.Item>
                        <Descriptions.Item label="Tags">

                            {/* if no tag then not mapping */}
                            {blogContent.tags?.map(tag => {
                                let color = tag> 2 ? 'geekblue' : 'green';
                                return (
                                    <Tag color={color} key={tag}>
                                        {tag===1?'Vue':tag===2?'React':'NodeJS'}
                                    </Tag>
                                );
                            })}

                        </Descriptions.Item>
                        <Descriptions.Item label="Status">{
                            blogContent.status === 1 ? 'Draft' :
                                blogContent.status === 2 ?
                                    'Active' : 'Archived'
                        }</Descriptions.Item>
                    </Descriptions>
                    <Row>
                    </Row>
                </PageHeader>
            }
            {/* content */}
            <div className='preview-content'
                dangerouslySetInnerHTML=
                {{ __html: blogContent.blog }}
            />
        </div>
    )
}