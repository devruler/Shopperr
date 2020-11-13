import React from 'react'

const Pagination = ({meta, getPageData}) => {

    const handleClick = (url, e) => {
        e.preventDefault();
        getPageData(url);
    }

    return (
        <>
            <nav>
                <ul className="pagination">
                    { meta.links && meta.links.map(link => {
                        return  <li key={link.label} className={"page-item" + (link.active ? " active" : "")}>
                                    <a className="page-link text-dark" onClick={(e) => handleClick(link.url, e)} href={link.url}>{link.label}</a>
                                </li>
                    })}
                </ul>
            </nav>
        </>
    )
}

export default Pagination
