"use client";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

export default function Card() {
  interface Product {
    id: number;
    title: string;
    image: string;
    price: number;
    description: string;
  }

  async function fetchData() {
    const response = await axios.get(
      "https://fakestoreapi.com/products?limit=10"
    );
    return response.data;
  }

  const { data, isLoading, isError } = useQuery("products", fetchData);

  console.log(data);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    return <div>Ошибка при загрузке данных</div>;
  }

  return (
    <div className="grid grid-cols-4">
      {data.map((item: Product) => (
        <div
          key={item.id}
          className="w-[400px] h-[700px] p-[30px] border-[1px] mt-[10px] ml-[10px] "
        >
          <div>
            <img
              src={item.image}
              alt={item.title}
              className=" h-[250px] object-cover mx-auto"
            />
          </div>

          <h3 className="mb-[10px] mt-[10px] w-[full] h-[50px] mb-[20px] mx-auto">
            {item.title}
          </h3>
          <div className="price mb-[20px] mx-auto">${item.price}</div>
          <p className="mx-auto">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
