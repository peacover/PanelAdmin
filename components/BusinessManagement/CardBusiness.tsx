import Image from "next/image";

const CardBusiness: React.FC<{ bus: TBusiness }> = ({ bus }) => {
  return (
    <div key={bus.id} className="border-4 border-black">
      <h1>{bus.name}</h1>
      <h1>{bus.imageUrl}</h1>
      <Image
        src={bus.imageUrl}
        alt="Picture of the author"
        width={300}
        height={300}
      />
      <h1>{bus.updatedAt?.toString()}</h1>
      <h1>{bus.owner?.name}</h1>
      <button>Delete</button>
    </div>
  );
};
export default CardBusiness;
