import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import ModalService from "./services/ModalServices";
import classes from "./ModalRoot.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalRoot = () => {
  const [modal, setModal] = useState({});

  useEffect(() => {
    ModalService.on("open", ({ component, props }) => {
      setModal({
        component,
        props,
        close: (value) => {
          setModal({});
        },
      });
    });
  }, []);

  const ModalComponent = modal.component ? modal.component : null;

  return (
    <>
      {createPortal(
        <section className={modal.component ? classes.modalRoot : ""}>
          {ModalComponent && (
            <ModalComponent
              {...modal.props}
              close={modal.close}
              className={ModalComponent ? classes[`d-block`] : ""}
            />
          )}
        </section>,
        document.getElementById("overlay-root")
      )}

      {createPortal(
        ModalComponent ? <Backdrop onConfirm={modal.close} /> : <div></div>,
        document.getElementById("backdrop-root")
      )}
    </>
  );
};

export default ModalRoot;
