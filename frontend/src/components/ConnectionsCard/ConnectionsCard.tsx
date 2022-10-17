type ConnectionsCardProps = {
    data: any;
  };
  
const ConnectionsCard = ({ data }: ConnectionsCardProps) => {
  return (
    <>
        {data.map((item: any) => (
        <div key={item.id}>
            <p>{item.name} {item.email}</p>
        </div>
        ))}
    </>
  );
};

export default ConnectionsCard;