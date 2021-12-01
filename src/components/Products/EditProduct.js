import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productsContext } from "../../context/ProductContext";
import Button from "@mui/material/Button";

const EditProducts = ({ id }) => {
  // С продукт контекст мы принимаем 3 функции 
  const { editProductDetails, getProducts, productDetails } =
    useContext(productsContext);
  // Мы создали здесь  state и в аргументы мы закидываем ProductsDetails.
  const [editProduct, setEditProduct] = useState(productDetails);


  //первая функция у нас здесь ClickEdit  в аргументы мы указываем id.
  //потом мы вызываем функцию editProductDetails и в аргументы вызываем id и editProduct 
  function clickEdit(id) {
    editProductDetails(id, editProduct);
    getProducts();
  }

  return (
    <div className="editBlock">
      <span>Категория</span>
      <input
        name="type"
        placeholder="Телефон, наушники, зарядное устройство"
        type="text"
        value={editProduct.type}
        onChange={(e) =>
          setEditProduct({ ...editProduct, type: e.target.value })
        }
      />
      <span>Название</span>
      <input
        name="title"
        placeholder="Iphone"
        type="text"
        value={editProduct.title}
        onChange={(e) =>
          setEditProduct({ ...editProduct, title: e.target.value })
        }
      />
      <span>Описание</span>
      <input
        name="description"
        placeholder="Нпишите описание вашего продукта!"
        type="text"
        value={editProduct.description}
        onChange={(e) =>
          setEditProduct({ ...editProduct, description: e.target.value })
        }
      />
      <span>Цена</span>
      <input
        name="price"
        placeholder="1000"
        type="number"
        value={editProduct.price}
        onChange={(e) =>
          setEditProduct({ ...editProduct, price: e.target.value })
        }
      />
      <span>Память</span>
      <input
        name="memory"
        placeholder="128"
        type="text"
        value={editProduct.memory}
        onChange={(e) =>
          setEditProduct({ ...editProduct, memory: e.target.value })
        }
      />
      <span>Наличие</span>
      <input
        name="countInStock"
        placeholder="10"
        type="text"
        value={editProduct.countInStock}
        onChange={(e) =>
          setEditProduct({ ...editProduct, countInStock: e.target.value })
        }
      />
      <span>Скидочная цена</span>
      <input
        name="salePrice"
        placeholder="900"
        type="text"
        value={editProduct.salePrice}
        onChange={(e) =>
          setEditProduct({ ...editProduct, salePrice: e.target.value })
        }
      />
      <span>Скидка</span>
      <input
        name="discountInPercent"
        placeholder="10%"
        type="text"
        value={editProduct.discountInPercent}
        onChange={(e) =>
          setEditProduct({ ...editProduct, discountInPercent: e.target.value })
        }
      />
      <span>Номер телефона</span>
      <input
        name="phone"
        placeholder="+996___________"
        type="text"
        value={editProduct.phone}
        onChange={(e) =>
          setEditProduct({ ...editProduct, phone: e.target.value })
        }
      />
      <span>Изображение</span>
      <input
        name="image"
        placeholder="URL"
        type="text"
        value={editProduct.image}
        onChange={(e) =>
          setEditProduct({ ...editProduct, image: e.target.value })
        }
      />
      <span>Details</span>
      <input
        name="image"
        placeholder="URL"
        type="text"
        value={editProduct.details}
        onChange={(e) =>
          setEditProduct({ ...editProduct, details: e.target.value })
        }
      />
      <Link to="/">
        <Button
          variant="contained"
          color="success"
          onClick={() => clickEdit(id)}
        >
          Сохранить
        </Button>
      </Link>
    </div>
  );
};

export default EditProducts;
