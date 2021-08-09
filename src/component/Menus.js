import React from 'react'
import { Col, Card, Button, Badge } from 'react-bootstrap'
import {numberWithCommas} from  "./utils/utils"

export const Menus = ({menu, masukKeranjang, setKeranjang}) => {
    return (
        <Col md={4} xs={6} className="mb-4">
            <Card className="shadow" onClick={() => masukKeranjang(menu)} >
                <Card.Img variant="top" src={"assets/images/" + menu.category.nama.toLowerCase() + "/" + menu.gambar} />
                <Card.Body>
                    <Card.Title>{menu.nama} <strong>({menu.kode})</strong></Card.Title>
                    <Card.Text>
                    Rp. {numberWithCommas(menu.harga)}
                    </Card.Text>
                    <Badge pill variant="success">Hello</Badge>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}
