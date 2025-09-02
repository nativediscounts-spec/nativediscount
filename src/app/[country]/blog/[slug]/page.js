"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function BlogView({params}) {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        if (slug) {
            fetch(`/api/blogs/${slug}`)
                .then((res) => res.json())
                .then((data) => setBlog(data));
        }
    }, [slug]);

    if (!blog) return <p className="text-center mt-5">Loading blog...</p>;

    return (
        <section className="pb-5 bg-light">
          
            <div className="container">
             
                <div className="card border-0 shadow p-4">
                       <ol className="breadcrumb">

                    <li

                        className="breadcrumb-item "

                    >

                        <Link href={`/${params.country}/blog/`}>All Blogs</Link>

                    </li>
                    
                   
                    <li

                        className="breadcrumb-item active"

                    >

                        <Link href={blog.slug}>{blog.title}</Link>

                    </li>

                </ol>
                 <h1 className="fw-bold"> {blog.title}</h1>
                <div className="mb-2"> Published on {blog.publishDate}</div>
                    {/* Image */}
                    {blog.featuredImage && (
                        <Image
                            src={blog.featuredImage}
                            alt={blog.featuredImageAlt}
                            width={900}
                            height={450}
                            className="img-fluid rounded mb-4"
                            style={{ objectFit: "cover", width: "100%", height: "500px" }}
                        />
                    )}

                    
                   

                    {/* Content */}
                    <div
                        className=""
                        dangerouslySetInnerHTML={{ __html: blog.bodyContent }}
                    ></div>
                     <p className="text-muted mb-3">
                        By {blog.author} 
                    </p>
                </div>
            </div>
        </section>
    );
}
