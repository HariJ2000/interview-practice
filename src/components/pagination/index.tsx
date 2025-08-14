import { useEffect, useState } from 'react'
import './style.css'
import { Product, ProductApiResponse } from './type'

function Pagination() {
    const [products, setProducts] = useState<Product[]>()
    const [page, setPage] = useState<number>(1)
    const [total, setTotal] = useState<number>(0)
    const fetchDataFromAPI = async () => {
        let response = await fetch(`https://dummyjson.com/products?limit=${10}&skip=${page*10-10}`)
        let data:ProductApiResponse = await response.json()
        setProducts(data.products)
        setTotal(data.total)
    }
    useEffect(() => {
        fetchDataFromAPI()
    }, [page])
    const clickHandler = (idx:number) => {
        if(idx >= 1 && idx <= Math.ceil(total/10)){
            setPage(idx)
        }
    }
    return <>
        <div data-testid="product__container" className='product__container'>
            {products && products.map((product: Product) =>
                <div className='single__product'>
                    <div>{product.title}</div>
                    <div>{product.description}</div>
                </div>
            )}
        </div>
        <div className='pagination'>
            <span onClick={() => clickHandler(page-1)} className={page > 1 ? "" : "disable"}>◀️</span>
            {[...Array(Math.ceil(total/10))].map((_, idx) => <span className={page == idx+1 ? "active" : ""} onClick={()=>setPage(idx+1)}>
                {idx+1}
            </span>)}
            <span onClick={() => clickHandler(page+1)} className={page < total/10 ? "" : "disable"}>▶️</span>
        </div>
    </>
}

export default Pagination