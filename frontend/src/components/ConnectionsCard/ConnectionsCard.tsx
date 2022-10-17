import Box from '@mui/material/Box';
import { Button } from "@mui/material";

type ConnectionsCardProps = {
    data: any;
    func: any;
  };
  
const ConnectionsCard = ({ data, func }: ConnectionsCardProps) => {

  return (
    <>
        {data.map((item: any) => (
            <Button onClick={() => func(item.name)} key={item.id}>
                <h2>{item.name} {item.email}</h2>
                <br/>
                <p>{item.name} {item.email}</p>
            </Button>
        ))}
    </>
  );
};

export default ConnectionsCard;