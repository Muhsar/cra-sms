<<<<<<< HEAD
import { Link } from "react-router-dom";
import React from "react";
import { TbCurrencyNaira } from "react-icons/tb";

export default function ClassCards({ rooms, school }) {
  return (
    <div className="flex flex-wrap pt-5 -m-2" id="Classes">
      {rooms?.map((room: any) => (
        <Link
          to={`/${school}/school/class/${room.id}`}
          className="w-full p-2 lg:w-1/3 md:w-1/2 sm:w-full searchBody"
          key={room.id}
        >
          <>
            <div className="flex items-center h-full p-4 transform bg-gray-100 border border-gray-200 rounded-lg shadow cursor-pointer hover:scale-105 hover:bg-gray-900 hover:text-white duration-500 transition-all">
              <div
                className={`avatar avatar-lg text-white flex-shrink-0 rounded-full mr-4 bg-gray-700 p-3`}
              ></div>
              <div className="flex-grow">
                <h2 className="font-bold title-font">{room?.name}</h2>
                {/* {[
                  { name: "School Fee", unit: 1, price: room?.fee },
                  { name: "Uniform", unit: 2, price: 4500 },
                  { name: "Mathematics Textbook", unit: 1, price: 3000 },
                  { name: "English Textbook", unit: 1, price: 3000 },
                  { name: "Note Book", unit: 25, price: 200 },
                ].map((bill, i) => (
                  <div className="grid grid-cols-4 gap-4" key={i}>
                    <p className="py-1 text-sm font-medium truncate font-dosis">
                      {bill.name}
                    </p>
                    <div className="py-1 text-sm font-medium truncate font-dosis flex items-center">
                      <div className="">{bill?.unit}</div>
                    </div>
                    <div className="py-1 text-sm font-medium truncate font-dosis flex items-center">
                      <TbCurrencyNaira className="w-4 h-4" />
                      <div className="">{bill?.price}</div>
                    </div>
                    <div className="py-1 text-sm font-medium truncate font-dosis flex items-center">
                      <TbCurrencyNaira className="w-4 h-4" />
                      <div className="">
                        {Number(bill.unit) * Number(bill.price)}
                      </div>
                    </div>
                  </div>
                ))} */}

                <div className="grid grid-cols-4 gap-4">
                  <p className="py-1 text-sm font-medium truncate font-dosis col-span-3">
                    School Fee
                  </p>
                  <div className="py-1 text-sm font-medium truncate font-dosis flex items-center">
                    <TbCurrencyNaira className="w-4 h-4" />
                    <div className="">{room?.fee}</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </Link>
      ))}
    </div>
  );
=======
import {Link} from "react-router-dom"
import React from 'react'

export default function ClassCards({rooms, school}) {
  return (
    <div className="flex flex-wrap pt-5 -m-2" id="Classes">
      {rooms?.map((room: any) => (
      <Link to={`/${school}/school/class/${room.id}`}
          className="w-full p-2 lg:w-1/3 md:w-1/2 sm:w-full searchBody"
          key={room.id}
      >
        <>
          <div className="flex items-center h-full p-4 transform bg-gray-100 border border-gray-200 rounded-lg shadow cursor-pointer hover:scale-105 hover:bg-gray-200">
            <div
              className={`avatar avatar-lg text-white flex-shrink-0 rounded-full mr-4 bg-gray-700 p-3`}
            >
            </div>
            <div className="flex-grow">
              <h2 className="font-medium text-gray-900 title-font">{room?.name}</h2>
            </div>
          </div>
        </>
        </Link>
      ))}
    </div>
  )
>>>>>>> d895de1227c8a0ddd48c40de5be1d4b2f7baabda
}
