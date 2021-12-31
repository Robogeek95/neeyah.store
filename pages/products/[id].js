import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useShoppingCart } from "@/hooks/use-shopping-cart";
import Image from "next/image";
import Head from "next/head";
import { formatCurrency } from "@/lib/utils";
import { MinusSmIcon, PlusSmIcon, XCircleIcon } from "@heroicons/react/outline";

import products from "products";

const Product = (props) => {
  const router = useRouter();
  const { cartCount, addItem } = useShoppingCart();
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const toastId = useRef();
  const firstRun = useRef(true);

  const handleOnAddToCart = () => {
    setAdding(true);
    toastId.current = toast.loading(
      `Adding ${qty} item${qty > 1 ? "s" : ""}...`
    );
    addItem(props, qty);
  };

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    setAdding(false);
    toast.success(`${qty} ${props.name} added`, {
      id: toastId.current,
    });
    setQty(1);
  }, [cartCount]);

  function renderImageModal() {
    return (
      <>
        <div className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="flex justify-end">
              <div className="bg-gray-800 p-4">
                <XCircleIcon
                  onClick={() => setShowImageModal(false)}
                  className="w-8 h-8 flex-shrink-0 opacity-50 hover:opacity-100 text-white transition-opacity cursor-pointer"
                />
              </div>
            </div>
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded w-96 h-96 bg-red-300">
                <Image
                  src={props.image}
                  alt={props.name}
                  layout="fill"
                  objectFit="cover"
                  onClick={() => setShowImageModal(true)}
                  className="rounded-l-md cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    );
  }

  return router.isFallback ? (
    <>
      <Head>
        <title>Loading...</title>
      </Head>
      <p className="text-center text-lg py-12">Loading...</p>
    </>
  ) : (
    <>
      <Head>
        <title>{props.name} | Neeyah Store</title>
      </Head>
      <div className="container lg:max-w-screen-lg mx-auto py-12 px-6">
        {showImageModal && renderImageModal()}
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-0">
          {/* Product's image */}
          <div className="relative w-72 sm:w-96 sm:h-96">
            <Image
              src={props.image}
              alt={props.name}
              layout="fill"
              objectFit="cover"
              onClick={() => setShowImageModal(true)}
              className="rounded-l-md cursor-pointer"
            />
          </div>

          {/* Product's details */}
          <div className="flex-1 max-w-md h-96 border border-opacity-50 rounded-r-md shadow-lg p-6">
            <h2 className="text-3xl font-semibold">{props.name}</h2>
            <p>
              <span className="text-gray-500">Availability:</span>{" "}
              <span className="font-semibold">In stock</span>
            </p>

            {/* Price */}
            <div className="mt-8 border-t pt-4">
              <p className="text-gray-500">Price:</p>
              <p className="text-xl font-semibold">
                {formatCurrency(props.price)}
              </p>
            </div>

            <div className="mt-4 border-t pt-4">
              {/* Quantity */}
              <p className="text-gray-500">Quantity:</p>
              <div className="mt-1 flex items-center space-x-3">
                <button
                  onClick={() => setQty((prev) => prev - 1)}
                  disabled={qty <= 1}
                  className="disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-current hover:bg-rose-100 hover:text-rose-500 rounded-md p-1"
                >
                  <MinusSmIcon className="w-6 h-6 flex-shrink-0" />
                </button>
                <p className="font-semibold text-xl">{qty}</p>
                <button
                  onClick={() => setQty((prev) => prev + 1)}
                  className="hover:bg-green-100 hover:text-green-500 rounded-md p-1"
                >
                  <PlusSmIcon className="w-6 h-6 flex-shrink-0 " />
                </button>
              </div>

              {/* Add to cart button */}
              <button
                type="button"
                onClick={handleOnAddToCart}
                disabled={adding}
                className="mt-8 border rounded py-2 px-6 bg-rose-500 hover:bg-rose-600 border-rose-500 hover:border-rose-600 focus:ring-4 focus:ring-opacity-50 focus:ring-rose-500 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to cart ({qty})
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  return {
    // Existing posts are rendered to HTML at build time
    paths: Object.keys(products)?.map((id) => ({
      params: { id },
    })),
    // Enable statically generating additional pages
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  try {
    const props = products?.find((product) => product.id === params.id) ?? {};

    return {
      props,
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every second
      revalidate: 1, // In seconds
    };
  } catch (error) {
    return { notFound: true };
  }
}

export default Product;
