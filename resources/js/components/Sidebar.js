import Axios from 'axios'
import React, { useEffect, useState } from 'react'

const Sidebar = ({setOptions}) => {

    const [categories, setCategories] = useState([]);
    const [makers, setMakers] = useState([]);
    const [models, setModels] = useState([]);
    const [engines, setEngines] = useState([]);

    const [selectedOptions, setSelectedOptions] = useState({category:"", maker: "",model: "", engine: ""})

    const getCategories = () => {
        Axios.get('/api/categories')
        .then(res => setCategories(() => res.data.data))
        .catch(err => console.log(err));
    }

    const getMakers = () => {
        Axios.get('/api/products/makers')
        .then(res => setMakers(res.data.data))
        .catch(err => console.log(err))
    }

    const getModels = () => {
        Axios.get('/api/products/models')
        .then(res => setModels(res.data.data))
        .catch(err => console.log(err))
    }

    const getEngines = () => {
        Axios.get('/api/products/engines')
        .then(res => setEngines(res.data.data))
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

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="border-bottom py-3">
                        <h4 className="mb-3">Category</h4>
                        <div className="nav flex-column nav-pills py-2" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            {
                            categories.map((category, index) =>
                                <a href="#"
                                onClick={(e) => selectCategory(e,index)}
                                className={"nav-link" + (selectedOptions.category === category.name ? " active" : "") } >
                                    {category.name}
                                </a>)
                            }
                        </div>
                    </div>
                    <div className="border-bottom py-3">
                        <h4 className="mb-3">Maker</h4>
                        <div className="nav flex-column nav-pills py-2" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            {makers.map((maker, index) => maker && <a href="#" onClick={(e) => selectMaker(e,index)} className={"nav-link" + (selectedOptions.maker === maker ? " active" : "") } >{maker}</a>)}
                        </div>
                    </div>
                    <div className="border-bottom py-3">
                        <h4 className="mb-3">Model</h4>
                        <div className="nav flex-column nav-pills py-2" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            {models.map((model,index) => model && <a href="#" onClick={(e) => selectModel(e,index)} className={"nav-link" + (selectedOptions.model === model ? " active" : "") } >{model}</a>)}
                        </div>
                    </div>
                    <div className="py-3">
                        <h4 className="mb-3">Engine</h4>
                        <div className="nav flex-column nav-pills py-2" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            {engines.map((engine, index) => engine && <a href="#" onClick={(e) => selectEngine(e,index)} className={"nav-link" + (selectedOptions.engine === engine ? " active" : "") } >{engine}</a>)}
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Sidebar
