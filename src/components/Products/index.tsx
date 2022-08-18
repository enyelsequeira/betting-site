import Container from '@/common/ui/Container/Container';
import Text from '@/common/ui/Text/Text';
import { products } from '@/utils/constants';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Products = () => {
  const [productsToShow, setProductsToShow] = useState(products.slice(0, 4));

  const loadMoreProducts = () => {
    setProductsToShow([
      ...productsToShow,
      ...products.slice(productsToShow.length, productsToShow.length + 4),
    ]);
  };
  // we could debounce this function to prevent unnecessary re-renders

  const filterProducts = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setProductsToShow(filteredProducts.slice(0, 4));
  };

  return (
    <Container className="py-7 px-4 bg-white" as="section">
      <Text
        resetStyles
        className="font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-purple-200 via-red-500 to-pink-300 h-fit py-2"
      >
        List of your favorite games
      </Text>
      <Container className=" mt-10">
        <input
          className=" ring-2 max-w-md w-full flex mx-auto py-2 px-6 placeholder-black/40 outline-none"
          onChange={filterProducts}
          placeholder="search game"
        />
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only text-black">Products</h2>

          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {productsToShow.length > 0 ? (
              productsToShow.map((p) => {
                return (
                  <Link href={p.href}>
                    <a key={p.id} className="group">
                      <div className="w-full border flex items-center justify-center py-3 rounded-md shadow-lg border-red-100">
                        <Image
                          width={200}
                          height={200}
                          src={p.imageSrc}
                          alt={p.imageAlt}
                          className="w-full h-full group-hover:opacity-75 flex m-auto"
                        />
                      </div>
                      <Text as="h3" className="mt-4 text-sm !text-gray-700">
                        {p.name}
                      </Text>
                    </a>
                  </Link>
                );
              })
            ) : (
              <div className="flex justify-center items-center w-full col-span-4">
                <Text as="h3" className="!text-red-500 text-2xl">
                  NO SEARCH TERM FOUND
                </Text>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={loadMoreProducts}
          className="px-10 py-3 bg-blue-700 text-white flex mx-auto disabled:bg-blue-500/30 disabled:text-black rounded-md"
          type="button"
          disabled={
            productsToShow.length === products.length || productsToShow.length === 0
          }
        >
          Load more
        </button>
      </Container>
    </Container>
  );
};
export default Products;
