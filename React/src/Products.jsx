import { Input } from "./components/forms/Input"
import { Checkbox } from "./components/forms/Checkbox"
import { ProductCategoryRow } from "./components/products/ProductCategoryRow"
import { ProductRow } from "./components/products/ProductRow"
import { useState } from "react"

const PRODUCTS = [
    {category: 'fruits', price: "$1", stocked: true, name: 'Apple'},
    {category: 'fruits', price: "$1", stocked: true, name: 'DragonFruit'},
    {category: 'fruits', price: "$2", stocked: false, name: 'PassionFruit'},
    {category: 'vegetables', price: "$2", stocked: true, name: 'Spinash'},
    {category: 'vegetables', price: "$4", stocked: false, name: 'Pumpkin'},
    {category: 'vegetables', price: "$1", stocked: true, name: 'Peas'}
]

function App() {
    const [showStockOnly, setShowStockOnly] = useState(false)
    const [search, setSearch] = useState('')
    const maxPrice = Math.max(...PRODUCTS.map(p => parseFloat(p.price.replace('$', ''))))
    const [range, setRange] = useState(maxPrice)

    const visibleProducts = PRODUCTS.filter(product => {
        if(showStockOnly && !product.stocked) {
            return false
        }
        if(search && !product.name.toLowerCase().includes(search.toLowerCase())) {
            return false
        }

        const price = parseFloat(product.price.replace('$', ''))
        if (price > range) {
            return false
        }

        return true
    })

    return <div className="container my-3">
        <SearchBar
            search={search}
            OnSearchChange={setSearch}
            showStockOnly={showStockOnly}
            OnStockedOnlyChange={setShowStockOnly}
            range={range}
            OnRangeChange={setRange}
            maxPrice={maxPrice}
        />
        <ProductTable products={visibleProducts} />
        <hr />
    </div>
}

function SearchBar({search, OnSearchChange, showStockOnly, OnStockedOnlyChange, range, OnRangeChange, maxPrice}) {
    return <div>
        <div className="mb-3">
            <Input value={search} onChange={OnSearchChange} placeholder="Rechercher..." />
            <Checkbox id="stocked" checked={showStockOnly} onChange={OnStockedOnlyChange} label="N'afficher que les produits en stock" />
            <label htmlFor="priceRange" className="form-label">
                Prix maximum : {range}$
            </label>
            <input
                type="range"
                id="priceRange"
                className="form-range"
                min={0}
                max={maxPrice}
                step={1}
                value={range}
                onChange={e => OnRangeChange(Number(e.target.value))}
            />
        </div>
    </div>
}

function ProductTable({products}) {
    const rows = []
    let lastCategory = null
    for(let product of products) {
        if(product.category !== lastCategory) {
            rows.push(<ProductCategoryRow key={product.category} name={product.category} />)
        }
        lastCategory = product.category
        rows.push(<ProductRow key={product.name} product={product} />)
    }

    return <table className="table">
        <thead>
            <tr>
                <th>Nom</th>
                <th>Prix</th>
            </tr>
        </thead>
        <tbody>
        {rows}
        </tbody>
    </table>
}

export default App