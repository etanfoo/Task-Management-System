import { InstructionCardContainer, TextContainer } from "./style";

type InstructionCardProps = {
  imageUrl: string;
  title: string;
  description: string;
  index: number;
};

const InstructionCard = ({ imageUrl, title, description, index }: InstructionCardProps) => {
  return (
    <InstructionCardContainer style={{ alignSelf: index % 2 ? "flex-end" : "flex-start" }}>
        <img src={imageUrl} alt='card icon' />
        <TextContainer>
          <h3>{title}</h3>
          <p>{description}</p>
        </TextContainer>
    </InstructionCardContainer>
  );
};

export default InstructionCard;