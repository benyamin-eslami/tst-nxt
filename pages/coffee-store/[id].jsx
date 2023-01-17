import { useRouter } from "next/router";
import coffeeStoreData from "../../data/coffee-stores.json";
import CoffeeCard from "@/components/coffeeCard";
import { fetchCoffeeStoresData } from "@/lib/coffee-stores";
export async function getStaticProps({ params }) {
  let coffeeStore = await fetchCoffeeStoresData();
  coffeeStore = coffeeStore.find((coffee) => coffee.fsq_id === params.id);
  return {
    props: { coffeeStore }, // will be passed to the page component as props
  };
}
export async function getStaticPaths() {
  const coffeeStore = await fetchCoffeeStoresData();

  const paths = coffeeStore.map((coffee) => {
    return {
      params: {
        id: coffee.fsq_id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true, // can also be true or 'blocking'
  };
}

const CoffeeStoreDetail = ({ coffeeStore }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading</p>;
  }
  return (
    <div>
      <CoffeeCard
        name={coffeeStore.name}
        imgUrl={
          coffeeStore.imgUrl ||
          "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
        }
        id={coffeeStore.fsq_id}
      />
    </div>
  );
};

export default CoffeeStoreDetail;
