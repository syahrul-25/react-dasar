import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { API_URL } from "./utils/constans";
import { numberWithCommas } from "./utils/utils";

export default class TotalBayar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submitTotalBayar(totalBayar) {
    const pesanan = {
      total_bayar: totalBayar,
      menus: this.props.keranjangs,
    };

    axios.post(API_URL + "pesanans", pesanan).then((res) => {
      this.props.history.push("/sukses");
    });
  }

  render() {
    const totalBayar = this.props.keranjang.reduce((result, item) => {
      return result + item.total_harga;
    }, 0);
    return (
      <div className="fixed-bottom">
        <Row>
          <Col md={{ span: 3, offset: 9 }}>
            <h4>
              Total Harga :{" "}
              <strong className="float-end me-3">
                {" "}
                Rp. {numberWithCommas(totalBayar)}
              </strong>
            </h4>
            <div className="d-grid gap-2">
              <Button
                onClick={this.submitTotalBayar.bind(this, totalBayar)}
                variant="primary"
                className="mt-2 mb-2 me-2"
                size="lg"
              >
                <FontAwesomeIcon icon={faShoppingCart} /> Bayar
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
