import Link from "next/link";
import Image from "next/image";
const CoffeeCard = ({ id, name, imgUrl }) => {
  return (
    <>
      <div>
        <Image src={imgUrl} width={300} height={300} />
        <Link href={`/coffee-store/${id}`}>{name}</Link>
      </div>
    </>
  );
};

export default CoffeeCard;
