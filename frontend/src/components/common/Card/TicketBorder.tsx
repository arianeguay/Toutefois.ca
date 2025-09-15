import { TicketBorderContainer, TicketShape } from './styles';

const TicketBorder = () => {
  return (
    <TicketBorderContainer>
      {Array.from({ length: 50 }).map((_, i) => (
        <TicketShape key={i} />
      ))}
    </TicketBorderContainer>
  );
};

export default TicketBorder;
