import React from 'react'

const Pagination = ({meta = {}, getPageData}) => {

    const handleClick = (url, e) => {
        e.preventDefault();
        getPageData(url);
    }

    return (
        <>
            { Object.keys(meta).length ?

                <nav className="my-4 d-flex flex-wrap">
                    <ul className="pagination">
                        {  meta.links.map(link => {
                            return  <li key={link.label} className={"page-item" + (link.active ? " active" : "")}>
                                        <a className="page-link text-dark" onClick={(e) => handleClick(link.url, e)} href={link.url} dangerouslySetInnerHTML={{__html: link.label}}></a>
                                    </li>
                        })}
                    </ul>
                </nav>

                : ""
            }
        </>
    )
}

export default Pagination
