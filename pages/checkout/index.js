import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useShoppingCart } from "@/hooks/use-shopping-cart";
import axios from "axios";
import { formatCurrency } from "@/lib/utils";
import getStripe from "@/lib/get-stripe";
import {
  XCircleIcon,
  XIcon,
  MinusSmIcon,
  PlusSmIcon,
} from "@heroicons/react/outline";
import Logo from "@/components/Logo";

const Checkout = () => {
  const { cartDetails, totalPrice, cartCount, addItem, removeItem, clearCart } =
    useShoppingCart();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Head>
        <title>Checkout | Neeyah Store</title>
      </Head>
      <div className="mx-auto h-min-screen">
        <div className="grid grid-cols-9 gap-5 h-full ">
          <form className="col-span-5 mx-auto py-12 container max-w-lg">
            <div className="form-group mb-8">
              <p className="text-2xl mb-3">Contact Information</p>

              <div className="flex gap-4 mb-2">
                <div class="flex-grow">
                  <input
                    type="text"
                    id="firstname"
                    placeholder="First name"
                    class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  />
                </div>

                <div class="flex-grow">
                  <input
                    type="text"
                    id="lastname"
                    placeholder="Last name"
                    class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  />
                </div>
              </div>

              <div class="flex-grow mb-2">
                <input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                />
              </div>

              <div class="flex-grow">
                <input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                />
              </div>
            </div>

            <div className="form-group">
              <p className="text-2xl mb-3">Shipping details</p>

              <div class="flex-grow mb-2">
                <input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                />
              </div>

              <div class="flex-grow mb-2">
                <input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                />
              </div>

              <div className="flex gap-4">
                <div class="flex-grow">
                  <input
                    type="text"
                    id="firstname"
                    placeholder="First name"
                    class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  />
                </div>

                <div class="flex-grow">
                  <input
                    type="text"
                    id="lastname"
                    placeholder="Last name"
                    class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  />
                </div>

                <div class="flex-grow">
                  <input
                    type="text"
                    id="lastname"
                    placeholder="Last name"
                    class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  />
                </div>
              </div>
            </div>

            <button
              disabled={loading}
              className="border rounded py-2 px-6 bg-rose-500 hover:bg-rose-600 border-rose-500 hover:border-rose-600 focus:ring-4 focus:ring-opacity-50 focus:ring-rose-500 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-rose-500 w-full mt-8"
            >
              {loading ? "Loading..." : "Continue to Shipping"}
            </button>
          </form>

          <div className="col-span-4 border-l-2 border-rose-500 bg-gray-100 h-100 pr-32">
            {cartCount > 0 ? (
              <div className="mt-12">
                {Object.entries(cartDetails).map(([key, product]) => (
                  <div
                    key={key}
                    className="flex space-x-4 hover:shadow-lg hover:border-opacity-50 border border-opacity-0 rounded-md p-4"
                  >
                    {/* Image + Name */}
                    <div className="w-2/5">
                      <Link href={`/products/${product.id}`}>
                        <a className="space-x-4 group">
                          <div className="relative h-20 group-hover:scale-110 transition-transform">
                            <Image
                              src={product.image}
                              alt={product.name}
                              layout="fill"
                              objectFit="cover"
                              objectPosition="center"
                            />
                          </div>
                          <p className="font-semibold text-md group-hover:underline">
                            {product.name}
                          </p>
                        </a>
                      </Link>
                    </div>
                    {/* Price + Actions */}
                    <div className="flex w-3/5 items-center">
                      {/* Quantity */}
                      <div className="flex w-1/4 items-center space-x-3">
                        <button
                          onClick={() => removeItem(product)}
                          disabled={product?.quantity <= 1}
                          className="disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-current hover:bg-rose-100 hover:text-rose-500 rounded-md p-1"
                        >
                          <MinusSmIcon className="w-6 h-6 flex-shrink-0" />
                        </button>
                        <p className="font-semibold text-md">
                          {product.quantity}
                        </p>
                        <button
                          onClick={() => addItem(product)}
                          className="hover:bg-green-100 hover:text-green-500 rounded-md p-1"
                        >
                          <PlusSmIcon className="w-6 h-6 flex-shrink-0 " />
                        </button>
                      </div>

                      {/* Price */}
                      <p className="font-semibold w-2/4 text-md ml-16">
                        {formatCurrency(product.price, "NGN")}
                      </p>

                      {/* Remove item */}
                      <button
                        onClick={() => removeItem(product, product.quantity)}
                        className="ml-4 w-1/4 hover:text-rose-500"
                      >
                        <XCircleIcon className="w-6 h-6 flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity" />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="flex flex-col border-t p-4 mt-8">
                  <div className="flex justify-between align-center">
                    <p className="text-lg">
                      Total:
                    </p>

                    <p className="font-semibold text-lg">
                      {formatCurrency(totalPrice, "NGN")}
                    </p>
                  </div>

                  <div class="flex justify-between align-center mt-3">
                    <p className="text-lg">
                      Shipping fee:
                    </p>

                    <p className="font-semibold text-lg"> {formatCurrency(1500, "NGN")}</p>
                  </div>

                  <div class="flex justify-between align-center mt-3">
                    <p className="text-lg">
                      Total
                    </p>

                    <p className="font-semibold text-lg"> {formatCurrency(totalPrice, "NGN")}</p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
