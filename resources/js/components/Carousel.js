import React, { useContext } from 'react'
import { AuthContext, AuthProvider } from '../Contexts/AuthContext'

const Carousel = () => {

    const [user] = useContext(AuthContext)

    return (
        <>
            <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">

                <div className="carousel-inner">
                    <div className="carousel-item active" style={{maxHeight: "700px"}}>
                        <img src="/images/banners/banner1.jpg" className="d-block w-100" alt="" />
                        <div className="carousel-caption d-none d-md-flex flex-column justify-content-center align-items-center">
                            <h1 className="mb-4">Welcome {user.name}</h1>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Carousel
