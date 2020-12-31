import Axios from 'axios'
import gsap from 'gsap';
import React, { useEffect, useState } from 'react'

const Sidebar = ({setOptions}) => {

    const [categories, setCategories] = useState([]);
    const [makers, setMakers] = useState([]);
    const [models, setModels] = useState([]);
    const [engines, setEngines] = useState([]);

    const [showOptions, setShowOptions] = useState({category: false, maker: false, model: false, engine: false})

    const [selectedOptions, setSelectedOptions] = useState({category:"", maker: "",model: "", engine: ""})

    const getCategories = () => {
        Axios.get('/api/categories')
        .then(res => setCategories(() => res.data.data))
        .catch(err => console.log(err));
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

    const selectCategory = (e,index) => {
        e.preventDefault()
        if(selectedOptions.category !== categories[index].name){
            setSelectedOptions({...selectedOptions,category: categories[index].name})
        }else{
            setSelectedOptions({...selectedOptions,category:""})
        }
    }

    const selectMaker = (e,index) => {
        e.preventDefault()
        if(selectedOptions.maker !== makers[index]){
            setSelectedOptions({...selectedOptions,maker: makers[index]})
        }else{
            setSelectedOptions({...selectedOptions,maker:""})
        }
    }

    const selectModel = (e,index) => {
        e.preventDefault()
        if(selectedOptions.model !== models[index]){
            setSelectedOptions({...selectedOptions,model: models[index]})
        }else{
            setSelectedOptions({...selectedOptions,model:""})
        }
    }

    const selectEngine = (e,index) => {
        e.preventDefault()
        if(selectedOptions.engine !== engines[index]){
            setSelectedOptions({...selectedOptions,engine: engines[index]})
        }else{
            setSelectedOptions({...selectedOptions,engine:""})
        }
    }

    useEffect(() => {
        getCategories();
        getMakers();
        getModels();
        getEngines();
    }, [])

    useEffect(() => {
        setOptions(selectedOptions)

    }, [selectedOptions])

    useEffect(() => {
        if(showOptions.category){
            gsap.to('#category-pills', { height: "auto"})
        }else{
            gsap.to('#category-pills', { height: 0})
        }

        if(showOptions.maker){
            gsap.to('#maker-pills', {height: "auto"})
        }else{
            gsap.to('#maker-pills', { height: 0})
        }

        if(showOptions.model){
            gsap.to('#model-pills', {height: "auto"})
        }else{
            gsap.to('#model-pills', { height: 0})
        }

        if(showOptions.engine){
            gsap.to('#engine-pills', {height: "auto"})
        }else{
            gsap.to('#engine-pills', { height: 0})
        }
    }, [showOptions])

    return (
        <>
            <div className="card rounded-0 border-0 shadow-sm">
                <div className="card-body">
                    <div className="border-bottom py-3">
                        <div className="d-flex justify-content-between">
                        <h4 className="mb-3">Category </h4>
                        <span>
                            { !showOptions.category && <button className="btn btn-light btn-sm rounded" onClick={() => setShowOptions({...showOptions, category: true})}>
                                <i className="fas fa-angle-down"></i>
                            </button>}
                            { showOptions.category &&  <button className="btn btn-light btn-sm rounded"  onClick={() => setShowOptions({...showOptions, category: false})}>
                                <i className="fas fa-angle-up"></i>
                            </button> }
                        </span>
                        </div>

                        <div className="nav flex-column nav-pills py-2" style={{overflow: "hidden", flexWrap: "nowrap"}} id="category-pills" role="tablist" aria-orientation="vertical">
                            {

                            categories.map((category, index) =>
                                <a href="#"
                                key={index}
                                onClick={(e) => selectCategory(e,index)}
                                className={"nav-link" + (selectedOptions.category === category.name ? " active" : "") } >
                                    {category.name}
                                </a>)
                            }
                        </div>
                    </div>
                    <div className="border-bottom py-3">
                    <div className="d-flex justify-content-between">
                        <h4 className="mb-3">Maker </h4>
                        <span>
                            { !showOptions.maker && <button className="btn btn-light btn-sm rounded" onClick={() => setShowOptions({...showOptions, maker: true})}>
                                <i className="fas fa-angle-down"></i>
                            </button>}
                            { showOptions.maker && <button className="btn btn-light btn-sm rounded" onClick={() => setShowOptions({...showOptions, maker: false})}>
                                <i className="fas fa-angle-up"></i>
                            </button> }
                        </span>
                        </div>
                        <div className="nav flex-column nav-pills py-2" style={{overflow: "hidden", flexWrap: "nowrap"}} id="maker-pills" role="tablist" aria-orientation="vertical">
                            {makers.map((maker, index) =>
                            maker &&
                            <a href="#"
                            key={index}
                            onClick={(e) => selectMaker(e,index)}
                            className={"nav-link" + (selectedOptions.maker === maker ? " active" : "") } >{maker}</a>)}
                        </div>
                    </div>
                    <div className="border-bottom py-3">
                    <div className="d-flex justify-content-between">
                        <h4 className="mb-3">Model </h4>
                        <span>
                            { !showOptions.model && <button className="btn btn-light btn-sm rounded" onClick={() => setShowOptions({...showOptions, model: true})}>
                                <i className="fas fa-angle-down"></i>
                            </button>}
                            { showOptions.model && <button className="btn btn-light btn-sm rounded" onClick={() => setShowOptions({...showOptions, model: false})}>
                                <i className="fas fa-angle-up"></i>
                            </button>}
                        </span>
                        </div>
                        <div className="nav flex-column nav-pills py-2" style={{overflow: "hidden", flexWrap: "nowrap"}} id="model-pills" role="tablist" aria-orientation="vertical">
                            { models.map((model,index) => model &&
                            <a href="#"
                            onClick={(e) => selectModel(e,index)}
                            key={index}
                            className={"nav-link" + (selectedOptions.model === model ? " active" : "") } >{model}</a>)}
                        </div>
                    </div>
                    <div className="py-3">
                    <div className="d-flex justify-content-between">
                        <h4 className="mb-3">Engine </h4>
                        <span>
                            { !showOptions.engine && <button className="btn btn-light btn-sm rounded" onClick={() => setShowOptions({...showOptions, engine: true})}>
                                <i className="fas fa-angle-down"></i>
                            </button>}
                            { showOptions.engine && <button className="btn btn-light btn-sm rounded" onClick={() => setShowOptions({...showOptions, engine: false})}>
                                <i className="fas fa-angle-up"></i>
                            </button>}
                        </span>
                        </div>
                        <div className="nav flex-column nav-pills py-2" style={{overflow: "hidden", flexWrap: "nowrap"}} id="engine-pills" role="tablist" aria-orientation="vertical">
                            { engines.map((engine, index) => engine &&
                            <a
                            key={index}
                            href="#"
                            onClick={(e) => selectEngine(e,index)}
                            className={"nav-link" + (selectedOptions.engine === engine ? " active" : "") } >{engine}</a>)}
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Sidebar
