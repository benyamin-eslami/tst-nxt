import { useRouter } from "next/router";
import coffeeStoreData from "../../data/coffee-stores.json";
import CoffeeCard from "@/components/coffeeCard";

export async function getStaticProps({ params }) {
  const coffeeStore = coffeeStoreData.find(
    (coffee) => coffee.id === +params.id
  );
  return {
    props: { coffeeStore }, // will be passed to the page component as props
  };
}
export async function getStaticPaths() {
  const paths = coffeeStoreData.map((coffee) => {
    return {
      params: {
        id: coffee.id.toString(),
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
        address={coffeeStore.address}
        name={coffeeStore.name}
        imgUrl={coffeeStore.imgUrl}
        websiteUrl={coffeeStore.websiteUrl}
        neighbourhood={coffeeStore.neighbourhood}
        id={coffeeStore.id}
      />
    </div>
  );
};

export default CoffeeStoreDetail;
