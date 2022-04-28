import React, { useEffect, useState } from "react";
import { CardWrapper, Card, Button } from './ModalCard.styles';

const ModalCard = ({show, setShow, content}) => {
  if (!show) return null;

  return (
    <CardWrapper>
      <Card>
        <h2>通知</h2>
        <p>{content}</p>
        <Button onClick={() => { setShow(false) }}>確定</Button>
      </Card>
    </CardWrapper>
  );
}

export default ModalCard;