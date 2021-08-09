// import './App.css';
import { Col, Container, Row } from "react-bootstrap";
import { Hasil, ListCategories, Menus } from "../component";
import React, { Component } from "react";
import { API_URL } from "../component/utils/constans";
import axios from "axios";
import swal from "sweetalert";
import { Redirect } from "react-router-dom";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      choseCategory: "Minuman",
      keranjangs: [],
      redirect: null,
    };
    this.setKeranjang = this.setKeranjang.bind(this);
    this.masukKeranjang = this.masukKeranjang.bind(this);
  }

  setKeranjang() {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.choseCategory)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((err) => {
        console.log(err);
      });

    this.setKeranjang();
  }

  changeCategory = (value) => {
    this.setState({
      choseCategory: value,
      menus: [],
    });

    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  masukKeranjang(value) {
    axios.get(API_URL + "keranjangs?product.id=" + value.id).then((res) => {
      if (res.data.length === 0) {
        const keranjang = {
          jumlah: 1,
          total_harga: value.harga,
          product: value,
        };

        axios
          .post(API_URL + "keranjangs", keranjang)
          .then((res) => {
            swal({
              title: "Success",
              text: "Sukses Mengisi Keranjang! " + keranjang.product.nama,
              icon: "success",
              timer: 1000,
              button: false,
            });
            this.setKeranjang();
            // setTimeout(() => {
            //     this.setState({redirect : "/sukses"})
            // },1500)
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const keranjang = {
          jumlah: res.data[0].jumlah + 1,
          total_harga: res.data[0].total_harga + value.harga,
          product: value,
        };

        axios
          .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
          .then((res) => {
            swal({
              title: "Success",
              text: "Product Berhasil Ditambahkan! " + keranjang.product.nama,
              icon: "success",
              timer: 1000,
              button: false,
            });
            this.setKeranjang();
            // setTimeout(() => {
            //     this.setState({redirect : "/sukses"})
            // },1500)
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    const { menus, choseCategory, keranjangs } = this.state;
    // console.log(keranjangs);
    return (
      <div className="mt-3">
        <Container fluid>
          <Row>
            <ListCategories
              changeCategory={this.changeCategory}
              choseCategory={choseCategory}
            />
            <Col>
              <h4>
                <strong>Daftar Produk</strong>
              </h4>
              <hr />
              <Row>
                {menus &&
                  menus.map((menu) => (
                    <Menus
                      key={menu.id}
                      menu={menu}
                      masukKeranjang={this.masukKeranjang}
                      setKeranjang={this.setKeranjang}
                    />
                  ))}
              </Row>
            </Col>
            <Hasil
              keranjangs={keranjangs}
              setKeranjang={this.setKeranjang}
              {...this.props}
            />
          </Row>
        </Container>
      </div>
    );
  }
}
