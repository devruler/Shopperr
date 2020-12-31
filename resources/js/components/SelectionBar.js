import Axios from 'axios'
import { transform } from 'lodash'
import React, { useEffect, useState } from 'react'
import ByMyCar from '../assets/images/by_my_car.svg'
import CarInDesert from '../assets/images/car_in_desert.jpg'
import SelectionBarStyles from './SelectionBar.css'
import gsap from 'gsap'
const searchBarStyles = {
    width: "100%",
    height: "70vh",
    overflow: 'hidden',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    clipPath: 'polygon(0% 0%, 75% 0%, 100% 100%, 25% 100%)',
    backgroundColor: 'rgb(23, 25, 25, 0.3)',
    border: '5px solid #D3AD2E'
}


const backgroundStyles = {
    //   opacity: "0.7",
    //   padding: "20px 0",
    // height: "70vh"
    // width: "80%"
}

const formStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 30px",

}

const SearchBar = ({ setOptions }) => {

    const [makers, setMakers] = useState([]);
    const [models, setModels] = useState([]);
    const [engines, setEngines] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({ maker: '', model: '', engine: '' })

    const handleSubmit = (e) => {
        e.preventDefault();
        setOptions({ category: '', ...selectedOptions })
    }

    const getMakers = () => {
        Axios.get('/api/products/makers')
            .then(res => setMakers([... new Set(res.data.data)]))
            .catch(err => console.log(err))
    }

    const getModels = () => {
        Axios.get('/api/products/models')
            .then(res => setModels([... new Set(res.data.data)]))
            .catch(err => console.log(err))
    }

    const getEngines = () => {
        Axios.get('/api/products/engines')
            .then(res => setEngines([... new Set(res.data.data)]))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getMakers()
        getModels()
        getEngines()

    }, [])

    return (
        <div style={{
            position: 'relative'
        }}>
            <img src={CarInDesert} alt="car in desert" style={{position: 'absolute', top: '0', left: '0', objectFit: 'cover', height: '100%', width: '100%'}}/>
            <div className="container" >
                <div className="row">
                    <div className="col-12" >

                        <div id="searchByOptions" style={searchBarStyles}>

                            <form onSubmit={(e) => handleSubmit(e)} style={formStyles}>
                                <div className="form-group m-2">
                                    <select className="form-control" name="" id="" onChange={(e) => setSelectedOptions({ ...selectedOptions, maker: e.target.value })}>
                                        <option value="">Maker</option>
                                        {makers.map(maker => {
                                            if (maker) return <option key={maker} value={maker}>{maker}</option>
                                        })}

                                    </select>
                                </div>
                                <div className="form-group m-2">
                                    <select className="form-control" name="" id="" onChange={(e) => setSelectedOptions({ ...selectedOptions, model: e.target.value })}>
                                        <option value="">Model</option>

                                        {models.map(model => {
                                            if (model) return <option key={model} value={model}>{model}</option>
                                        })}

                                    </select>


                                </div>
                                <div className="form-group m-2">
                                    <select className="form-control" name="" id="" onChange={(e) => setSelectedOptions({ ...selectedOptions, engine: e.target.value })}>
                                        <option value="">Engine</option>

                                        {engines.map(engine => {
                                            if (engine) return <option key={engine} value={engine}>{engine}</option>
                                        })}

                                    </select>
                                </div>

                                <button type="submit" className="btn btn-primary px-4 m-2">Find</button>
                            </form>
                        </div>


                    </div>
                </div>


            </div>
        </div>
    )
}

export default SearchBar
