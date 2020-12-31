import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import AdminSidebar from '../../partials/AdminSidebar';
import AdminNavbar from '../../partials/AdminNavbar';
import Axios from 'axios';



const CreateProduct = () => {

    const history = useHistory()

    const [product, setProduct] = useState({ errors: {} });
    const [categories, setCategories] = useState([]);

    const [success, setSuccess] = useState(false)

    const getCategories = () => {
        Axios.get('/api/categories')
            .then(res => setCategories(res.data.data))
            .catch(err => console.log(err));
    }

    const storeProduct = (e) => {
        e.preventDefault();
        let form = new FormData;

        form.append('title', product.title);
        form.append('description', product.description);
        form.append('maker', product.maker);
        form.append('model', product.model);
        form.append('engine', product.engine);
        form.append('price', product.price);
        form.append('img', product.img);
        form.append('category_id', product.category_id);

        Axios.post('/api/admin/products', form, {
            'content-type': 'multipart/form-data'
        }).then(res => setSuccess(true))
            .catch(err => {
                setProduct({ ...product, errors: err.response.data.errors });
            })
    }

    const imgPreview = (e) => {
        let reader = new FileReader;
        reader.onload = () => {
            const img_preview = document.getElementById('img_preview');
            img_preview.src = reader.result;
        }
        reader.readAsDataURL(e.target.files[0]);
        setProduct({ ...product, img: e.target.files[0] });
    }


    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                history.push('/admin/products')
            }, 800)
        }

    }, [success])

    return (
        <>
            <AdminSidebar></AdminSidebar>

            <div className="c-wrapper">

                <AdminNavbar></AdminNavbar>

                <div className="c-body w-100">
                    <main className="c-main">
                        <div className="container-fluid">
                            <div className="fade-in">
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <h2>Create New Product</h2>

                                    </div>
                                </div>
                                <div className="row mb-5">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <form onSubmit={(e) => storeProduct(e)}>
                                                    <div className="row">
                                                        <div className="col-12 col-md-8">
                                                            <div className="form-group">
                                                                <label htmlFor="title">Title</label>
                                                                <input onChange={(e) => setProduct({ ...product, title: e.target.value })} type="text" className="form-control" name="title" id="title" aria-describedby="title-msg" placeholder="Title" required />
                                                                {product.errors.hasOwnProperty('title') && <small className="form-text text-danger">{product.errors.title[0]}</small>}
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="description">Description</label>
                                                                <textarea onChange={(e) => setProduct({ ...product, description: e.target.value })} type="text" className="form-control" name="description" id="description" aria-describedby="description-msg" placeholder="Description" rows="7" required></textarea>
                                                                {product.errors.hasOwnProperty('description') && <small className="form-text text-danger">{product.errors.description[0]}</small>}
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Category</label>
                                                                <select className="form-control" onChange={(e) => setProduct({ ...product, category_id: e.target.value })} name="category_id" id="category_id">
                                                                    {categories.length > 0 && categories.map(category => <option value={category.id} key={category.id}>{category.name}</option>)}
                                                                </select>
                                                                {product.errors.hasOwnProperty('category_id') && <small className="form-text text-danger">Invalid category</small>}

                                                            </div>
                                                            <div className="form-group row">
                                                                <div className="col-12 col-md-4">
                                                                    <label htmlFor="maker">Maker</label>
                                                                    <input onChange={(e) => setProduct({ ...product, maker: e.target.value })} type="text" className="form-control" name="maker" id="maker" aria-describedby="maker-msg" placeholder="Maker" required />
                                                                    {product.errors.hasOwnProperty('maker') && <small className="form-text text-danger">{product.errors.maker[0]}</small>}
                                                                </div>
                                                                <div className="col-12 col-md-4">
                                                                    <label htmlFor="model">Model</label>
                                                                    <input onChange={(e) => setProduct({ ...product, model: e.target.value })} type="text" className="form-control" name="model" id="model" aria-describedby="model-msg" placeholder="Model" required />
                                                                    {product.errors.hasOwnProperty('model') && <small className="form-text text-danger">{product.errors.model[0]}</small>}
                                                                </div>
                                                                <div className="col-12 col-md-4">
                                                                    <label htmlFor="engine">Engine</label>
                                                                    <input onChange={(e) => setProduct({ ...product, engine: e.target.value })} type="text" className="form-control" name="engine" id="engine" aria-describedby="engine-msg" placeholder="Engine" />
                                                                    {product.errors.hasOwnProperty('engine') && <small className="form-text text-danger">{product.errors.engine[0]}</small>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12 col-md-4">
                                                            <div className="form-group">
                                                                <label htmlFor="image">Image</label>
                                                                <input onChange={(e) => imgPreview(e)} type="file" accept=".png, .jpg, .jpeg" className="form-control-file" name="image" id="image" placeholder="Image" aria-describedby="image-msg" required />
                                                                {product.errors.hasOwnProperty('img') && <small className="form-text text-danger">{product.errors.img[0]}</small>}
                                                                <div className="w-100">
                                                                    {product.img && <img className="w-100" src="" id="img_preview" alt="" />}
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="price">Price</label>
                                                                <input onChange={(e) => setProduct({ ...product, price: e.target.value })} type="number" step="0.01" className="form-control-file" name="price" id="price" placeholder="Price" aria-describedby="price-msg" required />
                                                                {product.errors.hasOwnProperty('price') && <small className="form-text text-danger">{product.errors.price[0]}</small>}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="d-flex">
                                                                <div className="mr-2">
                                                                    <button type="submit" className="btn btn-primary">Create</button>
                                                                </div>
                                                                <div>
                                                                    <Link to={'/admin/products'} className="btn btn-block btn-secondary" >Go Back</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {

                                                        success &&

                                                        <div className="row mt-3">
                                                            <div className="col">
                                                                <div className="alert alert-success" role="alert">
                                                                    <strong>Product has been successfully created!</strong>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }

                                                </form>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>

            </div>
        </>
    )
}

export default CreateProduct
