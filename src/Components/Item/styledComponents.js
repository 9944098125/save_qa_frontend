import styled from "styled-components";

export const GlassEffect = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  background-color: rgba(202, 197, 197, 0.224);
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(15px);
  margin-bottom: 25px;
  min-height: 150px;
  width: 85%;
  @media screen and (max-width: 500px) {
    width: 95%;
  }
`;
export const ItemContainer = styled.div`
  min-height: 200px;
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.color};
  padding: 15px 25px;
`;
export const RowsInItem = styled.div`
  display: flex;
  justify-content: ${(props) => props.jc};
  align-items: center;
  margin-bottom: 15px;
  width: 100%;
`;
export const Btn = styled.button`
  background-color: ${(props) => props.bg};
  color: white;
  border: 0;
  border-radius: 9px;
  width: 100px;
  height: 45px;
`;
export const QaText = styled.p`
  font-size: 18px;
  font-weight: ${(props) => props.fw};
  letter-spacing: 0.5px;
`;
