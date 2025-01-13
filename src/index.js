/*
1. draw boxex for componet and give names. 
2. single responsbility principle. break UI into coponents. 
3. filterable product table, searchbar, product table, product category row, product row, 
Product table - > name, price and component inside. 
4. components that appear as another component in a component should appear as a child in a hirerachy.
*/

// building static version of filterable product table and search bar components.
//static version of the app, building individual components, pass data from child to parent by using props.  
// state is reserverd only for interactivity - data that changes over time. build top down or bottom up. 
// filterable product table or product row, simple one top down. 

import React, { useState } from "react";
import { createRoot } from 'react-dom/client';


const ProductCategoryRow = props => {
  const { product } = props;

  return (
    <tr>
      <th colSpan="2">
        {product.category}
      </th>
    </tr>
  );
}

const ProductRow = props => {
  const { product } = props;
  const coloredName = product.stocked ?
    product.name :
    <span style={{ color: "red" }} > {product.name}</span>

  return (
    <tr>
      <td>{coloredName}</td> <td align="right">{product.price}</td>
    </tr>
  );
};

const ProductTable = props => {
  const { filterText, inStockOnly, products } = props;
  const rows = [];
  let lastCategory = null;

  products.forEach(product => {
    if(product.name.indexOf(filterText) === -1){
      return;
    }
  if(inStockOnly && !product.stocked) {
    return;
  }
  if (product.category !== lastCategory){
    rows.push(
      <ProductCategoryRow
        product={product}
        key={product.category}
      />

    );
  }

    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;

  });

  return (
    <tabel width="100%">
      <thead>
        <tr style={{ color: "blue" }}>
          <th align="left">Name</th><th align="right">Price</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </tabel>
  )
};

const SearchBar = props => {
  const { 
    filterText, 
    inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
  } = props;

  return (
    <form>
      <input type="text" 
      placeholder="Search ... " 
      value={filterText}
      onChange={event => onFilterTextChange(event.target.value)}
      
      />
      <p>
        <input 
        type="checkbox" 
        checked={inStockOnly}
        onChange={event => onInStockOnlyChange(event.target.checked)}
        
      />
        <span style={{ color: "green", frontSize: "smaller" }}>
          Only show products in stock currently
        </span>
      </p>
    </form>
  )
}
// defining filterable product table component. functional component, JS6 arrow functions. 
const FilterableProductTable = props => {
  const [filterText, setFilterText]  = useState("");
const [inStockOnly, setInStockOnly] = useState(false);
  // 1. destructure products from props. 
  const { products } = props;
const handleFilterTextChange = filterText =>{
  setFilterText(filterText);
};

const handleInstockOnlyChange = inStockOnly =>{
  setInStockOnly(inStockOnly);
};

  return (
    <div style={({ fontFamily: "sans-serif" })}>
      <SearchBar
      filterText = {filterText}
      inStockOnly= {inStockOnly}
      onFilterTextChange= {handleFilterTextChange}
      onInStockOnlyChange= {handleInstockOnlyChange}
      />
      <ProductTable products={products} 
       filterText = {filterText}
       inStockOnly= {inStockOnly}
      
      />
    </div>
  )

}


const PRODUCTS = [
  {
    category: "Sproting Goods",
    price: "49.99",
    stocked: true,
    name: "Football"
  },
  {
    category: "Sproting Goods",
    price: "9.99",
    stocked: true,
    name: "Baseball"
  },
  {
    category: "Sproting Goods",
    price: "29.99",
    stocked: false,
    name: "Basketball"
  },
  {
    category: "Electronics",
    price: "99.99",
    stocked: true,
    name: "ipod touch"
  },
  {
    category: "Electronics",
    price: "399.99",
    stocked: false,
    name: "iphone 5"
  },
  {
    category: "Electronics",
    price: "199.99",
    stocked: true,
    name: "Nexus 7"
  },

];

// filterable product table with this products data to the props. 

const root = createRoot(document.getElementById('root'));
root.render(<FilterableProductTable products={PRODUCTS} />)
