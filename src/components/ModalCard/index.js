import React from "react";
import { CardWrapper, Card, Button, Loading } from './ModalCard.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
const ModalCard = ({show, setShow, content, showLoading}) => {
  if (!show) return null;

  return (
    <CardWrapper>
      <Card>
        <h2>通知</h2>
        {showLoading && <Loading><FontAwesomeIcon className="icon" icon={faSpinner} size="4x" spin /></Loading>}
        <p>{content}</p>
        {!showLoading && <Button onClick={() => { setShow(false) }}>確定</Button>}
      </Card>
    </CardWrapper>
  );
}

export default ModalCard;