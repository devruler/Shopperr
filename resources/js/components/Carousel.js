import React from 'react'

const Carousel = () => {
    return (
        <>
            <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">

                <div className="carousel-inner">
                    <div className="carousel-item active" style={{maxHeight: "700px"}}>
                        <img src="/images/banners/banner1.jpg" className="d-block w-100" alt="" />
                        <div className="carousel-caption d-none d-md-flex flex-column justify-content-center align-items-center">
                            <h1 className="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
                            <button className="btn btn-primary rounded-0 ">Check Offer</button>
                        </div>
                    </div>

                </div>
                <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </>
    )
}

export default Carousel
