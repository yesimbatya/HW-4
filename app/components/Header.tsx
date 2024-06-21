"use client";
import { MouseEventHandler } from "react";

interface HeaderProps {
  handleClick: MouseEventHandler<HTMLButtonElement>;
}

const Header = ({ handleClick }: HeaderProps) => {
  return (
    <div className="h-[70px] w-full  flex items-center justify-between px-[30px] text-white">
      <div>
        <h1 className="text-white font-bold text-[30px] ">OLX</h1>
      </div>
      <div className="flex gap-[40px]">
        <ul className="flex gap-[40px]">
          <li>Сообщения</li>
          <li>Ваш профиль</li>
        </ul>
        <button onClick={handleClick}>Подать объявления</button>
      </div>
    </div>
  );
};

export default Header;
