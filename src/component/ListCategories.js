import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "./utils/constans";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
  if (nama === "Makanan")
    return <FontAwesomeIcon icon={faUtensils} className="me-2" />;
  if (nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} />;
  if (nama === "Cemilan")
    return <FontAwesomeIcon className="me-2" icon={faCheese} />;
};

export default class ListCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
  }

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChangeCategory(value) {
    this.props.changeCategory(value);
  }

  render() {
    const { categories } = this.state;
    const { choseCategory } = this.props;
    return (
      <Col md={2} mt={2}>
        <h4>
          <strong>Daftar Kategori</strong>
        </h4>
        <hr />
        <ListGroup>
          {categories.map((category) => (
            // <ListGroup.Item key={category.id} className={choseCategory === category.nama && "category-aktif"} onClick={() => changeCategory(category.nama)} style={{ cursor : 'pointer'}}>
            <ListGroup.Item
              key={category.id}
              className={choseCategory === category.nama && "category-aktif"}
              onClick={this.handleChangeCategory.bind(this, category.nama)}
              style={{ cursor: "pointer" }}
            >
              <h5>
                <Icon nama={category.nama} /> {category.nama}
              </h5>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    );
  }
}
