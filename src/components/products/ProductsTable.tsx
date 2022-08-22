import React, { useEffect, useState } from 'react';
import './ProductsTable.css';

interface Product {
  name: string;
  category: Category;
  price: number;
}
interface Category {
  id: string;
  name: string;
}

const ProductsTable = () => {
  const [prod, setProd] = useState<Product[]>([]);
  const [defaultProd, setDefaultProd] = useState<Product[]>([]);
  const products = prod;

  const [sortState, setSortState] = useState<'asc' | 'desc' | null>(null);

  const [countProd, setCountProd] = useState(1);
  const handlePlus = () => {
    setCountProd(countProd + 1);
  };
  const handleMinus = () => {
    if (countProd > 0) {
      setCountProd(countProd - 1);
    }
  };

  useEffect(() => {
    const defaultProducts = [...defaultProd];
    if (sortState === 'asc') {
      defaultProducts.sort((a: Product, b: Product) => {
        return a.price - b.price;
      });
    } else if (sortState === 'desc') {
      defaultProducts.sort((a: Product, b: Product) => {
        return b.price - a.price;
      });
    }
    setProd(defaultProducts);
  }, [sortState, defaultProd, setProd]);

  useEffect(() => {
    if (prod && prod.length) return;
    fetch('http://localhost:3001/api/products/')
      .then((response) => {
        return response.json();
      })
      .then((products) => {
        setProd(products);
        setDefaultProd(products);
      });
  });
  const onSortClick = () => {
    if (sortState === 'asc') {
      setSortState('desc');
      return;
    }
    if (sortState === 'desc') {
      setSortState(null);
      return;
    }
    setSortState('asc');
  };

  return (
    <table className="products-contain">
      <thead>
        <tr>
          <th>Category</th>
          <th>Name</th>
          <th className="price" onClick={() => onSortClick()}>
            Price
            {sortState && <span> { sortState === "desc" ? `\\/` : "^"} </span>}

          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((item: any) => (
          <tr key={item.id}>
            <td>{item.category.name}</td>
            <td>{item.name}</td>
            <td>${item.price}</td>
            <td>
              <span>Select</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductsTable;
