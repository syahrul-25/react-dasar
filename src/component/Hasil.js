import axios from "axios";
import React, { Component } from "react";
import { Badge, Card, Col, ListGroup, Row } from "react-bootstrap";
import swal from "sweetalert";
import ModalKeranjang from "./ModalKeranjang";
import TotalBayar from "./TotalBayar";
import { API_URL } from "./utils/constans";
import { numberWithCommas } from "./utils/utils";

export default class Hasil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
      totalHarga: 0,
    };
  }

  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
      jumlah: menuKeranjang.jumlah,
      keterangan: menuKeranjang.keterangan,
      totalHarga: menuKeranjang.total_harga,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga:
        this.state.keranjangDetail.product.harga * (this.state.jumlah + 1),
    });
  };

  kurang = () => {
    if (this.state.jumlah > 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga:
          this.state.keranjangDetail.product.harga * (this.state.jumlah - 1),
      });
    }
  };

  changeHandle = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan,
    };

    axios
      .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
      .then((res) => {
        swal({
          title: "Update Pesanan!",
          text: "Sukses Update Pesanan! " + data.product.nama,
          icon: "error",
          timer: 1000,
          button: false,
        });
        this.props.setKeranjang();
      })
      .catch((err) => {
        console.log(err);
      });

    this.handleClose();
  };

  hapusPesanan = (id) => {
    axios
      .delete(API_URL + "keranjangs/" + id)
      .then((res) => {
        swal({
          title: "Hapus Pesanan!",
          text:
            "Sukses Hapus Pesanan! " + this.state.keranjangDetail.product.nama,
          icon: "success",
          timer: 1000,
          button: false,
        });
        this.props.setKeranjang();
      })
      .catch((err) => {
        console.log(err);
      });

    this.handleClose();
  };

  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={3} mt={2}>
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />
        <Card className="overflow-auto hasil">
          <ListGroup variant="flush">
            {keranjangs.map((keranjang) => (
              <ListGroup.Item
                key={keranjang.id}
                onClick={() => this.handleShow(keranjang)}
              >
                <Row>
                  <Col xs={2}>
                    <Badge pill bg="success">
                      {keranjang.jumlah}
                    </Badge>
                  </Col>
                  <Col>
                    <h5>{keranjang.product.nama}</h5>
                    <p>Rp. {numberWithCommas(keranjang.product.harga)}</p>
                  </Col>
                  <Col>
                    <strong className="float-end">
                      Rp. {numberWithCommas(keranjang.total_harga)}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            <ModalKeranjang
              handleClose={this.handleClose}
              {...this.state}
              tambah={this.tambah}
              kurang={this.kurang}
              changeHandle={this.changeHandle}
              handleSubmit={this.handleSubmit}
              hapusPesanan={this.hapusPesanan}
            />
          </ListGroup>
        </Card>
        <TotalBayar keranjang={keranjangs} {...this.props} />
      </Col>
    );
  }
}
