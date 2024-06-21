"use client";
import Header from "./components/Header";
import Card from "./components/Card";
import { useState, ChangeEvent, FormEvent } from "react";
import { useMutation, useQueryClient } from "react-query";

interface NewCard {
  title: string;
  price: string;
  description: string;
  image: File | null;
}

export default function Home() {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newCard: NewCard) => {
      const formData = new FormData();
      formData.append("title", newCard.title);
      formData.append("price", newCard.price);
      formData.append("description", newCard.description);
      formData.append("image", newCard.image as Blob);

      return fetch("https://fakestoreapi.com/products", {
        method: "POST",
        body: formData,
      }).then((res) => res.json());
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("cards");
      },
    }
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate({ title, price, description, image });
    setOpen(false); // Закрыть модальное окно после отправки данных
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };
  console.log("Submitting:", { title, price, description, image });
  return (
    <div>
      <Header handleClick={handleClick}></Header>
      {open && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="w-[500px] h-[500px] bg-white p-5 rounded-lg flex flex-col justify-end items-center">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center"
              >
                <div className="mb-[40px] w-[250px] h-[200px] border-[1px] flex items-center">
                  <input
                    placeholder="title"
                    type="file"
                    className="w-[250px] mb-[15px] p-2 border border-gray-300 rounded"
                    onChange={handleImageChange}
                  />
                </div>
                <input
                  placeholder="title"
                  type="text"
                  className="w-[250px] mb-[15px] p-2 border border-gray-300 rounded"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  placeholder="price"
                  type="text"
                  className="w-[250px] mb-[15px] p-2 border border-gray-300 rounded"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <input
                  placeholder="description"
                  type="text"
                  className="w-[250px] mb-[15px] p-2 border border-gray-300 rounded"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Добавить товар
                </button>
              </form>
            </div>
          </div>
        </>
      )}
      <Card></Card>
    </div>
  );
}
