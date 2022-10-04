import { FeatureCardContainer, ImageTitleContainer } from "./style";

type FeatureCardProps = {
  imageUrl: string;
  title: string;
  description: string;
};

const FeatureCard = ({ imageUrl, title, description }: FeatureCardProps) => {
  return (
    <FeatureCardContainer>
      <ImageTitleContainer>
        <img src={imageUrl} alt='card logo' />
        <h3>{title}</h3>
      </ImageTitleContainer>
      <p>{description}</p>
    </FeatureCardContainer>
  )
};

export default FeatureCard;