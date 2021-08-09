import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { numberWithCommas } from "./utils/utils";

const ModalKeranjang = ({
  showModal,
  handleClose,
  keranjangDetail,
  jumlah,
  keterangan,
  tambah,
  kurang,
  changeHandle,
  handleSubmit,
  totalHarga,
  hapusPesanan,
}) => {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {keranjangDetail?.product?.nama}{" "}
          <strong>
            Rp.{" "}
            {numberWithCommas(
              keranjangDetail?.product?.harga === undefined
                ? 0
                : keranjangDetail.product.harga
            )}
          </strong>
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Total Harga : </Form.Label>
            <p>
              <strong>Rp. {numberWithCommas(totalHarga)}</strong>
            </p>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Jumlah : </Form.Label>
            <br />
            <Button variant="primary" size="sm" onClick={tambah}>
              <FontAwesomeIcon icon={faPlus} />
            </Button>
            <strong className="mx-2">{jumlah}</strong>
            <Button variant="primary" size="sm" onClick={kurang}>
              <FontAwesomeIcon icon={faMinus} />
            </Button>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextArea1">
            <Form.Label>Keterangan : </Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              name="keterangan"
              placeholder="Contoh: pedas, nasi setengah"
              value={keterangan}
              onChange={(event) => changeHandle(event)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => hapusPesanan(keranjangDetail.id)}
          >
            <FontAwesomeIcon icon={faTrash} /> Hapus Pesanan
          </Button>
          <Button type="submit" variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalKeranjang;
